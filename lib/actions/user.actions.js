"use server";

import { avatarPlaceholderUrl } from "@/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const { Query, ID } = require("node-appwrite");
const { appwriteConfig } = require("../appwrite/config");
const { createAdminClient, createSessionClient } = require("../appwrite");
const { parseStringify } = require("../utils");

const getUserByEmail = async (email) => {
  const { databases } = await createAdminClient();
  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("email", [email])]
  );
  
  return result.total > 0 ? result.documents[0] : null;
};

const handleError = (error, message) => {
  console.log(error, message);
  throw error;
};

export const sendEmailOTP = async ({ email }) => {
  const { account } = await createAdminClient();
  try {
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
};

export const createAccount = async ({ fullName, email }) => {
  const existingUser = await getUserByEmail(email);
  const accountId = await sendEmailOTP({ email });

  if (!accountId) throw new Error("Failed to send an OTP");
  if (!existingUser) {
    const { databases } = await createAdminClient();

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        avatar: avatarPlaceholderUrl,
        accountId,
      }
    );
  }
  return parseStringify({ accountId });
};

export const verifySecret = async ({ accountId, password }) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createSession(accountId, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Failed to verify OTP");
  }
};

export const getCurrentUser = async () => {
  const { databases, account } = await createSessionClient();

  const result = await account.get();
  const user = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("accountId", result.$id)]
  );

  if (user.total < 0) return null;

  return parseStringify(user.documents[0]);
};

export const signOutUser = async () => {
  const { account } = await createSessionClient();
  try {
    await account.deleteSession("current")(
      (await cookies()).delete("appwrite-session")
    );
  } catch (error) {
    handleError(error, "Failed to sign out user");
  } finally {
    redirect("/sign-in");
  }
};

export const signInUser = async ({email}) => {
  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      await sendEmailOTP({email});
      return parseStringify({accountId: existingUser.accountId});
    }

    return parseStringify({accountId: null, error: "User not found"})
  } catch (error) {
    handleError(error, "Failed to sign in user")
  }
}