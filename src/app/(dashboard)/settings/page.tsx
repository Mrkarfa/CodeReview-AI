"use client";

import { Header } from "@/components/dashboard/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bell, Shield, Github, Mail, ExternalLink } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full">
      <Header
        title="Settings"
        description="Manage your account and preferences"
      />

      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Section */}
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-teal-400" />
                Profile
              </CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-muted-foreground">
                    Joined December 2024
                  </p>
                </div>
              </div>

              <Separator className="bg-white/10" />

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input
                    id="name"
                    defaultValue="John Doe"
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john@example.com"
                    className="bg-white/5 border-white/10"
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">
                    Email is managed by your GitHub account
                  </p>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-teal-600 to-teal-700">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* GitHub Connection */}
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Github className="h-5 w-5 text-teal-400" />
                GitHub Connection
              </CardTitle>
              <CardDescription>Manage your GitHub integration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-green-500/20 bg-green-500/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <div>
                    <p className="font-medium">Connected to GitHub</p>
                    <p className="text-sm text-muted-foreground">@johndoe</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-white/10">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View on GitHub
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                12 repositories connected for code reviews
              </p>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-teal-400" />
                Notifications
              </CardTitle>
              <CardDescription>
                Configure how you receive updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive review results via email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator className="bg-white/10" />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">Weekly Summary</p>
                  <p className="text-sm text-muted-foreground">
                    Get a weekly digest of your review activity
                  </p>
                </div>
                <Switch />
              </div>

              <Separator className="bg-white/10" />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">Marketing Updates</p>
                  <p className="text-sm text-muted-foreground">
                    Receive news about new features and updates
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-500/20 bg-red-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <Shield className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>Irreversible actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
