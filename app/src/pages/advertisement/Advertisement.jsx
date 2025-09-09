import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { 
  Plus, 
  ArrowLeft, 
  ArrowRight, 
  Edit, 
  Trash2, 
  Eye, 
  PauseCircle, 
  Calendar as CalendarIcon,
  BarChart,
  DollarSign,
  View,
  Goal,
  Info,
  X
} from "lucide-react"

// --- FAKE DATA & INITIAL STATE ---
const enrichedCampaignData = {
  // Corresponds to the form state
  platformLink: "https://spotify.com/track/123",
  platformDSP: "spotify",
  startDate: "2025-07-15",
  endDate: "2025-07-18",
  targetingType: "custom",
  gender: "all",
  ageRange: [18, 45],
  similarArtists: [],
  locations: ["India", "USA"],
  visuals: "album_cover",
  caption: "Check out the summer's biggest festival!",
  callToAction: "listen_now"
};

const activeCampaignsData = [
  { id: 1, title: "Summer Music Festival 2024", description: "Music Promotion", budget: 15000, spent: "₹8,450", impressions: "45,200", clicks: "1,240", status: "Running", ...enrichedCampaignData },
  { id: 2, title: "New Album Launch - Acoustic Vibes", description: "Album Promotion", budget: 25000, spent: "₹12,300", impressions: "32,100", clicks: "880", status: "Running", ...enrichedCampaignData, ageRange: [25, 55], locations: ["India"] }
];
const draftCampaignsData = [
  { id: 3, title: "Monsoon Music Collection", description: "Seasonal Promotion", budget: 2000, status: "Payment pending", ...enrichedCampaignData },
  { id: 4, title: "Indie Rock Spotlight", description: "Genre Promotion", budget: 18000, status: "Payment pending", ...enrichedCampaignData, targetingType: "automated" }
];

const initialFormData = {
  track: null, platformLink: "", platformDSP: "", startDate: "", endDate: "", budget: 1000,
  targetingType: "automated", gender: "all", ageRange: [18, 52], similarArtists: [], locations: ["India"],
  visuals: "album_cover", caption: "watch now", callToAction: "listen_now"
};

