import EnhancedHeader from "@/components/EnhancedHeader";
import EnhancedSidebar from "@/components/EnhancedSidebar";
import MobileNavigation from "@/components/MobileNavigation";

import { Toaster } from "@/components/ui/toaster";
import { getCurrentUser } from "@/lib/actions/user.actions";

import { redirect } from "next/navigation";

const Layout = async ({ children }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect("/sign-in");
  return (
    <main className="flex h-screen bg-gradient-to-br from-light-400 to-white">
      <EnhancedSidebar {...currentUser} />
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation {...currentUser} />
        <EnhancedHeader userId={currentUser.$id} accountId={currentUser.accountId} />
        <div className="main-content">{children}</div>
      </section>
      <Toaster />
    </main>
  );
};

export default Layout;