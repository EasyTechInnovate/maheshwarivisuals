import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Plus, 
  MapPin,
  Building,
  Download,
  FileText
} from 'lucide-react';

const Billing = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    paymentMethods: [],
    billingAddress: {
      flatNumber: '',
      streetAddress: '',
      nearbyLandmark: '',
      city: '',
      state: '',
      pincode: ''
    },
    taxInformation: {
      panNumber: '',
      gstNumber: ''
    }
  });

  const [billingHistory, setBillingHistory] = useState([]);

  // Fetch billing data on component mount
  useEffect(() => {
    fetchBillingData();
  }, []);

  const fetchBillingData = async () => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Fake data from API
      const billingData = {
        paymentMethods: [
          {
            id: 1,
            type: 'bank',
            name: 'Bank Account',
            details: 'HDFC Bank ****1234',
            verified: true,
            primary: true,
            icon: 'bank'
          },
          {
            id: 2,
            type: 'upi',
            name: 'UPI',
            details: 'artist@paytm',
            verified: true,
            primary: false,
            icon: 'upi'
          }
        ],
        billingAddress: {
          flatNumber: '127 5b',
          streetAddress: 'Gurudwara road agra',
          nearbyLandmark: 'Gurudwara road agra',
          city: 'Agra',
          state: 'Uttar Pradesh',
          pincode: '282007'
        },
        taxInformation: {
          panNumber: 'ABCDE1234F',
          gstNumber: 'ZZAAAA0000A1ZS'
        }
      };

      const historyData = [
        { id: 1, description: 'AI Mastering Credits', date: '2024-01-15', amount: '₹799', status: 'Paid' },
        { id: 2, description: 'Pro Plan Subscription', date: '2024-01-01', amount: '₹1,499', status: 'Paid' },
        { id: 3, description: 'Marketing Campaign', date: '2023-12-15', amount: '₹2,500', status: 'Paid' }
      ];

      setFormData(billingData);
      setBillingHistory(historyData);
    } catch (error) {
      console.error('Error fetching billing data:', error);
      alert('Error loading billing data');
    } finally {
      setLoading(false);
    }
  };

  const handleBillingAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      billingAddress: {
        ...prev.billingAddress,
        [field]: value
      }
    }));
  };

  const handleTaxInfoChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      taxInformation: {
        ...prev.taxInformation,
        [field]: value
      }
    }));
  };

  const handleUpdateAddress = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Updating billing address:', formData.billingAddress);
      alert('Billing address updated successfully!');
    } catch (error) {
      console.error('Error updating billing address:', error);
      alert('Error updating billing address. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateTaxInfo = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Updating tax information:', formData.taxInformation);
      alert('Tax information updated successfully!');
    } catch (error) {
      console.error('Error updating tax information:', error);
      alert('Error updating tax information. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddPaymentMethod = async () => {
    alert('Add Payment Method functionality will be implemented here');
  };

  const handleEditPaymentMethod = async (methodId) => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Editing payment method:', methodId);
      alert('Edit Payment Method functionality will be implemented here');
    } catch (error) {
      console.error('Error editing payment method:', error);
      alert('Error editing payment method. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleRemovePaymentMethod = async (methodId) => {
    const method = formData.paymentMethods.find(m => m.id === methodId);
    if (method?.primary) {
      alert('Cannot remove primary payment method. Please set another method as primary first.');
      return;
    }

    if (!confirm('Are you sure you want to remove this payment method?')) {
      return;
    }

    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setFormData(prev => ({
        ...prev,
        paymentMethods: prev.paymentMethods.filter(method => method.id !== methodId)
      }));
      
      console.log('Payment method removed:', methodId);
      alert('Payment method removed successfully!');
    } catch (error) {
      console.error('Error removing payment method:', error);
      alert('Error removing payment method. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadInvoice = () => {
    alert('Downloading invoice history...');
  };

  const getPaymentMethodIcon = (type) => {
    switch (type) {
      case 'bank':
        return <Building className="w-5 h-5" />;
      case 'upi':
        return <CreditCard className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading billing information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Payment Methods Section */}
      <Card className="border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            <CardTitle>Payment Methods</CardTitle>
          </div>
          <Button 
            onClick={handleAddPaymentMethod}
            disabled={saving}
            className="bg-transparent border border-slate-600 text-black dark:text-white   hover:bg-muted-foreground/10 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Payment Method
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.paymentMethods.map((method) => (
            <div 
              key={method.id}
              className="flex items-center justify-between p-4 border border-slate-800 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-600 rounded-lg">
                  {getPaymentMethodIcon(method.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{method.name}</span>
                    {method.verified && (
                      <Badge className="bg-green-600 text-white text-xs">
                        Verified
                      </Badge>
                    )}
                    {method.primary && (
                      <Badge className="bg-purple-600 text-white text-xs">
                        Primary
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {method.details}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditPaymentMethod(method.id)}
                  disabled={saving}
                  className="border-slate-600  text-black dark:text-white   hover:bg-muted-foreground/10"
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemovePaymentMethod(method.id)}
                  disabled={saving || method.primary}
                  className="border-slate-600 text-red-400 hover:text-red-300 hover:border-red-400"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Full Address Section */}
      <Card className="border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <CardTitle>Full Address</CardTitle>
          </div>
          <Button 
            onClick={handleUpdateAddress}
            disabled={saving}
            className="bg-purple-600 text-white hover:bg-purple-700"
          >
            {saving ? 'Updating...' : 'Update Address'}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Flat, House no., etc */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Flat, House no., etc
            </label>
            <Input
              value={formData.billingAddress.flatNumber}
              onChange={(e) => handleBillingAddressChange('flatNumber', e.target.value)}
              placeholder="127 5b"
              className="border-slate-700"
            />
          </div>

          {/* Street Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Street Address
            </label>
            <Input
              value={formData.billingAddress.streetAddress}
              onChange={(e) => handleBillingAddressChange('streetAddress', e.target.value)}
              placeholder="Gurudwara road agra"
              className="border-slate-700"
            />
          </div>

          {/* Nearby Landmark */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Nearby Landmark
            </label>
            <Input
              value={formData.billingAddress.nearbyLandmark}
              onChange={(e) => handleBillingAddressChange('nearbyLandmark', e.target.value)}
              placeholder="Gurudwara road agra"
              className="border-slate-700"
            />
          </div>

          {/* City and State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                City
              </label>
              <Input
                value={formData.billingAddress.city}
                onChange={(e) => handleBillingAddressChange('city', e.target.value)}
                placeholder="Agra"
                className="border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                State
              </label>
              <Input
                value={formData.billingAddress.state}
                onChange={(e) => handleBillingAddressChange('state', e.target.value)}
                placeholder="Uttar Pradesh"
                className="border-slate-700"
              />
            </div>
          </div>

          {/* Pincode */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Pincode
            </label>
            <Input
              value={formData.billingAddress.pincode}
              onChange={(e) => handleBillingAddressChange('pincode', e.target.value)}
              placeholder="282007"
              className="border-slate-700"
              maxLength={6}
            />
          </div>
        </CardContent>
      </Card>

      {/* Billing History Section */}
      <Card className="border-slate-700">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            <CardTitle>Billing History</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {billingHistory.map((item) => (
            <div 
              key={item.id}
              className="flex justify-between items-center py-2 border-b border-slate-800 last:border-b-0"
            >
              <div>
                <div className="font-medium">{item.description}</div>
                <div className="text-sm text-muted-foreground">{item.date}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{item.amount}</div>
                <Badge className="bg-green-600 text-white text-xs">{item.status}</Badge>
              </div>
            </div>
          ))}
          <div className="text-center mt-4">
            <Button
              variant="ghost"
              onClick={handleDownloadInvoice}
              className="text-purple-600 hover:text-purple-500 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Invoice History
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tax Information Section */}
      <Card className="border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            <CardTitle>Tax Information</CardTitle>
          </div>
          <Button 
            onClick={handleUpdateTaxInfo}
            disabled={saving}
            className="bg-purple-600 text-white hover:bg-purple-700"
          >
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* PAN Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                PAN Number
              </label>
              <Input
                value={formData.taxInformation.panNumber}
                onChange={(e) => handleTaxInfoChange('panNumber', e.target.value)}
                placeholder="ABCDE1234F"
                className="border-slate-700"
              />
            </div>
            
            {/* GST Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                GST Number (Optional)
              </label>
              <Input
                value={formData.taxInformation.gstNumber}
                onChange={(e) => handleTaxInfoChange('gstNumber', e.target.value)}
                placeholder="ZZAAAA0000A1ZS"
                className="border-slate-700"
              />
            </div>
          </div>
          {/* Billing Address Field (moved here) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Billing Address
            </label>
            <Input
              value={formData.billingAddress.streetAddress}
              onChange={(e) => handleBillingAddressChange('streetAddress', e.target.value)}
              placeholder="Enter your complete billing address..."
              className="border-slate-700"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;