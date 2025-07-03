import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import EnhancedSearch from "./EnhancedSearch";
import EnhancedFileUploader from "./EnhancedFileUploader";
import { signOutUser } from "@/lib/actions/user.actions";

const Header = ({userId, accountId}) => {
  return (
    <header className="header">
      <EnhancedSearch />
      <div className="header-wrapper">
        <EnhancedFileUploader ownerId={userId} accountId={accountId}  />
        <form
          action={async () => {
            "use server";

            await signOutUser();
          }}
        >
          <Button type="submit" className="sign-out-button">
            <Image
              src="/assets/icons/logout.svg"
              alt="logo"
              width={24}
              height={24}
              className="w-6"
            />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;