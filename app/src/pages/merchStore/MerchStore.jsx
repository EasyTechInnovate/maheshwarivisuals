import React, { useState } from 'react';
import { Eye, Plus, Upload, X, Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

const MerchStore = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'form', 'submitDesign', 'viewDesigns'
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeTab, setActiveTab] = useState('rejected');
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [formData, setFormData] = useState({
    artistName: '',
    artistFacebookLink: '',
    appleProfileLink: '',
    artistInstagramLink: '',
    spotifyProfileLink: '',
    youtubeChannelLink: '',
    productPreferences: {
      tshirts: false,
      hoodies: false,
      siperBottles: false,
      posters: false,
      toteBags: false,
      stickers: false,
      others: ''
    },
    marketingPlan: 'Yes',
    channels: {
      instagram: false,
      youtube: false,
      emailNewsletter: false,
      liveEvents: false,
      others: ''
    },
    mmcAssist: 'Yes',
    legalTerms: {
      reviewProcess: false,
      revisionsRight: false,
      emailNewsletter: false,
      showcasingConsent: false
    }
  });

  // Fake data for requests
  const [requests, setRequests] = useState([
    {
      id: 1,
      artistName: 'Rajesh Kumar',
      productPreferences: 'T-Shirts',
      marketingPlan: 'Yes',
      channel: 'Instagram',
      mmcAssist: 'No',
      status: 'Pending',
      submitDate: '2024-03-15',
      hasDesignSubmitted: false
    },
    {
      id: 2,
      artistName: 'Rajesh Kumar',
      productPreferences: 'Hoodies',
      marketingPlan: 'No',
      channel: 'N/A',
      mmcAssist: 'Yes',
      status: 'Approved',
      submitDate: '2024-03-10',
      hasDesignSubmitted: false
    },
    {
      id: 3,
      artistName: 'Rajesh Kumar',
      productPreferences: 'T-Shirts',
      marketingPlan: 'Yes',
      channel: 'Youtube',
      mmcAssist: 'No',
      status: 'Approved',
      submitDate: '2024-03-08',
      hasDesignSubmitted: true
    },
    {
      id: 4,
      artistName: 'Rajesh Kumar',
      productPreferences: 'T-Shirts',
      marketingPlan: 'No',
      channel: 'N/A',
      mmcAssist: 'Yes',
      status: 'Approved',
      submitDate: '2024-03-05',
      hasDesignSubmitted: true
    }
  ]);

  const [designs, setDesigns] = useState([
    { id: 1, image: 'https://via.placeholder.com/300x200?text=Design+1', products: ['T-Shirt', 'T-Shirt', 'T-Shirt'] },
    { id: 2, image: 'https://via.placeholder.com/300x200?text=Design+2', products: ['T-Shirt', 'T-Shirt', 'T-Shirt'] },
    { id: 3, image: 'https://via.placeholder.com/300x200?text=Design+3', products: ['T-Shirt', 'T-Shirt', 'T-Shirt'] }
  ]);

  const [designSlots, setDesignSlots] = useState(5);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleFileUpload = (slotIndex, event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles(prev => ({
        ...prev,
        [slotIndex]: {
          file,
          name: file.name,
          size: file.size,
          type: file.type
        }
      }));
    }
  };

  const handleNewRequest = () => {
    setCurrentView('form');
    setSelectedRequest(null);
    setFormData({
      artistName: '',
      artistFacebookLink: '',
      appleProfileLink: '',
      artistInstagramLink: '',
      spotifyProfileLink: '',
      youtubeChannelLink: '',
      productPreferences: {
        tshirts: false,
        hoodies: false,
        siperBottles: false,
        posters: false,
        toteBags: false,
        stickers: false,
        others: ''
      },
      marketingPlan: 'Yes',
      channels: {
        instagram: false,
        youtube: false,
        emailNewsletter: false,
        liveEvents: false,
        others: ''
      },
      mmcAssist: 'Yes',
      legalTerms: {
        reviewProcess: false,
        revisionsRight: false,
        emailNewsletter: false,
        showcasingConsent: false
      }
    });
  };

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setCurrentView('form');
    // Populate form with request data
    setFormData({
      artistName: request.artistName,
      artistFacebookLink: '',
      appleProfileLink: '',
      artistInstagramLink: '',
      spotifyProfileLink: '',
      youtubeChannelLink: '',
      productPreferences: {
        tshirts: request.productPreferences.includes('T-Shirts'),
        hoodies: request.productPreferences.includes('Hoodies'),
        siperBottles: false,
        posters: false,
        toteBags: false,
        stickers: false,
        others: ''
      },
      marketingPlan: request.marketingPlan,
      channels: {
        instagram: request.channel === 'Instagram',
        youtube: request.channel === 'Youtube',
        emailNewsletter: false,
        liveEvents: false,
        others: ''
      },
      mmcAssist: request.mmcAssist,
      legalTerms: {
        reviewProcess: true,
        revisionsRight: false,
        emailNewsletter: false,
        showcasingConsent: false
      }
    });
  };

  const handleSubmitDesign = (request) => {
    setSelectedRequest(request);
    setCurrentView('submitDesign');
    setUploadedFiles({});
  };

  const handleViewDesigns = (request) => {
    setSelectedRequest(request);
    setCurrentView('viewDesigns');
  };

  const handleApply = () => {
    if (selectedRequest) {
      // Update existing request
      setRequests(prev => prev.map(req => 
        req.id === selectedRequest.id 
          ? { ...req, ...formData, status: 'Pending' }
          : req
      ));
    } else {
      // Create new request
      const newRequest = {
        id: Date.now(),
        artistName: formData.artistName,
        productPreferences: Object.keys(formData.productPreferences).filter(key => formData.productPreferences[key]).join(', '),
        marketingPlan: formData.marketingPlan,
        channel: Object.keys(formData.channels).filter(key => formData.channels[key]).join(', ') || 'N/A',
        mmcAssist: formData.mmcAssist,
        status: 'Pending',
        submitDate: new Date().toISOString().split('T')[0],
        hasDesignSubmitted: false
      };
      setRequests(prev => [...prev, newRequest]);
    }
    setCurrentView('list');
  };

  const StatusBadge = ({ status }) => {
    const statusVariants = {
      'Pending': 'default',
      'Approved': 'secondary',
      'Rejected': 'destructive'
    };

    return (
      <Badge variant={statusVariants[status] || 'default'} className={
        status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
        status === 'Approved' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
        'bg-red-500/20 text-white-400 border-red-500/30'
      }>
        {status}
      </Badge>
    );
  };

  const renderList = () => (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className=" mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Merch Store</h1>
            <p className="text-muted-foreground">Set up your merchandise store and manage products</p>
          </div>
          <Button onClick={handleNewRequest} className="bg-[#711CE9] hover:bg-[#6f14ef] text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Request
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto custom-scroll">
              <table className="w-full  whitespace-nowrap ">
                <thead className="border-b text-muted-foreground  ">
                  <tr>
                    <th className="text-left p-4 font-medium">Artist/Label Name</th>
                    <th className="text-left p-4 font-medium">Product Preferences</th>
                    <th className="text-left p-4 font-medium">Marketing & Launch Plan</th>
                    <th className="text-left p-4 font-medium">Channel</th>
                    <th className="text-left p-4 font-medium">MMC Assist</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Submit Date</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request.id} className="border-b">
                      <td className="p-4">{request.artistName}</td>
                      <td className="p-4">{request.productPreferences}</td>
                      <td className="p-4">{request.marketingPlan}</td>
                      <td className="p-4">{request.channel}</td>
                      <td className="p-4">{request.mmcAssist}</td>
                      <td className="p-4">
                        <StatusBadge status={request.status} />
                      </td>
                      <td className="p-4">{request.submitDate}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewRequest(request)}
                          >
                            <Eye className="w-4 h-4" /> View
                          </Button>
                          {request.status === 'Approved' && !request.hasDesignSubmitted && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSubmitDesign(request)}
                              className="text-green-400 border-green-500/30"
                            >
                              Submit Design
                            </Button>
                          )}
                          {request.status === 'Approved' && request.hasDesignSubmitted && (
                            <>
                              <Badge className="bg-green-500/20 text-green-400">
                                Design Submitted
                              </Badge>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewDesigns(request)}
                                className="text-blue-400 border-blue-500/30"
                              >
                                View Merch
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderForm = () => (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className=" mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="icon" onClick={() => setCurrentView('list')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Merch Store</h1>
              <p className="text-muted-foreground">Set up your merchandise store and manage products</p>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                <span className="text-sm">👤</span>
              </div>
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="artistName">Artist/Label Name</Label>
              <Input
                id="artistName"
                value={formData.artistName}
                onChange={(e) => handleInputChange('artistName', e.target.value)}
                disabled={selectedRequest !== null}
                placeholder="Artist"
              />
            </div>
            <div>
              <Label htmlFor="instagram">Artist's Instagram Link</Label>
              <Input
                id="instagram"
                value={formData.artistInstagramLink}
                onChange={(e) => handleInputChange('artistInstagramLink', e.target.value)}
                disabled={selectedRequest !== null}
                placeholder="Instagram URL"
              />
            </div>
            <div>
              <Label htmlFor="facebook">Artist Facebook Page Link</Label>
              <Input
                id="facebook"
                value={formData.artistFacebookLink}
                onChange={(e) => handleInputChange('artistFacebookLink', e.target.value)}
                disabled={selectedRequest !== null}
                placeholder="Facebook URL"
              />
            </div>
            <div>
              <Label htmlFor="spotify">Spotify Profile Link</Label>
              <Input
                id="spotify"
                value={formData.spotifyProfileLink}
                onChange={(e) => handleInputChange('spotifyProfileLink', e.target.value)}
                disabled={selectedRequest !== null}
                placeholder="Spotify URL"
              />
            </div>
            <div>
              <Label htmlFor="apple">Apple Music Profile Link</Label>
              <Input
                id="apple"
                value={formData.appleProfileLink}
                onChange={(e) => handleInputChange('appleProfileLink', e.target.value)}
                disabled={selectedRequest !== null}
                placeholder="Apple Music URL"
              />
            </div>
            <div>
              <Label htmlFor="youtube">YouTube Channel Link</Label>
              <Input
                id="youtube"
                value={formData.youtubeChannelLink}
                onChange={(e) => handleInputChange('youtubeChannelLink', e.target.value)}
                disabled={selectedRequest !== null}
                placeholder="YouTube URL"
              />
            </div>
          </CardContent>
        </Card>

        {/* Product Preferences */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Product Preferences</CardTitle>
            <CardDescription>Select the types of products you want to launch with your designs:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {[
                { key: 'tshirts', label: 'T-Shirts' },
                { key: 'hoodies', label: 'Hoodies' },
                { key: 'siperBottles', label: 'Siper Bottles' },
                { key: 'posters', label: 'Posters' },
                { key: 'toteBags', label: 'Tote Bags' },
                { key: 'stickers', label: 'Stickers' }
              ].map(product => (
                <div key={product.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={product.key}
                    checked={formData.productPreferences[product.key]}
                    onCheckedChange={(checked) => handleNestedChange('productPreferences', product.key, checked)}
                    disabled={selectedRequest !== null}
                  />
                  <Label htmlFor={product.key}>{product.label}</Label>
                </div>
              ))}
            </div>
            <div>
              <Label htmlFor="othersProduct">Others:</Label>
              <Input
                id="othersProduct"
                value={formData.productPreferences.others}
                onChange={(e) => handleNestedChange('productPreferences', 'others', e.target.value)}
                disabled={selectedRequest !== null}
              />
            </div>
          </CardContent>
        </Card>

        {/* Marketing & Launch Plan */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Marketing & Launch Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="marketingPlan">Do you plan to promote the merch drop?</Label>
              <Select
                value={formData.marketingPlan}
                onValueChange={(value) => handleInputChange('marketingPlan', value)}
                disabled={selectedRequest !== null}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-4 block">Channels you'll use:</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {[
                  { key: 'instagram', label: 'Instagram' },
                  { key: 'youtube', label: 'YouTube' },
                  { key: 'emailNewsletter', label: 'Email Newsletter' },
                  { key: 'liveEvents', label: 'Live Events' }
                ].map(channel => (
                  <div key={channel.key} className="flex items-center space-x-2">
                    <Checkbox
                      id={channel.key}
                      checked={formData.channels[channel.key]}
                      onCheckedChange={(checked) => handleNestedChange('channels', channel.key, checked)}
                      disabled={selectedRequest !== null}
                    />
                    <Label htmlFor={channel.key}>{channel.label}</Label>
                  </div>
                ))}
              </div>
              <div>
                <Label htmlFor="othersChannel">Others:</Label>
                <Input
                  id="othersChannel"
                  value={formData.channels.others}
                  onChange={(e) => handleNestedChange('channels', 'others', e.target.value)}
                  disabled={selectedRequest !== null}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="mmcAssist">Would you like MMC to assist with marketing?</Label>
              <Select
                value={formData.mmcAssist}
                onValueChange={(value) => handleInputChange('mmcAssist', value)}
                disabled={selectedRequest !== null}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Legal & Approval Terms */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Legal & Approval Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { key: 'reviewProcess', label: "I agree to MMC's review and approval process before merch goes live." },
                { key: 'revisionsRight', label: "I understand that MMC reserves the right to reject or request revisions to submitted designs." },
                { key: 'emailNewsletter', label: "Email Newsletter" },
                { key: 'showcasingConsent', label: "I consent to MMC showcasing approved designs on its platform and social media." }
              ].map(term => (
                <div key={term.key} className="flex items-start space-x-2">
                  <Checkbox
                    id={term.key}
                    checked={formData.legalTerms[term.key]}
                    onCheckedChange={(checked) => handleNestedChange('legalTerms', term.key, checked)}
                    disabled={selectedRequest !== null}
                    className="mt-0.5"
                  />
                  <Label htmlFor={term.key} className="text-sm leading-5">{term.label}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentView('list')}>
            Cancel
          </Button>
          <Button onClick={handleApply} className="bg-[#711CE9] text-white hover:bg-[#6f14ef]" disabled={selectedRequest !== null}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );

  const renderSubmitDesign = () => (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className=" mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="icon" onClick={() => setCurrentView('list')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Merch Store</h1>
              <p className="text-muted-foreground">Set up your merchandise store and manage products</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Submit Your Designs (Minimum 5)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Array.from({ length: designSlots }, (_, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Design {index + 1}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  {uploadedFiles[index] ? (
                    <div className="space-y-2">
                      <Check className="w-12 h-12 text-green-500 mx-auto" />
                      <p className="text-sm font-medium">{uploadedFiles[index].name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(uploadedFiles[index].size / 1024).toFixed(1)} KB
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setUploadedFiles(prev => {
                          const updated = { ...prev };
                          delete updated[index];
                          return updated;
                        })}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-2">Drop your Design file here</p>
                      <p className="text-sm text-muted-foreground mb-4">Supports: PNG, JPG, SVG, PDF</p>
                      <div className="relative">
                        <Button className="bg-[#711CE9] hover:bg-[#6f14ef]">
                          Choose File
                        </Button>
                        <input
                          type="file"
                          accept="image/*,.pdf,.svg"
                          onChange={(e) => handleFileUpload(index, e)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add more design slot */}
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add more Design
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12">
                <Plus className="w-16 h-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-2">Add another design slot</p>
                <p className="text-sm text-muted-foreground mb-4">Increase your design options</p>
                <Button
                  onClick={() => setDesignSlots(prev => prev + 1)}
                  variant="outline"
                >
                  Add Slot
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Legal & Approval Terms */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Legal & Approval Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "I confirm that all submitted designs are original and do not infringe on third-party rights.",
                "I agree to MMC's review and approval process before merch goes live.",
                "I understand that MMC reserves the right to reject or request revisions to submitted designs.",
                "I consent to MMC showcasing approved designs on its platform and social media."
              ].map((term, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Checkbox id={`design-term-${index}`} className="mt-0.5" />
                  <Label htmlFor={`design-term-${index}`} className="text-sm leading-5">{term}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentView('list')}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              // Update request to show design submitted
              setRequests(prev => prev.map(req => 
                req.id === selectedRequest.id 
                  ? { ...req, hasDesignSubmitted: true }
                  : req
              ));
              setCurrentView('list');
            }}
            className="bg-[#711CE9] hover:bg-[#6f14ef]"
          >
            Submit Designs
          </Button>
        </div>
      </div>
    </div>
  );

  const renderViewDesigns = () => (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className=" mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="icon" onClick={() => setCurrentView('list')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Merch Store</h1>
              <p className="text-muted-foreground">Set up your merchandise store and manage products</p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="active">Active Merch</TabsTrigger>
          </TabsList>

          <TabsContent value="rejected">
            <Card>
              <CardHeader>
                <CardTitle>Rejected Designs</CardTitle>
                <CardDescription>Designs that need revision or resubmission</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto  custom-scroll">
                  <table className="w-full ">
                    <thead className="border-b">
                      <tr className="whitespace-nowrap text-muted-foreground">
                        <th className="text-left p-4 font-medium">Artist/Label Name</th>
                        <th className="text-left p-4 font-medium">Product Preferences</th>
                        <th className="text-left p-4 font-medium">Marketing & Launch Plan</th>
                        <th className="text-left p-4 font-medium">Channel</th>
                        <th className="text-left p-4 font-medium">MMC Assist</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Submit Date</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          id: 'rej1',
                          artistName: 'Rajesh Kumar',
                          productPreferences: 'T-Shirts',
                          marketingPlan: 'No',
                          channel: 'N/A',
                          mmcAssist: 'Yes',
                          status: 'Rejected',
                          submitDate: '2024-03-05'
                        },
                        {
                          id: 'rej2',
                          artistName: 'Rajesh Kumar',
                          productPreferences: 'T-Shirts',
                          marketingPlan: 'No',
                          channel: 'N/A',
                          mmcAssist: 'Yes',
                          status: 'Rejected',
                          submitDate: '2024-03-05'
                        }
                      ].map((request) => (
                        <tr key={request.id} className="border-b whitespace-nowrap">
                          <td className="p-4">{request.artistName}</td>
                          <td className="p-4">{request.productPreferences}</td>
                          <td className="p-4">{request.marketingPlan}</td>
                          <td className="p-4">{request.channel}</td>
                          <td className="p-4">{request.mmcAssist}</td>
                          <td className="p-4">
                            <StatusBadge status={request.status} className='text-white' />
                          </td>
                          <td className="p-4">{request.submitDate}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewRequest(request)}
                              >
                                <Eye className="w-4 h-4" /> View
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Merch</CardTitle>
                <CardDescription>Currently live merchandise products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {designs.map((design) => (
                    <Card key={design.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">User Design</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted rounded-lg p-4 mb-4">
                          <img
                            src={design.image}
                            alt="User Design"
                            className="w-full h-32 object-cover rounded"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2 text-muted-foreground">Product Assigned</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                              <span>Name</span>
                              <span>Link</span>
                            </div>
                            {design.products.map((product, idx) => (
                              <div key={idx} className="flex justify-between items-center">
                                <span className="text-sm">{product}</span>
                                <Button variant="link" size="sm" className="text-[#711CE9] p-0 h-auto">
                                  Link
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button className="w-full text-white bg-[#711CE9] hover:bg-[#6f14ef]">
                          <Upload className="w-4 h-4 mr-2" />
                          Send Opt Request
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <Button variant="outline" onClick={() => setCurrentView('list')}>
            Back to List
          </Button>
        </div>
      </div>
    </div>
  );

  // Main render
  switch (currentView) {
    case 'form':
      return renderForm();
    case 'submitDesign':
      return renderSubmitDesign();
    case 'viewDesigns':
      return renderViewDesigns();
    default:
      return renderList();
  }
};

export default MerchStore;