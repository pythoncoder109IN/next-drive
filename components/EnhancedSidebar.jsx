"use client";

import { navItems, profileNavItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, User } from "lucide-react";

const EnhancedSidebar = ({ fullName, avatar, email }) => {
  const pathname = usePathname();
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  const sidebarVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <motion.aside
      className="sidebar bg-gradient-to-b from-white to-light-300 border-r border-light-300"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Link href="/" className="block">
          <Image
            src="/assets/icons/logo-full-brand.svg"
            alt="logo"
            width={160}
            height={50}
            className="hidden h-auto lg:block"
          />
          <Image
            src="/assets/icons/logo-brand.svg"
            alt="logo"
            width={52}
            height={52}
            className="lg:hidden"
          />
        </Link>
      </motion.div>

      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-2">
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={item.url} className="lg:w-full">
                <div
                  className={cn(
                    "sidebar-nav-item transition-all duration-200 hover:bg-brand/10 rounded-xl",
                    pathname === item.url && "shad-active bg-brand text-white shadow-drop-2"
                  )}
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={24}
                    height={24}
                    className={cn(
                      "nav-icon transition-all duration-200",
                      pathname === item.url && "nav-icon-active"
                    )}
                  />
                  <p className="hidden lg:block font-medium">{item.name}</p>
                </div>
              </Link>
            </motion.li>
          ))}

          {/* Profile Section */}
          <motion.li variants={itemVariants} className="mt-4">
            <motion.button
              onClick={() => setIsProfileExpanded(!isProfileExpanded)}
              className="w-full lg:w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={cn(
                  "sidebar-nav-item transition-all duration-200 hover:bg-brand/10 rounded-xl",
                  pathname.startsWith('/profile') && "bg-brand/20"
                )}
              >
                <User size={24} className="text-brand" />
                <div className="hidden lg:flex items-center justify-between flex-1">
                  <p className="font-medium text-brand">Profile</p>
                  <motion.div
                    animate={{ rotate: isProfileExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={16} className="text-brand" />
                  </motion.div>
                </div>
              </div>
            </motion.button>

            <AnimatePresence>
              {isProfileExpanded && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-4 mt-2 space-y-1 overflow-hidden lg:block hidden"
                >
                  {profileNavItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.li
                        key={item.name}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -10, opacity: 0 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Link href={item.url}>
                          <div
                            className={cn(
                              "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-brand/10",
                              pathname === item.url && "bg-brand/20 text-brand font-medium"
                            )}
                          >
                            <IconComponent size={16} />
                            <span className="text-sm">{item.name}</span>
                          </div>
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.li>
        </ul>
      </nav>

      <motion.div variants={itemVariants}>
        <Image
          src="/assets/images/files-2.png"
          alt="files"
          width={506}
          height={418}
          className="w-full opacity-80"
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="sidebar-user-info bg-gradient-to-r from-brand/10 to-brand-100/10 border border-brand/20 rounded-xl"
      >
        <Image
          src={avatar || `https://api.dicebear.com/7.x/initials/png?seed=${encodeURIComponent(fullName)}`}
          alt="Avatar"
          width={44}
          height={44}
          className="sidebar-user-avatar"
        />
        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize text-light-100 font-medium">{fullName}</p>
          <p className="caption text-light-200">{email}</p>
        </div>
      </motion.div>
    </motion.aside>
  );
};

export default EnhancedSidebar;