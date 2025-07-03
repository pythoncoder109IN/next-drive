"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Settings, 
  Moon, 
  Sun, 
  Globe, 
  Bell, 
  Shield, 
  Download,
  Trash2,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    theme: "light",
    language: "en",
    notifications: {
      email: true,
      push: false,
      uploads: true,
      shares: true
    },
    privacy: {
      profileVisible: true,
      activityVisible: false,
      allowSharing: true
    },
    storage: {
      autoDelete: false,
      compression: true,
      backup: false
    }
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
    
    toast({
      description: "Settings updated successfully",
    });
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

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-brand to-brand-100 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-light-200 mt-2">Customize your experience</p>
      </motion.div>

      <div className="space-y-6">
        {/* Appearance */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-drop-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-light-100">
                <Sun size={20} />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-light-100 font-medium">Theme</Label>
                  <p className="text-sm text-light-200">Choose your preferred theme</p>
                </div>
                <Select value={settings.theme} onValueChange={(value) => setSettings(prev => ({ ...prev, theme: value }))}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-light-100 font-medium">Language</Label>
                  <p className="text-sm text-light-200">Select your language</p>
                </div>
                <Select value={settings.language} onValueChange={(value) => setSettings(prev => ({ ...prev, language: value }))}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-drop-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-light-100">
                <Bell size={20} />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-light-100 font-medium">Email Notifications</Label>
                  <p className="text-sm text-light-200">Receive notifications via email</p>
                </div>
                <Switch
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) => handleSettingChange('notifications', 'email', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-light-100 font-medium">Push Notifications</Label>
                  <p className="text-sm text-light-200">Receive push notifications</p>
                </div>
                <Switch
                  checked={settings.notifications.push}
                  onCheckedChange={(checked) => handleSettingChange('notifications', 'push', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-light-100 font-medium">Upload Notifications</Label>
                  <p className="text-sm text-light-200">Notify when uploads complete</p>
                </div>
                <Switch
                  checked={settings.notifications.uploads}
                  onCheckedChange={(checked) => handleSettingChange('notifications', 'uploads', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-light-100 font-medium">Share Notifications</Label>
                  <p className="text-sm text-light-200">Notify when files are shared with you</p>
                </div>
                <Switch
                  checked={settings.notifications.shares}
                  onCheckedChange={(checked) => handleSettingChange('notifications', 'shares', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-drop-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-light-100">
                <Shield size={20} />
                Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-light-100 font-medium">Profile Visibility</Label>
                  <p className="text-sm text-light-200">Make your profile visible to others</p>
                </div>
                <Switch
                  checked={settings.privacy.profileVisible}
                  onCheckedChange={(checked) => handleSettingChange('privacy', 'profileVisible', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-light-100 font-medium">Activity Visibility</Label>
                  <p className="text-sm text-light-200">Show your activity to others</p>
                </div>
                <Switch
                  checked={settings.privacy.activityVisible}
                  onCheckedChange={(checked) => handleSettingChange('privacy', 'activityVisible', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-light-100 font-medium">Allow File Sharing</Label>
                  <p className="text-sm text-light-200">Allow others to share files with you</p>
                </div>
                <Switch
                  checked={settings.privacy.allowSharing}
                  onCheckedChange={(checked) => handleSettingChange('privacy', 'allowSharing', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Storage */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-drop-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-light-100">
                <Download size={20} />
                Storage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-light-100 font-medium">Auto-delete Old Files</Label>
                  <p className="text-sm text-light-200">Automatically delete files older than 1 year</p>
                </div>
                <Switch
                  checked={settings.storage.autoDelete}
                  onCheckedChange={(checked) => handleSettingChange('storage', 'autoDelete', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-light-100 font-medium">Image Compression</Label>
                  <p className="text-sm text-light-200">Compress images to save space</p>
                </div>
                <Switch
                  checked={settings.storage.compression}
                  onCheckedChange={(checked) => handleSettingChange('storage', 'compression', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-light-100 font-medium">Cloud Backup</Label>
                  <p className="text-sm text-light-200">Backup files to cloud storage</p>
                </div>
                <Switch
                  checked={settings.storage.backup}
                  onCheckedChange={(checked) => handleSettingChange('storage', 'backup', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Danger Zone */}
        <motion.div variants={itemVariants}>
          <Card className="border-red/20 shadow-drop-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red">
                <Trash2 size={20} />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-light-100 font-medium">Delete Account</Label>
                  <p className="text-sm text-light-200">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive" className="bg-red hover:bg-red/90">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;