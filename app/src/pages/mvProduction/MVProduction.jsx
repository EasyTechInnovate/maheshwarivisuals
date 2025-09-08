import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, ArrowLeft, ArrowRight } from "lucide-react"

export default function MVProduction() {
  const [showForm, setShowForm] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  
  // Fake data for the list
  const mvRequests = [
    {
      label: "Rajesh Kumar",
      product: "T-Shirts",
      plan: "Yes",
      channel: "Instagram",
      assist: "No",
      status: "Pending",
      date: "2024-03-15"
    },
    {
      label: "Rajesh Kumar",
      product: "Hoodies",
      plan: "No",
      channel: "N/A",
      assist: "Yes",
      status: "Pending",
      date: "2024-03-10"
    },
    {
      label: "Rajesh Kumar",
      product: "T-Shirts",
      plan: "Yes",
      channel: "YouTube",
      assist: "No",
      status: "Pending",
      date: "2024-03-08"
    },
    {
      label: "Rajesh Kumar",
      product: "T-Shirts",
      plan: "No",
      channel: "N/A",
      assist: "Yes",
      status: "Pending",
      date: "2024-03-05"
    }
  ]

  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Basic Details
    copyrightOwnerName: "",
    emailOfCopyrightHolder: "",
    mobileNoCopyrightHolder: "",
    projectTitle: "",
    artistName: "",
    labelName: "",
    releaseTimeline: "",
    genres: "",
    mood: "",
    isAlbumOrEP: "",
    language: "",
    theme: "",
    beats: "",
    locationPreferences: {
      indoorStudio: false,
      outdoorNatural: false,
      urbanStreet: false
    },
    others: "",
    
    // Step 2: Budget Request
    totalBudgetRequested: "",
    proposedOwnershipDilution: "",
    preProduction: "",
    shootDay: "",
    postProduction: "",
    miscellaneousContingency: "",
    personalFundsContribution: "",
    personalFundsAmount: "",
    revenueSharingModel: {
      flatBuyout: false,
      revenueSplit: false,
      hybridBuyoutRoyalties: false
    },
    
    // Step 3: Marketing & Distribution
    mvDistribution: "",
    brandMerchTieIns: "",
    adsInfluencerCampaigns: "",
    adsInfluencerDescription: "",
    
    // Step 4: Legal
    retainCreativeOwnership: "",
    creditMVProduction: "",
    shareAssetsMV: "",
    requireNDACustomAgreement: ""
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCheckboxChange = (section, field, checked) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: checked
      }
    }))
  }

  const handleView = (index) => {
    console.log('View item:', index)
  }

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFormSubmit = () => {
    console.log('Form Data:', formData)
    // Here you would typically send the data to your API
    setShowForm(false)
    setCurrentStep(1)
    // Reset form or add to list
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center  md:space-x-4">
      {[
        { number: 1, label: "Basic Details" },
        { number: 2, label: "Budget Request" },
        { number: 3, label: "Marketing" },
        { number: 4, label: "Legal" }
      ].map((step) => (
        <div key={step.number} className="flex items-center">
          
          <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center shrink-0 text-xs lg:text-sm font-medium ${
            currentStep >= step.number 
              ? 'bg-[#711CE9] text-white' 
              : 'bg-muted-foreground/10 text-muted-foreground'
          }`}>
            {step.number}
          </div>
          <span className={`sm:ml-2 max-lg:text-center max-sm:hidden text-sm max-lg:text-xs  ${
            currentStep >= step.number 
              ? 'text-foreground' 
              : 'text-muted-foreground'
          }`}>
            {step.label}
          </span>

          {step.number < 4 && (
            <div className={`w-4 lg:w-8 h-0.5 mx-1 lg:mx-4 ${
              currentStep > step.number ? 'bg-[#711CE9]' : 'bg-muted-foreground/20'
            }`} />
          )}
        </div>
      ))}
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-8">
      {/* Owner Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Owner Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="copyrightOwnerName">Copyright Owner Name</Label>
            <Input
              id="copyrightOwnerName"
              placeholder="Artist"
              value={formData.copyrightOwnerName}
              onChange={(e) => handleInputChange('copyrightOwnerName', e.target.value)}
              className="bg-background border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobileNoCopyrightHolder">Mobile No. Of the copyright Holder</Label>
            <Input
              id="mobileNoCopyrightHolder"
              placeholder="Name"
              value={formData.mobileNoCopyrightHolder}
              onChange={(e) => handleInputChange('mobileNoCopyrightHolder', e.target.value)}
              className="bg-background border-border"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="emailOfCopyrightHolder">Email Of the copyright Holder</Label>
            <Input
              id="emailOfCopyrightHolder"
              placeholder="Artist Name"
              value={formData.emailOfCopyrightHolder}
              onChange={(e) => handleInputChange('emailOfCopyrightHolder', e.target.value)}
              className="bg-background border-border"
            />
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Project Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="projectTitle">Project Title</Label>
            <Input
              id="projectTitle"
              placeholder="Artist"
              value={formData.projectTitle}
              onChange={(e) => handleInputChange('projectTitle', e.target.value)}
              className="bg-background border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="artistName">Artist Name</Label>
            <Input
              id="artistName"
              placeholder="Name"
              value={formData.artistName}
              onChange={(e) => handleInputChange('artistName', e.target.value)}
              className="bg-background border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="labelName">Label name</Label>
            <Input
              id="labelName"
              placeholder="Artist Name"
              value={formData.labelName}
              onChange={(e) => handleInputChange('labelName', e.target.value)}
              className="bg-background border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="releaseTimeline">Release Timeline</Label>
            <Input
              id="releaseTimeline"
              placeholder="9856674676476"
              value={formData.releaseTimeline}
              onChange={(e) => handleInputChange('releaseTimeline', e.target.value)}
              className="bg-background border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="genres">Genres</Label>
            <Select onValueChange={(value) => handleInputChange('genres', value)}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Pop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pop">Pop</SelectItem>
                <SelectItem value="rock">Rock</SelectItem>
                <SelectItem value="hip-hop">Hip Hop</SelectItem>
                <SelectItem value="electronic">Electronic</SelectItem>
                <SelectItem value="classical">Classical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mood">Mood</Label>
            <Select onValueChange={(value) => handleInputChange('mood', value)}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Uplifting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uplifting">Uplifting</SelectItem>
                <SelectItem value="melancholic">Melancholic</SelectItem>
                <SelectItem value="energetic">Energetic</SelectItem>
                <SelectItem value="calm">Calm</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="isAlbumOrEP">Is this part of an album or EP?</Label>
            <Select onValueChange={(value) => handleInputChange('isAlbumOrEP', value)}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Yes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select onValueChange={(value) => handleInputChange('language', value)}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Beats" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="instrumental">Instrumental</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="theme">Theme</Label>
            <Select onValueChange={(value) => handleInputChange('theme', value)}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Journey & Travel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="journey-travel">Journey & Travel</SelectItem>
                <SelectItem value="love-romance">Love & Romance</SelectItem>
                <SelectItem value="party-celebration">Party & Celebration</SelectItem>
                <SelectItem value="nature-environment">Nature & Environment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Location Preference Tick Boxes */}
        <div className="mt-6">
          <Label className="text-sm font-medium">Location Preference Tick Boxes</Label>
          <div className="flex items-center space-x-6 mt-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="indoorStudio"
                checked={formData.locationPreferences.indoorStudio}
                onCheckedChange={(checked) => handleCheckboxChange('locationPreferences', 'indoorStudio', checked)}
              />
              <label htmlFor="indoorStudio" className="text-sm">Indoor Studio</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="outdoorNatural"
                checked={formData.locationPreferences.outdoorNatural}
                onCheckedChange={(checked) => handleCheckboxChange('locationPreferences', 'outdoorNatural', checked)}
              />
              <label htmlFor="outdoorNatural" className="text-sm">Outdoor / Natural</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="urbanStreet"
                checked={formData.locationPreferences.urbanStreet}
                onCheckedChange={(checked) => handleCheckboxChange('locationPreferences', 'urbanStreet', checked)}
              />
              <label htmlFor="urbanStreet" className="text-sm">Urban / Street</label>
            </div>
          </div>
        </div>

        {/* Others */}
        <div className="mt-6">
          <Label htmlFor="others">Others:</Label>
          <Input
            id="others"
            value={formData.others}
            onChange={(e) => handleInputChange('others', e.target.value)}
            className="bg-background border-border mt-2"
          />
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold">Budget Request & Ownership Proposal</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="totalBudgetRequested">Total Budget Requested (INR)</Label>
          <Input
            id="totalBudgetRequested"
            placeholder="Artist"
            value={formData.totalBudgetRequested}
            onChange={(e) => handleInputChange('totalBudgetRequested', e.target.value)}
            className="bg-background border-border"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="proposedOwnershipDilution">Proposed Ownership Dilution (% of video IP)</Label>
          <Input
            id="proposedOwnershipDilution"
            placeholder="10%, 20%, negotiable"
            value={formData.proposedOwnershipDilution}
            onChange={(e) => handleInputChange('proposedOwnershipDilution', e.target.value)}
            className="bg-background border-border"
          />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Breakdown (Estimated)</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
          <div className="space-y-2">
            <Label htmlFor="preProduction">Pre-Production:</Label>
            <Input
              id="preProduction"
              placeholder="Artist"
              value={formData.preProduction}
              onChange={(e) => handleInputChange('preProduction', e.target.value)}
              className="bg-background border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shootDay">Shoot Day:</Label>
            <Input
              id="shootDay"
              placeholder="Artist"
              value={formData.shootDay}
              onChange={(e) => handleInputChange('shootDay', e.target.value)}
              className="bg-background border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postProduction">Post-Production:</Label>
            <Input
              id="postProduction"
              placeholder="Artist"
              value={formData.postProduction}
              onChange={(e) => handleInputChange('postProduction', e.target.value)}
              className="bg-background border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="miscellaneousContingency">Miscellaneous / Contingency:</Label>
            <Input
              id="miscellaneousContingency"
              placeholder="Artist"
              value={formData.miscellaneousContingency}
              onChange={(e) => handleInputChange('miscellaneousContingency', e.target.value)}
              className="bg-background border-border"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="personalFundsContribution">Will you contribute any personal funds?</Label>
          <Select onValueChange={(value) => handleInputChange('personalFundsContribution', value)}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Yes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="personalFundsAmount">If yes, amount</Label>
          <Input
            id="personalFundsAmount"
            placeholder="7 crore"
            value={formData.personalFundsAmount}
            onChange={(e) => handleInputChange('personalFundsAmount', e.target.value)}
            className="bg-background border-border"
          />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Revenue Sharing Model Proposed</Label>
        <div className="flex items-center space-x-6 mt-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="flatBuyout"
              checked={formData.revenueSharingModel.flatBuyout}
              onCheckedChange={(checked) => handleCheckboxChange('revenueSharingModel', 'flatBuyout', checked)}
            />
            <label htmlFor="flatBuyout" className="text-sm">Flat Buyout</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="revenueSplit"
              checked={formData.revenueSharingModel.revenueSplit}
              onCheckedChange={(checked) => handleCheckboxChange('revenueSharingModel', 'revenueSplit', checked)}
            />
            <label htmlFor="revenueSplit" className="text-sm">Revenue Split</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hybridBuyoutRoyalties"
              checked={formData.revenueSharingModel.hybridBuyoutRoyalties}
              onCheckedChange={(checked) => handleCheckboxChange('revenueSharingModel', 'hybridBuyoutRoyalties', checked)}
            />
            <label htmlFor="hybridBuyoutRoyalties" className="text-sm">Hybrid (Buyout + Royalties)</label>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold">Marketing & Distribution Plan</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="mvDistribution">Will this be released via MV Distribution?</Label>
          <Select onValueChange={(value) => handleInputChange('mvDistribution', value)}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Yes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="adsInfluencerCampaigns">Do you plan to run ads or influencer campaigns?</Label>
          <Select onValueChange={(value) => handleInputChange('adsInfluencerCampaigns', value)}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Yes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="brandMerchTieIns">Any brand or merch tie-ins?</Label>
          <Select onValueChange={(value) => handleInputChange('brandMerchTieIns', value)}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Yes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="adsInfluencerDescription">If yes, describe</Label>
          <Select onValueChange={(value) => handleInputChange('adsInfluencerDescription', value)}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Yes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="social-media">Social Media Campaign</SelectItem>
              <SelectItem value="influencer-collab">Influencer Collaboration</SelectItem>
              <SelectItem value="brand-partnership">Brand Partnership</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold">Legal & Ownership Declaration</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="retainCreativeOwnership">Do you confirm that you retain full creative ownership of the project?</Label>
          <Select onValueChange={(value) => handleInputChange('retainCreativeOwnership', value)}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Yes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="creditMVProduction">Do you agree to credit MV Production for budget support?</Label>
          <Select onValueChange={(value) => handleInputChange('creditMVProduction', value)}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Yes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="shareAssetsMV">Do you agree to share final assets with MV for portfolio and showcase use?</Label>
          <Select onValueChange={(value) => handleInputChange('shareAssetsMV', value)}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Yes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="requireNDACustomAgreement">Do you require an NDA or custom agreement?</Label>
          <Select onValueChange={(value) => handleInputChange('requireNDACustomAgreement', value)}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Yes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )

  if (showForm) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">MV Production</h1>
          <p className="text-muted-foreground">Apply for music and video production funding to enhance your creative projects</p>
        </div>

        <Card className="max-w-6xl mx-auto">
          <CardContent className="p-8">
            
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            {/* Navigation */}
            <div className="flex justify-between items-center flex-wrap mt-8 pt-6 space-y-5 border-t border-border">
            {renderStepIndicator()}
            <div className="flex justify-end w-full flex-wrap items-center gap-4">

              <Button
                variant="outline"
                onClick={handlePreviousStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              
              {currentStep < 4 ? (
                <Button
                  onClick={handleNextStep}
                  className="bg-[#711CE9] hover:bg-[#6f14ef] text-white flex items-center gap-2"
                >
                  Next Step
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleFormSubmit}
                  className="bg-[#711CE9] hover:bg-[#6f14ef] text-white flex items-center gap-2"
                >
                  Submit Request
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">MV Production</h1>
          <p className="text-muted-foreground">Apply for music and video production funding to enhance your creative projects</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-[#711CE9] hover:bg-[#6f14ef] text-white">
          + New Request
        </Button>
      </div>

      {/* Main Content */}
      {mvRequests.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto custom-scroll">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground border-b border-border">
                  <tr>
                    <th className="p-4">Artist's Label Name</th>
                    <th className="p-4">Product Preferences</th>
                    <th className="p-4">Marketing & Launch Plan</th>
                    <th className="p-4">Channel</th>
                    <th className="p-4">MMC Assist</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Submit Date</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mvRequests.map((request, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/50">
                      <td className="p-4">{request.label}</td>
                      <td className="p-4">{request.product}</td>
                      <td className="p-4">{request.plan}</td>
                      <td className="p-4">{request.channel}</td>
                      <td className="p-4">{request.assist}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded text-xs bg-yellow-500/20 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400">
                          {request.status}
                        </span>
                      </td>
                      <td className="p-4">{request.date}</td>
                      <td className="p-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(index)}
                          className="flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No MV Production Requests</h3>
              <p className="text-muted-foreground">
                You haven't submitted any music video production requests yet. Create your first request to get started with professional video production funding.
              </p>
            </div>
            <Button 
              onClick={() => setShowForm(true)} 
              className="bg-[#711CE9] hover:bg-[#6f14ef] text-white"
            >
              + Create Your First Request
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}