// --- MAIN COMPONENT ---
export default function Advertisement() {
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [isViewOnly, setIsViewOnly] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  // --- HANDLERS (Corrected Logic) ---
  const handleCreateNew = () => { setCurrentStep(1); setFormData(initialFormData); setIsViewOnly(false); setShowForm(true); };
  const handleBackToDashboard = () => { setShowForm(false); };
  const handleSubmit = () => { console.log("Form Submitted:", formData); setShowForm(false); };
  
  const handleEdit = (campaign) => {
    // Correctly map all fields from the campaign object to the form state
    const populatedData = {
      track: campaign.track || null,
      platformLink: campaign.platformLink,
      platformDSP: campaign.platformDSP,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      budget: campaign.budget,
      targetingType: campaign.targetingType,
      gender: campaign.gender,
      ageRange: campaign.ageRange,
      similarArtists: campaign.similarArtists,
      locations: campaign.locations,
      visuals: campaign.visuals,
      caption: campaign.caption,
      callToAction: campaign.callToAction,
    };
    setFormData(populatedData);
    setIsViewOnly(false);
    setCurrentStep(1);
    setShowForm(true);
  };

  const handleView = (campaign) => {
    handleEdit(campaign); // Populate data first
    setIsViewOnly(true); // Then set to view only
  };

  const handleNextStep = () => { if (currentStep < 4) setCurrentStep(currentStep + 1); };
  const handlePrevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };
  const handleInputChange = (field, value) => { setFormData(prev => ({ ...prev, [field]: value })); };
  const goToStep = (step) => { if (!isViewOnly) { setCurrentStep(step) } };

  // --- RENDER FUNCTIONS ---
  
  const renderStepIndicator = () => {
    const steps = ["Basic Campaign Details", "Demographics", "Creatives", "Review and submit"];
    return (
      <div className="flex items-center justify-center space-x-2 md:space-x-4">
        {steps.map((label, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center shrink-0 text-xs lg:text-sm font-medium ${currentStep >= index + 1 ? 'bg-[#711CE9] text-white' : 'bg-muted-foreground/10 text-muted-foreground'}`}>
              {index + 1}
            </div>
            <span className={`sm:ml-2 max-lg:text-center max-sm:hidden text-sm max-lg:text-xs ${currentStep >= index + 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
              {label}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-4 lg:w-8 h-0.5 mx-1 lg:mx-4 ${currentStep > index + 1 ? 'bg-[#711CE9]' : 'bg-muted-foreground/20'}`} />
            )}
          </div>
        ))}
      </div>
    );
  };
  
  const renderForm = () => {
    const StepContent = () => {
        switch (currentStep) {
            case 1: return <Step1CampaignDetails formData={formData} handleInputChange={handleInputChange} isViewOnly={isViewOnly} />;
            case 2: return <Step2Demographics formData={formData} handleInputChange={handleInputChange} isViewOnly={isViewOnly} />;
            case 3: return <Step3Creatives formData={formData} handleInputChange={handleInputChange} isViewOnly={isViewOnly} />;
            case 4: return <Step4Review formData={formData} isViewOnly={isViewOnly} goToStep={goToStep}/>;
            default: return null;
        }
    }
    return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <Button variant="outline" size="icon" onClick={handleBackToDashboard} aria-label="Back to dashboard"><ArrowLeft className="h-4 w-4" /></Button>
                <div>
                    <h1 className="text-2xl font-bold">Create Advertisement</h1>
                    <p className="text-muted-foreground">Create and manage marketing campaigns for your music</p>
                </div>
            </div>
            <div className="space-y-8">
                <div className="p-1 mb-4">
                    <p className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">STEP {currentStep}</p>
                    <h2 className="text-2xl font-bold">{["Basic Campaign Details", "Demographics", "Creatives", "Review and submit"][currentStep - 1]}</h2>
                </div>
                {StepContent()}
                <div className="flex justify-between items-center flex-wrap mt-8 pt-6 space-y-5 border-t border-border">
                    {renderStepIndicator()}
                    <div className="flex justify-end w-full flex-wrap items-center gap-4">
                        <Button variant="outline" onClick={handlePrevStep} disabled={currentStep === 1} className="flex items-center gap-2"><ArrowLeft className="h-4 w-4" /> Previous</Button>
                        {currentStep < 4 ? (
                            <Button onClick={handleNextStep} className="bg-[#711CE9] hover:bg-[#6f14ef] text-white flex items-center gap-2">Next Step <ArrowRight className="h-4 w-4" /></Button>
                        ) : (
                            <Button onClick={handleSubmit} className="bg-[#711CE9] hover:bg-[#6f14ef] text-white flex items-center gap-2">Submit <ArrowRight className="h-4 w-4" /></Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
  }

  const renderDashboard = () => (
    <div>
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div>
                <h1 className="text-2xl font-bold">Advertisement Management</h1>
                <p className="text-muted-foreground">Create and manage your music promotion campaigns</p>
            </div>
            <Button onClick={handleCreateNew} className="bg-[#711CE9] hover:bg-[#6f14ef] text-white flex items-center gap-2"><Plus className="h-4 w-4" /> Create New Campaign</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <StatCard title="Total Campaigns" value="12" change="+2 from last month" icon={<BarChart />} />
            <StatCard title="Total Spent" value="₹1,24,750" change="+15% from last month" icon={<DollarSign />} />
            <StatCard title="Total Impressions" value="2.4M" change="+28% from last month" icon={<View />} />
            <StatCard title="Avg. CTR" value="2.8%" change="+0.5% from last month" icon={<Goal />} />
        </div>
        <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
                <TabsTrigger value="active">Active Campaigns</TabsTrigger>
                <TabsTrigger value="draft">Draft Campaigns</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
                <Card><CardHeader><CardTitle>Active Campaigns</CardTitle><CardDescription>Currently running advertisement campaigns</CardDescription></CardHeader>
                    <CardContent className="space-y-4">{activeCampaignsData.map(c => (<ActiveCampaignCard key={c.id} campaign={c} onView={handleView} onEdit={handleEdit} />))}</CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="draft">
                <Card><CardHeader><CardTitle>Draft Campaigns</CardTitle><CardDescription>Campaigns awaiting payment or approval</CardDescription></CardHeader>
                    <CardContent className="space-y-4">{draftCampaignsData.map(c => (<DraftCampaignCard key={c.id} campaign={c} onEdit={handleEdit} onCompletePayment={() => setShowPaymentDialog(true)} />))}</CardContent>
                </Card>
            </TabsContent>
        </Tabs>
        <PaymentDialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog} />
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
        {showForm ? renderForm() : renderDashboard()}
    </div>
  )
}

// --- REBUILT FORM STEP COMPONENTS ---

const StepWrapper = ({ title, description, children }) => (
    <Card className="bg-muted/20">
        <CardContent className="grid md:grid-cols-2 gap-6 p-6 items-start">
            <div className="md:col-span-1">
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
            <div className="md:col-span-1">{children}</div>
        </CardContent>
    </Card>
);

const Step1CampaignDetails = ({ formData, handleInputChange, isViewOnly }) => {
    const recommendedBudgets = [1000, 3000, 10000, 20000];
    const duration = 6;
    const dailySpend = formData.budget / duration;
    
    return (
      <div className="">
        <div className="lg:col-span-2 space-y-6">
            <StepWrapper title="Track" description="Select a track to promote">
                <button disabled={isViewOnly} className="w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors">
                  <Plus className="h-8 w-8" /><p className="font-semibold mt-2">Select a track</p><p className="text-xs">Add a track from My Catalog or Spotify</p>
                </button>
            </StepWrapper>
            <StepWrapper title="Platform" description="Enter the link to the track you wish to promote">
                <div className="grid md:grid-cols-2 gap-4">
                    <Input disabled={isViewOnly} placeholder="Enter the link" value={formData.platformLink} onChange={(e) => handleInputChange('platformLink', e.target.value)} />
                    <Select disabled={isViewOnly} value={formData.platformDSP} onValueChange={(val) => handleInputChange('platformDSP', val)}>
                        <SelectTrigger><SelectValue placeholder="Select a DSP platform" /></SelectTrigger>
                        <SelectContent><SelectItem value="spotify">Spotify</SelectItem><SelectItem value="apple-music">Apple Music</SelectItem></SelectContent>
                    </Select>
                </div>
            </StepWrapper>
            <StepWrapper title="Campaign Dates" description="Select start and end dates for your campaign">
                <div className="flex items-center gap-4">
                    <div className="relative flex-1"><Input disabled={isViewOnly} type="text" placeholder="mm/dd/yyyy" className="pr-10" value={formData.startDate} onChange={(e) => handleInputChange('startDate', e.target.value)} /><CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /></div>
                    <span className="text-muted-foreground">To</span>
                    <div className="relative flex-1"><Input disabled={isViewOnly} type="text" placeholder="mm/dd/yyyy" className="pr-10" value={formData.endDate} onChange={(e) => handleInputChange('endDate', e.target.value)} /><CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1"><Info className="h-3 w-3" /> Campaigns can be scheduled to run on specific dates.</p>
            </StepWrapper>
            <StepWrapper title="Campaign Budget" description="Your budget will highly affect the reach of your campaign. We recommend setting a budget that is comfortable for you.">
                <div className="flex justify-between text-xs text-muted-foreground mb-2"><span>₹50.00</span><span>₹1499.00</span></div>
                <Slider disabled={isViewOnly} value={[formData.budget]} onValueChange={(val) => handleInputChange('budget', val[0])} max={1500} min={50} step={1} />
                <Input disabled={isViewOnly} type="number" value={formData.budget} onChange={(e) => handleInputChange('budget', parseInt(e.target.value) || 0)} className="mt-4" />
            </StepWrapper>
            <Card className='bg-muted/20 flex flex-row flex-wrap items-center justify-between p-4 mb-6 '>
                <div className="flex min-w-[250px] h-fit justify-between items-center bg-muted border p-3 rounded-md"><span className="text-sm font-semibold flex items-center gap-1 mr-10">Effective Budget <Info className="h-4 w-4 text-muted-foreground" /></span><span className="font-bold">₹{formData.budget.toFixed(2)}</span></div>
                <div className='w-full md:w-auto bg-gradient-to-r from-[#711CE9]  to-[#252E37] p-[2px] rounded-xl '>
                <div className=" rounded-xl bg-muted p-4 ">
                    <Label className="text-xs text-muted-foreground"> RECOMMENDED BUDGETS</Label>
                    <div className="flex gap-2 mt-2 flex-wrap text-muted-foreground">{recommendedBudgets.map(b => <Button key={b} variant="outline" size="sm" disabled={isViewOnly} onClick={() => handleInputChange('budget', b)}>₹{b}</Button>)}</div>
                </div>
                </div>

            </Card>
        </div>
        <div className="flex justify-between items-center w-full mt-20 flex-wrap space-y-6">
            <div className='bg-gradient-to-r from-[#711CE9] h-fit to-[#252E37] p-[2px] rounded-xl'>

            <div className="bg-muted rounded-xl p-2 flex justify-between items-center sticky top-24"> <img className='h-14 w-14  rounded-full overflow-hidden ' src="public/shortlogo.png" alt="" /> <h1 className='font-bold uppercase'>MAHI AI <span className="text-xs ml-20 font-bold text-white bg-gradient-to-r to-[#711CE9] h-fit from-[#6403ec] px-2 py-0.5 rounded-md ">BETA </span> </h1></div>
            </div>
            <Card className="bg-muted/20 w-full md:w-[400px] sticky top-60"><CardHeader><CardTitle>Campaign Overview</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Total Duration</span><span className="font-semibold">{duration} Days</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Daily Spend</span><span className="font-semibold">₹ {dailySpend.toFixed(2)}</span></div>
                </CardContent>
            </Card>
        </div>
      </div>
    )
};

const Step2Demographics = ({ formData, handleInputChange, isViewOnly }) => (
    <div className=" gap-8">
        <div className="lg:col-span-2 space-y-6">
            <StepWrapper title="Targeting Type" description="Choose how you want to target your audience">
                <RadioGroup disabled={isViewOnly} value={formData.targetingType} onValueChange={(val) => handleInputChange('targetingType', val)} className="space-y-4">
                    <Label htmlFor="automated" className="flex items-start p-4 border rounded-md has-[:checked]:border-primary cursor-pointer"><RadioGroupItem value="automated" id="automated" className="mt-1" /><div className="ml-4"><p className="font-semibold">Automated</p><p className="text-sm text-muted-foreground">Let MV automatically optimize your targeting based on your track and campaign goals.</p></div></Label>
                    <Label htmlFor="custom" className="flex items-start p-4 border rounded-md has-[:checked]:border-primary cursor-pointer"><RadioGroupItem value="custom" id="custom" className="mt-1" /><div className="ml-4"><p className="font-semibold">Custom</p><p className="text-sm text-muted-foreground">Manually set up your targeting preferences.</p></div></Label>
                </RadioGroup>
            </StepWrapper>
            <StepWrapper title="Gender" description="Select the gender you want to target."><Select disabled={isViewOnly} value={formData.gender} onValueChange={(val) => handleInputChange('gender', val)}><SelectTrigger className="w-full"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all">All Genders</SelectItem><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent></Select></StepWrapper>
            <StepWrapper title="Age Range" description="Select the age range you want to target."><div className="pt-2"><div className="flex justify-between items-center mb-2 text-sm"><span>{formData.ageRange[0]}</span><span>To</span><span>{formData.ageRange[1]}</span></div><Slider disabled={isViewOnly} value={formData.ageRange} onValueChange={(val) => handleInputChange('ageRange', val)} max={65} min={13} step={1}/></div></StepWrapper>
            <StepWrapper title="Similar Artists" description="Discover your target audience based on similar artists."><div className="flex justify-between items-center p-3 bg-background rounded-md"><p className="text-sm text-muted-foreground">No similar artists selected.</p><Button disabled={isViewOnly} variant="ghost" size="sm"><Edit className="h-4 w-4 mr-2"/>Edit</Button></div></StepWrapper>
            <StepWrapper title="Locations" description="Choose where you want to target"><div className="flex justify-between items-center p-3 bg-background rounded-md"><div className="flex gap-2 flex-wrap">{formData.locations.map(loc => <span key={loc} className="flex items-center gap-1 bg-muted px-2 py-1 text-sm rounded">{loc} <button disabled={isViewOnly}><X className="h-3 w-3"/></button></span>)}</div><Button disabled={isViewOnly} variant="ghost" size="sm"><Edit className="h-4 w-4 mr-2"/>Edit</Button></div></StepWrapper>
        </div>
        <div className='mt-20 flex justify-end items-center w-full flex-wrap space-y-6'>
        <div className="lg:col-span-2 w-[400px] "><Card className="bg-muted/20 sticky top-24"><CardHeader><CardTitle>Campaign Overview</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">Total Duration</span><span className="font-semibold">6 Days</span></div><div className="flex justify-between"><span className="text-muted-foreground">Daily Spend</span><span className="font-semibold">₹ 599</span></div></CardContent></Card></div>
        </div>
    </div>
);

const Step3Creatives = ({ formData, handleInputChange, isViewOnly }) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6 col-span-2">
            <StepWrapper title="Visuals" description="Choose how you want your ad to look">
                <RadioGroup disabled={isViewOnly} value={formData.visuals} onValueChange={(val) => handleInputChange('visuals', val)} className="space-y-4">
                    <Label htmlFor="album_cover" className="flex items-center cursor-pointer"><RadioGroupItem value="album_cover" id="album_cover" /><span className="ml-3 font-semibold">Album cover</span></Label>
                    <Label htmlFor="mv_templates" className="flex items-center cursor-pointer"><RadioGroupItem value="mv_templates" id="mv_templates" /><span className="ml-3 font-semibold">MV Templates</span></Label>
                    <Label htmlFor="upload" className="flex items-center cursor-pointer"><RadioGroupItem value="upload" id="upload" /><span className="ml-3 font-semibold">Upload your own Visual</span></Label>
                </RadioGroup>
                <div className="mt-6 p-4 bg-muted  rounded-md flex items-center gap-4"><img src="https://placehold.co/64x64/2a2a2a/ffffff?text=Art" alt="Album Art" className="w-16 h-16 rounded-md" /><div className="flex-1"><p className="font-semibold text-sm">Album Cover</p><p className="text-xs text-muted-foreground">filename.jpg</p></div><Button disabled={isViewOnly} variant="ghost"><Edit className="h-4 w-4 mr-2"/>Change</Button></div>
            </StepWrapper>
            <StepWrapper title="Caption" description="This is what your ad will look like on Instagram">
                <Textarea disabled={isViewOnly} value={formData.caption} onChange={(e) => handleInputChange('caption', e.target.value)} placeholder="Caption..." />
                <Label className="mt-4 block mb-2">Call to Action</Label>
                <Select disabled={isViewOnly} value={formData.callToAction} onValueChange={(val) => handleInputChange('callToAction', val)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="listen_now">Listen Now</SelectItem><SelectItem value="learn_more">Learn More</SelectItem></SelectContent></Select>
            </StepWrapper>
        </div>
        <div><Card className="bg-muted/20 sticky top-24"><CardHeader><CardTitle>Ad Preview</CardTitle><CardDescription>This is what your ad will look like on Instagram</CardDescription></CardHeader><CardContent className="flex items-center justify-center p-4"><div className="w-[280px] h-[500px] bg-black rounded-3xl p-3 shadow-lg bg-cover bg-center flex flex-col justify-end" style={{backgroundImage: "url('https://i.imgur.com/gK6yY9E.png')"}}><div className="w-full h-1 bg-white/30 rounded-full mb-2"><div className="h-1 w-1/3 bg-white rounded-full"></div></div></div></CardContent></Card></div>
    </div>
);

const Step4Review = ({ formData, isViewOnly, goToStep }) => (
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card className="bg-muted/20">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Basic Details</CardTitle>
                {!isViewOnly && <Button variant="ghost" size="sm" onClick={() => goToStep(1)}><Edit className="h-4 w-4 mr-2" />Edit</Button>}
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Campaign Type</span><span className="font-semibold">Record Streams Single DSP</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Total Duration</span><span className="font-semibold">3 Days</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Start Date</span><span className="font-semibold">{formData.startDate}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">End Date</span><span className="font-semibold">{formData.endDate}</span></div>
            </CardContent>
        </Card>
        <Card className="bg-muted/20">
            <CardHeader><CardTitle>Campaign Total</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Advertising Budget</span><span className="font-semibold">₹{formData.budget.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">MV Servic Fee</span><span className="font-semibold">₹ 599.00</span></div>
                <div className="flex justify-between border-t pt-3 mt-2 font-bold text-base"><span className="">Taxes (18%)</span><span>₹{((formData.budget + 599) * 0.18).toFixed(2)}</span></div>
            </CardContent>
        </Card>
    </div>
);

// --- DASHBOARD SUB-COMPONENTS ---
const StatCard = ({ title, value, change, icon }) => ( <Card> <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> <CardTitle className="text-sm font-medium">{title}</CardTitle> <div className="text-muted-foreground">{icon}</div> </CardHeader> <CardContent> <div className="text-2xl font-bold">{value}</div> <p className="text-xs text-muted-foreground">{change}</p> </CardContent> </Card> );
const ActiveCampaignCard = ({ campaign, onView, onEdit }) => ( <Card className="overflow-hidden"> <CardContent className="p-4"> <div className="flex flex-wrap justify-between items-start gap-4"> <div> <h3 className="font-semibold">{campaign.title}</h3> <p className="text-sm text-muted-foreground">{campaign.description}</p> </div> <div className="flex items-center gap-2"> <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-500">{campaign.status}</span> </div> </div> <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4 text-sm border-t pt-4"> <div><Label>Budget</Label><p className="font-semibold">₹{campaign.budget.toLocaleString()}</p></div> <div><Label>Spent</Label><p className="font-semibold">{campaign.spent}</p></div> <div><Label>Impressions</Label><p className="font-semibold">{campaign.impressions}</p></div> <div><Label>Clicks</Label><p className="font-semibold">{campaign.clicks}</p></div> <div><Label>Start Date</Label><p className="font-semibold">{campaign.startDate}</p></div> <div><Label>End Date</Label><p className="font-semibold">{campaign.endDate}</p></div> </div> </CardContent> <div className="bg-muted/50 px-4 py-2 flex justify-end items-center gap-2"> <Button variant="outline" size="sm" onClick={() => onView(campaign)}><Eye className="h-4 w-4 mr-2" />View</Button> <Button variant="outline" size="sm" onClick={() => onEdit(campaign)}><Edit className="h-4 w-4 mr-2" />Edit</Button> <Button variant="outline" size="sm"><PauseCircle className="h-4 w-4 mr-2" />Pause</Button> </div> </Card> );
const DraftCampaignCard = ({ campaign, onEdit, onCompletePayment }) => ( <Card> <CardContent className="p-4 flex flex-wrap justify-between items-center gap-4"> <div className="flex-1"> <h3 className="font-semibold">{campaign.title}</h3> <p className="text-sm text-muted-foreground">{campaign.description}</p> <div className="mt-4 grid grid-cols-2 gap-4"> <div><Label>Budget</Label><p className="font-semibold">₹{campaign.budget.toLocaleString()}</p></div> <div><Label>Status</Label><p className="font-semibold">{campaign.status}</p></div> </div> </div> <div className="flex flex-col md:flex-row items-center gap-2"> <Button onClick={onCompletePayment} className="bg-[#711CE9] hover:bg-[#6f14ef] text-white w-full md:w-auto">Complete Payment</Button> <Button variant="outline" size="sm" onClick={() => onEdit(campaign)}><Edit className="h-4 w-4 mr-2"/>Edit</Button> <Button variant="destructive" size="sm"><Trash2 className="h-4 w-4 mr-2"/>Delete</Button> </div> </CardContent> </Card> );
const PaymentDialog = ({ open, onOpenChange }) => ( <Dialog open={open} onOpenChange={onOpenChange}> <DialogContent> <DialogHeader> <DialogTitle>Complete Payment</DialogTitle> <DialogDescription>Finalize your campaign by completing the payment. Please review the details before proceeding.</DialogDescription> </DialogHeader> <div className="py-4"><p>Payment integration form would be displayed here.</p></div> <DialogFooter> <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose> <Button className="bg-[#711CE9] hover:bg-[#6f14ef] text-white">Proceed to Pay</Button> </DialogFooter> </DialogContent> </Dialog> );