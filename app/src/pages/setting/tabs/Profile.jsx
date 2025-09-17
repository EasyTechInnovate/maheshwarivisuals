import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Camera, Link, Shield, CreditCard } from 'lucide-react';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const fileInputRef = useRef(null);
  
  // Form data state
  const [formData, setFormData] = useState({
    profileImage: '',
    firstName: '',
    lastName: '',
    artistName: '',
    phoneNumber: '',
    bio: '',
    primaryGenre: '',
    location: '',
    socialMedia: {
      instagram: '',
      youtube: '',
      spotify: '',
      website: ''
    },
    kyc: {
      aadhaarNumber: '',
      panNumber: '',
      bankNumber: '',
      ifscCode: '',
      status: 'approved'
    },
    subscription: {
      plan: 'Premium Plan',
      price: '$99',
      period: 'per year',
      status: 'Active',
      startDate: 'Jan 15, 2024',
      endDate: 'Jan 15, 2025',
      paymentMethod: '•••• 1234',
      nextBilling: 'Jan 15, 2025',
      autoRenewal: true,
      features: [
        'Unlimited music releases',
        'Advanced analytics dashboard',
        'Priority customer support',
        'Playlist pitching service',
        'Custom artist profile'
      ]
    }
  });

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Fake data from API
      const profileData = {
        profileImage: '',
        firstName: 'Artist',
        lastName: 'Name',
        artistName: 'Artist Name',
        phoneNumber: '+91 98765 43210',
        bio: 'Passionate musician creating unique sounds and connecting with fans worldwide.',
        primaryGenre: 'pop',
        location: 'Mumbai, India',
        socialMedia: {
          instagram: 'https://instagram.com/yourhandle',
          youtube: 'https://youtube.com/yourchannel',
          spotify: 'https://open.spotify.com/artist/...',
          website: 'https://yourwebsite.com'
        },
        kyc: {
          aadhaarNumber: '1234 5678 9012 3456',
          panNumber: 'ABCDE1234F',
          bankNumber: '1234567890123456',
          ifscCode: 'HDFC0000123',
          status: 'approved'
        },
        subscription: {
          plan: 'Premium Plan',
          price: '$99',
          period: 'per year',
          status: 'Active',
          startDate: 'Jan 15, 2024',
          endDate: 'Jan 15, 2025',
          paymentMethod: '•••• 1234',
          nextBilling: 'Jan 15, 2025',
          autoRenewal: true,
          features: [
            'Unlimited music releases',
            'Advanced analytics dashboard',
            'Priority customer support',
            'Playlist pitching service',
            'Custom artist profile'
          ]
        }
      };

      setFormData(profileData);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      alert('Error loading profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialMediaChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  const handleKycChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      kyc: {
        ...prev.kyc,
        [field]: value
      }
    }));
  };

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  const maxSizeBytes = 5 * 1024 * 1024; // 5 MB in bytes

  if (file) {
    if (file.size > maxSizeBytes) {
      alert('The selected image is too large. Please select an image less than 5 MB.');
      return; // Stop the function if the file is too large
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setProfileImage(e.target.result);
      handleInputChange('profileImage', e.target.result);
    };
    reader.readAsDataURL(file);
  }
};
  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Saving profile data:', formData);
      
      // Here you would make the actual API call
      // const response = await fetch('/api/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      alert('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSocialMedia = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving social media data:', formData.socialMedia);
      alert('Social media links saved successfully!');
    } catch (error) {
      console.error('Error saving social media:', error);
      alert('Error saving social media links. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveKyc = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving KYC data:', formData.kyc);
      alert('KYC details saved successfully!');
    } catch (error) {
      console.error('Error saving KYC:', error);
      alert('Error saving KYC details. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile Information Section */}
      <Card className="border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <CardTitle>Profile Information</CardTitle>
          </div>
          <Button 
            onClick={handleSaveProfile}
            disabled={saving}
            className="text-white bg-purple-600 hover:bg-purple-700"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profileImage || formData.profileImage} />
                <AvatarFallback className="bg-purple-600 text-white text-2xl">
                  <User className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              <label className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-2 cursor-pointer hover:bg-purple-700 transition-colors">
                <Camera className="w-4 h-4 text-white" />
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                />
              </label>
            </div>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Button variant="outline" onClick={()=> fileInputRef.current.click()} className="border-slate-600">
                  Upload New Photo
                </Button>
                <Button 
                  variant="outline" 
                  className="border-slate-600"
                  onClick={() => {
                    setProfileImage(null);
                    handleInputChange('profileImage', '');
                  }}
                >
                  Remove Photo
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">JPG, PNG up to 5MB</p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              <Input
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Artist"
                className="border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              <Input
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Name"
                className="border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Stage/Artist Name</label>
              <Input
                value={formData.artistName}
                onChange={(e) => handleInputChange('artistName', e.target.value)}
                placeholder="Artist Name"
                className="border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="+91 98765 43210"
                className="border-slate-700"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <Textarea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Passionate musician creating unique sounds and connecting with fans worldwide."
              className="border-slate-700 min-h-[100px]"
            />
          </div>

          {/* Primary Genre and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Primary Genre</label>
              <Select 
                value={formData.primaryGenre} 
                onValueChange={(value) => handleInputChange('primaryGenre', value)}
              >
                <SelectTrigger className="border-slate-700">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pop">Pop</SelectItem>
                  <SelectItem value="rock">Rock</SelectItem>
                  <SelectItem value="hip-hop">Hip Hop</SelectItem>
                  <SelectItem value="electronic">Electronic</SelectItem>
                  <SelectItem value="classical">Classical</SelectItem>
                  <SelectItem value="jazz">Jazz</SelectItem>
                  <SelectItem value="blues">Blues</SelectItem>
                  <SelectItem value="country">Country</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Mumbai, India"
                className="border-slate-700"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Links Section */}
      <Card className="border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Link className="w-5 h-5" />
            <CardTitle>Social Media Links</CardTitle>
          </div>
          <Button 
            onClick={handleSaveSocialMedia}
            disabled={saving}
            className="text-white bg-purple-600 hover:bg-purple-700"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Instagram</label>
            <Input
              value={formData.socialMedia.instagram}
              onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
              placeholder="https://instagram.com/yourhandle"
              className="border-slate-700"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">YouTube</label>
            <Input
              value={formData.socialMedia.youtube}
              onChange={(e) => handleSocialMediaChange('youtube', e.target.value)}
              placeholder="https://youtube.com/yourchannel"
              className="border-slate-700"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Spotify Artist Profile</label>
            <Input
              value={formData.socialMedia.spotify}
              onChange={(e) => handleSocialMediaChange('spotify', e.target.value)}
              placeholder="https://open.spotify.com/artist/..."
              className="border-slate-700"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Personal Website</label>
            <Input
              value={formData.socialMedia.website}
              onChange={(e) => handleSocialMediaChange('website', e.target.value)}
              placeholder="https://yourwebsite.com"
              className="border-slate-700"
            />
          </div>
        </CardContent>
      </Card>

      {/* KYC Details Section */}
      <Card className="border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <CardTitle>KYC Details</CardTitle>
            <Badge className="bg-green-600 text-white">
              {formData.kyc.status === 'approved' ? 'Approved' : 'Pending'}
            </Badge>
          </div>
          <Button 
            onClick={handleSaveKyc}
            disabled={saving || formData.kyc.status === 'approved'}
            className="text-white bg-purple-600 hover:bg-purple-700"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Aadhaar Number</label>
              <Input
                value={formData.kyc.aadhaarNumber}
                onChange={(e) => handleKycChange('aadhaarNumber', e.target.value)}
                placeholder="1234 5678 9012 3456"
                className="border-slate-700"
                disabled={formData.kyc.status === 'approved'}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">PAN Card Number</label>
              <Input
                value={formData.kyc.panNumber}
                onChange={(e) => handleKycChange('panNumber', e.target.value)}
                placeholder="ABCDE1234F"
                className="border-slate-700"
                disabled={formData.kyc.status === 'approved'}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Bank Number</label>
              <Input
                value={formData.kyc.bankNumber}
                onChange={(e) => handleKycChange('bankNumber', e.target.value)}
                placeholder="1234567890123456"
                className="border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">IFSC Code</label>
              <Input
                value={formData.kyc.ifscCode}
                onChange={(e) => handleKycChange('ifscCode', e.target.value)}
                placeholder="HDFC0000123"
                className="border-slate-700"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Section */}
      <Card className="border-slate-700">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            <CardTitle>Current Subscription</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">Manage your subscription plan and billing information</p>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold">{formData.subscription.plan}</h3>
                <p className="text-purple-100">Access to all premium features</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{formData.subscription.price}</div>
                <div className="text-purple-100">{formData.subscription.period}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span>Started: {formData.subscription.startDate}</span>
              <span>Ends: {formData.subscription.endDate}</span>
              <Badge className="bg-green-500 text-white">{formData.subscription.status}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Plan Features</h4>
              <ul className="space-y-2 text-sm">
                {formData.subscription.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Billing Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span>{formData.subscription.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Next Billing:</span>
                  <span>{formData.subscription.nextBilling}</span>
                </div>
                <div className="flex justify-between">
                  <span>Auto-renewal:</span>
                  <span>{formData.subscription.autoRenewal ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button className="bg-purple-600 text-white hover:bg-purple-700 flex-1">
              Upgrade Plan
            </Button>
            <Button variant="outline" className="border-slate-600">
              Manage Billing
            </Button>
            <Button variant="outline" className="border-slate-600 text-red-400 hover:text-red-300">
              Cancel Subscription
            </Button>
          </div>
        </CardContent>
      </Card>

       <Card className="space-y-8">
        <CardHeader>
            <h2 className="text-2xl font-bold">Available Plans</h2>
            <p className="text-muted-foreground">Choose the plan that best fits your needs</p>
            
        </CardHeader>

      
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Basic Plan Card */}
        <Card className="border-slate-700 p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-xl font-semibold">Basic</CardTitle>
            <p className="text-4xl font-bold text-purple-600">$29<span className="text-base font-normal text-muted-foreground"> per year</span></p>
          </CardHeader>
          <CardContent className="p-0 space-y-2">
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                5 releases per month
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                Basic analytics
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                Email support
              </li>
            </ul>
            <Button className="w-full text-white bg-purple-600 hover:bg-purple-700 mt-4">
              Upgrade
            </Button>
          </CardContent>
        </Card>

        {/* Premium Plan Card (Current Plan) */}
        <Card className="border-2 border-purple-600 p-6 relative">
          <div className="absolute top-0 right-0 m-3 px-2 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
            Current Plan
          </div>
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-xl font-semibold">Premium</CardTitle>
            <p className="text-4xl font-bold text-purple-600">$99<span className="text-base font-normal text-muted-foreground"> per year</span></p>
          </CardHeader>
          <CardContent className="p-0 space-y-2">
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                Unlimited releases
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                Advanced analytics
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                Priority support
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                Playlist pitching
              </li>
            </ul>
            <Button className="w-full text-white bg-slate-800  cursor-not-allowed mt-4" disabled>
              Current Plan
            </Button>
          </CardContent>
        </Card>

        {/* Enterprise Plan Card */}
        <Card className="border-slate-700 p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-xl font-semibold">Enterprise</CardTitle>
            <p className="text-4xl font-bold text-purple-600">$299<span className="text-base font-normal text-muted-foreground"> per year</span></p>
          </CardHeader>
          <CardContent className="p-0 space-y-2">
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                Everything in Premium
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                Label management
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                Team collaboration
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                Custom branding
              </li>
            </ul>
            <Button className="w-full text-white bg-purple-600 hover:bg-purple-700 mt-4">
              Upgrade
            </Button>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
    </div>
  );
};

export default Profile;