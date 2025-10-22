import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Download, Trash2, Settings } from 'lucide-react';

const Privacy = () => {
  const [analyticsTracking, setAnalyticsTracking] = useState(true);
  const [personalizedRecommendations, setPersonalizedRecommendations] = useState(true);

  const handleSaveChanges = () => {
    console.log('Saving Privacy Settings:', {
      analyticsTracking,
      personalizedRecommendations,
    });
    // Implement API call to save settings
    alert('Settings saved successfully!');
  };

  const handleDownloadData = () => {
    console.log('Downloading user data...');
    // Implement data download logic
    alert('Data download initiated!');
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
      console.log('Deleting account...');
      // Implement account deletion logic
      alert('Account deletion request has been submitted.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Data & Analytics Section */}
      <Card className="border-slate-700">
        <CardHeader>
          <CardTitle>Data & Analytics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-medium">Analytics Tracking</p>
              <p className="text-sm text-muted-foreground">
                Allow us to track usage for better insights
              </p>
            </div>
            <Switch
              checked={analyticsTracking}
              onCheckedChange={setAnalyticsTracking}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-medium">Personalized Recommendations</p>
              <p className="text-sm text-muted-foreground">
                Use your data to provide personalized suggestions
              </p>
            </div>
            <Switch
              checked={personalizedRecommendations}
              onCheckedChange={setPersonalizedRecommendations}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Management Section */}
      <Card className="border-slate-700">
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-medium">Download My Data</p>
              <p className="text-sm text-muted-foreground">
                Export all your account data
              </p>
            </div>
            <Button
              onClick={handleDownloadData}
              variant="outline"
              className="border-slate-600  text-black dark:text-white   hover:bg-muted-foreground/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all data
              </p>
            </div>
            <Button
              onClick={handleDeleteAccount}
              variant="outline"
              className="border-red-600 text-red-500 hover:bg-red-500 hover:text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Changes button positioned at the top-right corner of the entire settings container */}
      <div className="absolute top-6 right-6">
        <Button onClick={handleSaveChanges} className="bg-purple-600 hover:bg-purple-700 text-white">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Privacy;
