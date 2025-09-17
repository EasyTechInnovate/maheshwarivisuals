import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bell, 
  Mail, 
  Smartphone, 
  Monitor,
  Music,
  DollarSign,
  Megaphone,
  Shield,
  Volume2
} from 'lucide-react';

const Notifications = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    emailNotifications: {
      accountUpdates: {
        enabled: true,
        description: 'Security alerts, password changes, etc.'
      },
      releaseUpdates: {
        enabled: true,
        description: 'Updates about your music releases'
      },
      royaltyReports: {
        enabled: true,
        description: 'Monthly royalty statements and payments'
      },
      marketingUpdates: {
        enabled: true,
        description: 'Campaign results and promotional opportunities'
      },
      marketingEmails: {
        enabled: false,
        description: 'Tips, news, and promotional content'
      }
    },
    pushNotifications: {
      browserNotifications: {
        enabled: true,
        description: 'Real-time updates in your browser'
      },
      mobileAppNotifications: {
        enabled: true,
        description: 'Push notifications on your mobile device'
      }
    },
    notificationFrequency: {
      emailDigest: 'weekly'
    }
  });

  // Fetch notification data on component mount
  useEffect(() => {
    fetchNotificationData();
  }, []);

  const fetchNotificationData = async () => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // The formData is already initialized with default values
      console.log('Notification data loaded');
    } catch (error) {
      console.error('Error fetching notification data:', error);
      alert('Error loading notification data');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailNotificationToggle = async (type, enabled) => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setFormData(prev => ({
        ...prev,
        emailNotifications: {
          ...prev.emailNotifications,
          [type]: {
            ...prev.emailNotifications[type],
            enabled: enabled
          }
        }
      }));
      
      console.log(`Email notification ${type} toggled:`, enabled);
    } catch (error) {
      console.error('Error updating email notification:', error);
      alert('Error updating notification setting. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handlePushNotificationToggle = async (type, enabled) => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setFormData(prev => ({
        ...prev,
        pushNotifications: {
          ...prev.pushNotifications,
          [type]: {
            ...prev.pushNotifications[type],
            enabled: enabled
          }
        }
      }));
      
      console.log(`Push notification ${type} toggled:`, enabled);
    } catch (error) {
      console.error('Error updating push notification:', error);
      alert('Error updating notification setting. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleEmailDigestChange = async (frequency) => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setFormData(prev => ({
        ...prev,
        notificationFrequency: {
          ...prev.notificationFrequency,
          emailDigest: frequency
        }
      }));
      
      console.log('Email digest frequency changed:', frequency);
    } catch (error) {
      console.error('Error updating email digest frequency:', error);
      alert('Error updating email digest frequency. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAllSettings = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving all notification settings:', formData);
      alert('Notification settings saved successfully!');
    } catch (error) {
      console.error('Error saving notification settings:', error);
      alert('Error saving notification settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'accountUpdates':
        return <Shield className="w-5 h-5" />;
      case 'releaseUpdates':
        return <Music className="w-5 h-5" />;
      case 'royaltyReports':
        return <DollarSign className="w-5 h-5" />;
      case 'marketingUpdates':
        return <Megaphone className="w-5 h-5" />;
      case 'marketingEmails':
        return <Mail className="w-5 h-5" />;
      case 'browserNotifications':
        return <Monitor className="w-5 h-5" />;
      case 'mobileAppNotifications':
        return <Smartphone className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationTitle = (type) => {
    const titles = {
      accountUpdates: 'Account Updates',
      releaseUpdates: 'Release Updates',
      royaltyReports: 'Royalty Reports',
      marketingUpdates: 'Marketing Updates',
      marketingEmails: 'Marketing Emails',
      browserNotifications: 'Browser Notifications',
      mobileAppNotifications: 'Mobile App Notifications'
    };
    return titles[type] || type;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading notification settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Save Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Notification Preferences</h2>
        </div>
        <Button 
          onClick={handleSaveAllSettings}
          disabled={saving}
          className="bg-purple-600 text-white hover:bg-purple-700"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* Email Notifications Section */}
      <Card className="border-slate-700">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <CardTitle>Email Notifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(formData.emailNotifications).map(([key, notification]) => (
            <div key={key} className="flex items-center justify-between py-4 border-b border-slate-800 last:border-b-0">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted/20 rounded-lg">
                  {getNotificationIcon(key)}
                </div>
                <div className="space-y-1">
                  <div className="font-medium">{getNotificationTitle(key)}</div>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
              </div>
              <Switch
                checked={notification.enabled}
                onCheckedChange={(enabled) => handleEmailNotificationToggle(key, enabled)}
                disabled={saving}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Push Notifications Section */}
      <Card className="border-slate-700">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            <CardTitle>Push Notifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(formData.pushNotifications).map(([key, notification]) => (
            <div key={key} className="flex items-center justify-between py-4 border-b border-slate-800 last:border-b-0">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted/20 rounded-lg">
                  {getNotificationIcon(key)}
                </div>
                <div className="space-y-1">
                  <div className="font-medium">{getNotificationTitle(key)}</div>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
              </div>
              <Switch
                checked={notification.enabled}
                onCheckedChange={(enabled) => handlePushNotificationToggle(key, enabled)}
                disabled={saving}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notification Frequency Section */}
      <Card className="border-slate-700">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            <CardTitle>Notification Frequency</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-medium">Email Digest</div>
              <p className="text-sm text-muted-foreground">
                How often would you like to receive digest emails?
              </p>
            </div>
            <Select
              value={formData.notificationFrequency.emailDigest}
              onValueChange={handleEmailDigestChange}
              disabled={saving}
            >
              <SelectTrigger className="w-32 border-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;