import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { User, Cog, Bell, Shield, CreditCard, Settings } from 'lucide-react';
import Profile from './tabs/Profile';
import Account from './tabs/Account';
import Notifications from './tabs/Notifications';
import Billing from './tabs/Billing';
import Privacy from './tabs/Privacy';
import Advanced from './tabs/Advanced';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Cog className="w-4 h-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Advanced
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab Content */}
          <TabsContent value="profile">
            <Profile />
          </TabsContent>

          {/* Account Tab Content */}
          <TabsContent value="account">
            <Account />
          </TabsContent>

          <TabsContent value="notifications">
            <Notifications/>
          </TabsContent>

          <TabsContent value="billing">
           <Billing/>
          </TabsContent>

          <TabsContent value="privacy">
           <Privacy/>
          </TabsContent>

          <TabsContent value="advanced">
          <Advanced/>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;