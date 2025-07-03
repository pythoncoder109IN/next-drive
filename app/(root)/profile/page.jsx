"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Phone, 
  Edit3, 
  Save, 
  X,
  Camera,
  Shield,
  HardDrive,
  FileText,
  Image as ImageIcon,
  Video,
  Music
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { convertFileSize } from "@/lib/utils";
import Image from "next/image";

const ProfilePage = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Cloud storage enthusiast and digital organization expert.",
    joinDate: "January 2024",
    avatar: "https://api.dicebear.com/7.x/initials/png?seed=John%20Doe"
  });

  const [storageStats] = useState({
    totalUsed: 1.2 * 1024 * 1024 * 1024, // 1.2GB
    totalLimit: 2 * 1024 * 1024 * 1024, // 2GB
    documents: 450 * 1024 * 1024, // 450MB
    images: 320 * 1024 * 1024, // 320MB
    videos: 380 * 1024 * 1024, // 380MB
    audio: 50 * 1024 * 1024, // 50MB
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const usagePercentage = (storageStats.totalUsed / storageStats.totalLimit) * 100;

  return (
    <motion.div
      className="max-w-6xl mx-auto p-6 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-brand to-brand-100 bg-clip-text text-transparent">
          Profile Settings
        </h1>
        <p className="text-light-200 mt-2">Manage your account and preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="border-0 shadow-drop-3 bg-gradient-to-br from-white to-light-300">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                {/* Avatar */}
                <div className="relative inline-block">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <Image
                      src={profileData.avatar}
                      alt="Profile"
                      width={120}
                      height={120}
                      className="rounded-full border-4 border-white shadow-drop-2"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute bottom-2 right-2 bg-brand text-white p-2 rounded-full shadow-lg hover:bg-brand-100 transition-colors"
                    >
                      <Camera size={16} />
                    </motion.button>
                  </motion.div>
                </div>

                {/* Basic Info */}
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-light-100">{profileData.fullName}</h2>
                  <p className="text-light-200 flex items-center justify-center gap-2">
                    <Mail size={16} />
                    {profileData.email}
                  </p>
                  <p className="text-light-200 flex items-center justify-center gap-2">
                    <Calendar size={16} />
                    Joined {profileData.joinDate}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center">
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-brand hover:bg-brand-100 text-white px-6"
                    >
                      <Edit3 size={16} className="mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="bg-green text-white hover:bg-green/90 px-4"
                      >
                        <Save size={16} className="mr-2" />
                        Save
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="px-4"
                      >
                        <X size={16} className="mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Details and Storage */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Details */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-drop-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-light-100">
                  <User size={20} />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-light-100 font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                      disabled={!isEditing}
                      className="border-light-300 focus:border-brand"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-light-100 font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                      className="border-light-300 focus:border-brand"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-light-100 font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                      className="border-light-300 focus:border-brand"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-light-100 font-medium">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      disabled={!isEditing}
                      className="border-light-300 focus:border-brand"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-light-100 font-medium">
                    Bio
                  </Label>
                  <textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-3 py-2 border border-light-300 rounded-md focus:outline-none focus:border-brand disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Storage Overview */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-drop-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-light-100">
                  <HardDrive size={20} />
                  Storage Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Overall Usage */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-light-100 font-medium">Storage Used</span>
                    <span className="text-light-200">
                      {convertFileSize(storageStats.totalUsed)} of {convertFileSize(storageStats.totalLimit)}
                    </span>
                  </div>
                  <div className="w-full bg-light-300 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-brand to-brand-100 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${usagePercentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <p className="text-sm text-light-200">
                    {usagePercentage.toFixed(1)}% of storage used
                  </p>
                </div>

                <Separator />

                {/* File Type Breakdown */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-blue/10 to-blue/20 p-4 rounded-xl border border-blue/20"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="text-blue" size={20} />
                      <span className="font-medium text-light-100">Documents</span>
                    </div>
                    <p className="text-sm text-light-200">{convertFileSize(storageStats.documents)}</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-green/10 to-green/20 p-4 rounded-xl border border-green/20"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <ImageIcon className="text-green" size={20} />
                      <span className="font-medium text-light-100">Images</span>
                    </div>
                    <p className="text-sm text-light-200">{convertFileSize(storageStats.images)}</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-orange/10 to-orange/20 p-4 rounded-xl border border-orange/20"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Video className="text-orange" size={20} />
                      <span className="font-medium text-light-100">Videos</span>
                    </div>
                    <p className="text-sm text-light-200">{convertFileSize(storageStats.videos)}</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-pink/10 to-pink/20 p-4 rounded-xl border border-pink/20"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Music className="text-pink" size={20} />
                      <span className="font-medium text-light-100">Audio</span>
                    </div>
                    <p className="text-sm text-light-200">{convertFileSize(storageStats.audio)}</p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;