import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Trash2, HardDriveUpload, Database, BarChart2 } from 'lucide-react';

const Advanced = () => {

  const handleExportReleases = () => {
    alert('Exporting releases...');
  };

  const handleExportAnalytics = () => {
    alert('Exporting analytics...');
  };
  
  const handleExportRoyalties = () => {
    alert('Exporting royalties...');
  };

  const handleFullBackup = () => {
    alert('Initiating full backup...');
  };

  const handleResetSettings = () => {
    if (window.confirm("Are you sure you want to reset all settings to their default values?")) {
      alert('Resetting all settings...');
    }
  };

  const handleDeleteAllData = () => {
    if (window.confirm("WARNING: This will permanently delete all your releases and data. This action cannot be undone. Are you sure you want to proceed?")) {
      alert('Deleting all data...');
    }
  };

  return (
    <div className="space-y-8">
      {/* Export & Backup Section */}
      <Card className="border-slate-700">
        <CardHeader>
          <CardTitle>Export & Backup</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            variant="outline"
            className="flex flex-col items-center justify-center h-32  text-black dark:text-white   hover:bg-muted-foreground/10"
            onClick={handleExportReleases}
          >
            <Download className="w-6 h-6 mb-2" />
            Export Releases
          </Button>
          <Button 
            variant="outline"
            className="flex flex-col items-center justify-center h-32  text-black dark:text-white   hover:bg-muted-foreground/10"
            onClick={handleExportAnalytics}
          >
            <Download className="w-6 h-6 mb-2" />
            Export Analytics
          </Button>
          <Button 
            variant="outline"
            className="flex flex-col items-center justify-center h-32  text-black dark:text-white   hover:bg-muted-foreground/10"
            onClick={handleExportRoyalties}
          >
            <Download className="w-6 h-6 mb-2" />
            Export Royalties
          </Button>
          <Button 
            variant="outline"
            className="flex flex-col items-center justify-center h-32  text-black dark:text-white   hover:bg-muted-foreground/10"
            onClick={handleFullBackup}
          >
            <Download className="w-6 h-6 mb-2" />
            Full Backup
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone Section */}
      <Card className="border-red-600 ">
        <CardHeader>
          <CardTitle className="text-red-400">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-medium ">Reset All Settings</p>
              <p className="text-sm text-muted-foreground">Restore all settings to default values</p>
            </div>
            <Button
              onClick={handleResetSettings}
              variant="outline"
              className="border-red-600 text-red-500 hover:bg-red-500 hover:text-white"
            >
              Reset Settings
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-medium ">Delete All Data</p>
              <p className="text-sm text-muted-foreground">Permanently delete all your releases and data</p>
            </div>
            <Button
              onClick={handleDeleteAllData}
              variant="outline"
              className="border-red-600 text-red-500 hover:bg-red-500 hover:text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete All Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Advanced;