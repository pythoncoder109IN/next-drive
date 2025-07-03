"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Image from "next/image";
import Search from "./Search";
import FileUploader from "./FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";
import { LogOut, Bell, Settings } from "lucide-react";

const EnhancedHeader = ({ userId, accountId }) => {
  const headerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.header
      className="header bg-white/80 backdrop-blur-md border-b border-light-300"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex-1">
        <Search />
      </div>
      
      <div className="header-wrapper">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FileUploader ownerId={userId} accountId={accountId} />
        </motion.div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-light-300 hover:bg-brand/10 transition-colors"
          >
            <Bell size={20} className="text-light-100" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-light-300 hover:bg-brand/10 transition-colors"
          >
            <Settings size={20} className="text-light-100" />
          </motion.button>

          <form
            action={async () => {
              "use server";
              await signOutUser();
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button type="submit" className="sign-out-button group">
                <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
              </Button>
            </motion.div>
          </form>
        </div>
      </div>
    </motion.header>
  );
};

export default EnhancedHeader;