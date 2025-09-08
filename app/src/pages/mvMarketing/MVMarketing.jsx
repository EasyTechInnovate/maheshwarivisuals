import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, Plus, ArrowLeft } from "lucide-react"

export default function MVMarketing() {
  const [activeTab, setActiveTab] = useState('sync') // 'sync' or 'playlistPitching'
  
  // Unified state to manage form visibility, data, and view-only mode for both tabs
  const [viewState, setViewState] = useState({
    sync: { showForm: false, data: null, isViewOnly: false },
    playlistPitching: { showForm: false, data: null, isViewOnly: false },
  })

  // --- FAKE DATA ---

  const syncRequests = [
    {
      id: 1,
      trackName: "Aavan Javan",
      trackLang: "Hindi",
      stores: "Spotify",
      genre: "Pop",
      theme: "War",
      status: "Pending",
      submitDate: "2024-03-15",
      // Detailed form data
      artistName: "Arijit Singh",
      labelName: "T-Series",
      isrc: "9856674676476",
      mood: "Uplifting",
      vocalsPresent: "Yes",
      language: "Hindi",
      tempoBPM: "120",
      masterRightsOwner: "Artist",
      publishingRightsOwner: "Artist",
      isClearedForSync: "Yes",
      proAffiliation: "BMI, IPRS",
      projectSuitability: {
        adCampaigns: true,
        gttWebSeries: false,
        tvFilmScore: true,
        trailers: false,
        podcasts: true,
        corporateFilms: false,
        gamingAnimation: true,
        fashionProductLaunch: false,
        festivalDocumentaries: false,
      },
      trackLink: "https://spotify.com/track/123",
    },
    // Add more fake sync requests if needed
  ]

  const pitchingRequests = [
    {
      id: 1,
      trackName: "Summer High",
      trackLang: "English",
      stores: "Apple Music",
      genre: "Electronic",
      theme: "Party",
      status: "Pending",
      submitDate: "2024-03-12",
      // Detailed form data
      artistName: "AP Dhillon",
      labelName: "Run-Up Records",
      isrc: "9812345678901",
      mood: "Energetic",
      vocalsPresent: "Yes",
      language: "English",
      selectedStore: "Apple Music",
      trackLink: "https://music.apple.com/track/456"
    },
    // Add more fake pitching requests if needed
  ]

  const initialSyncFormData = {
    trackName: "", artistName: "", labelName: "", isrc: "", genre: "Pop", mood: "Uplifting", vocalsPresent: "Yes", language: "Beats", theme: "Journey & Travel", tempoBPM: "", masterRightsOwner: "Artist", publishingRightsOwner: "Artist", isClearedForSync: "Yes", proAffiliation: "", projectSuitability: { adCampaigns: false, gttWebSeries: false, tvFilmScore: false, trailers: false, podcasts: false, corporateFilms: false, gamingAnimation: false, fashionProductLaunch: false, festivalDocumentaries: false }, trackLink: ""
  };
  
  const initialPitchingFormData = {
    trackName: "", artistName: "", labelName: "", isrc: "", genre: "Pop", mood: "Uplifting", vocalsPresent: "Yes", language: "Beats", theme: "Journey & Travel", selectedStore: "All", trackLink: ""
  };

  // --- HANDLERS ---
  
  const handleNewRequest = (tab) => {
    const initialData = tab === 'sync' ? initialSyncFormData : initialPitchingFormData;
    setViewState(prev => ({
        ...prev,
        [tab]: { showForm: true, data: initialData, isViewOnly: false }
    }));
  };

  const handleView = (tab, item) => {
    setViewState(prev => ({
        ...prev,
        [tab]: { showForm: true, data: item, isViewOnly: true }
    }));
  };
  
  const handleBackToList = (tab) => {
    setViewState(prev => ({
      ...prev,
      [tab]: { ...prev[tab], showForm: false, data: null }
    }));
  };

  const handleFormSubmit = (tab) => {
    console.log(`Submitting ${tab} Data:`, viewState[tab].data);
    // Here you would send data to your API
    handleBackToList(tab); // Go back to the list after submission
  };

  const handleInputChange = (tab, field, value) => {
    setViewState(prev => ({
        ...prev,
        [tab]: {
            ...prev[tab],
            data: { ...prev[tab].data, [field]: value }
        }
    }));
  };

  const handleCheckboxChange = (field, checked) => {
    setViewState(prev => ({
        ...prev,
        sync: {
            ...prev.sync,
            data: {
                ...prev.sync.data,
                projectSuitability: { ...prev.sync.data.projectSuitability, [field]: checked }
            }
        }
    }));
  };


  // --- RENDER FUNCTIONS ---

  const renderSyncForm = () => {
    const { data, isViewOnly } = viewState.sync;
    if (!data) return null;

    return (
        <div>
          <div className="flex items-center gap-4 mb-6">
              <Button variant="outline" size="icon" onClick={() => handleBackToList('sync')}>
                  <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{isViewOnly ? 'View Sync Request' : 'New Sync Request'}</h1>
                <p className="text-muted-foreground">{isViewOnly ? 'Viewing the details for your sync submission.' : 'Fill in the details for your sync submission.'}</p>
              </div>
          </div>
          <Card>
              <CardContent className="p-8 space-y-8">
                  {/* Basic Information Section */}
                  <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <InputWithLabel id="trackName" label="Track Name" placeholder="Artist" value={data.trackName} disabled={isViewOnly} onChange={(e) => handleInputChange('sync', 'trackName', e.target.value)} />
                          <InputWithLabel id="artistName" label="Artist Name" placeholder="Name" value={data.artistName} disabled={isViewOnly} onChange={(e) => handleInputChange('sync', 'artistName', e.target.value)} />
                          <InputWithLabel id="labelName" label="Label Name" placeholder="Artist Name" value={data.labelName} disabled={isViewOnly} onChange={(e) => handleInputChange('sync', 'labelName', e.target.value)} />
                          <InputWithLabel id="isrc" label="ISRC of the Track" placeholder="9856674676476" value={data.isrc} disabled={isViewOnly} onChange={(e) => handleInputChange('sync', 'isrc', e.target.value)} />
                          <SelectWithLabel id="genre" label="Genres" value={data.genre} disabled={isViewOnly} onValueChange={(value) => handleInputChange('sync', 'genre', value)} options={['Pop', 'Rock', 'Hip Hop']} />
                          <SelectWithLabel id="mood" label="Mood" value={data.mood} disabled={isViewOnly} onValueChange={(value) => handleInputChange('sync', 'mood', value)} options={['Uplifting', 'Melancholic', 'Energetic']} />
                          <SelectWithLabel id="vocalsPresent" label="Is Vocals Present?" value={data.vocalsPresent} disabled={isViewOnly} onValueChange={(value) => handleInputChange('sync', 'vocalsPresent', value)} options={['Yes', 'No']} />
                          <SelectWithLabel id="language" label="Language" value={data.language} disabled={isViewOnly} onValueChange={(value) => handleInputChange('sync', 'language', value)} options={['Beats', 'English', 'Hindi']} />
                          <div className="md:col-span-2">
                             <SelectWithLabel id="theme" label="Theme" value={data.theme} disabled={isViewOnly} onValueChange={(value) => handleInputChange('sync', 'theme', value)} options={['Journey & Travel', 'Love', 'Party']} />
                          </div>
                          <InputWithLabel id="tempoBPM" label="Tempo/BPM" placeholder="Lorem ipsum" value={data.tempoBPM} disabled={isViewOnly} onChange={(e) => handleInputChange('sync', 'tempoBPM', e.target.value)} />
                      </div>
                  </div>

                  {/* Rights Ownership Section */}
                  <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 20h-6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v5"/><path d="M11 12H7"/><path d="M11 8H7"/><path d="m18 16 2 2 4-4"/></svg>Rights Ownership and Clearence</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <SelectWithLabel id="masterRightsOwner" label="Who owns the Master Rights?" value={data.masterRightsOwner} disabled={isViewOnly} onValueChange={(value) => handleInputChange('sync', 'masterRightsOwner', value)} options={['Artist', 'Label', 'Other']} />
                          <SelectWithLabel id="publishingRightsOwner" label="Who owns the Publishing Rights?" value={data.publishingRightsOwner} disabled={isViewOnly} onValueChange={(value) => handleInputChange('sync', 'publishingRightsOwner', value)} options={['Artist', 'Publisher', 'Other']} />
                          <div className="md:col-span-2">
                            <SelectWithLabel id="isClearedForSync" label="Is the Track fully cleared for sync use?" value={data.isClearedForSync} disabled={isViewOnly} onValueChange={(value) => handleInputChange('sync', 'isClearedForSync', value)} options={['Yes', 'No']} />
                          </div>
                          <InputWithLabel id="proAffiliation" label="PRO affiliation (e.g. BMI, IPRS, ASCAP)" placeholder="Lorem ipsum" value={data.proAffiliation} disabled={isViewOnly} onChange={(e) => handleInputChange('sync', 'proAffiliation', e.target.value)} />
                      </div>
                  </div>
                  
                  {/* Project Suitability Section */}
                  <div>
                    <Label className="text-base font-semibold">Project Suitability</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-3">
                        {Object.keys(data.projectSuitability).map((key) => {
                            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
                            return <CheckboxWithLabel key={key} id={key} label={label} checked={data.projectSuitability[key]} disabled={isViewOnly} onCheckedChange={(checked) => handleCheckboxChange(key, checked)} />
                        })}
                    </div>
                  </div>

                   {/* Track Link Section */}
                  <div>
                    <InputWithLabel id="trackLink" label="Track Link (Any Store) Please share the most streamed platform link." placeholder="Link" value={data.trackLink} disabled={isViewOnly} onChange={(e) => handleInputChange('sync', 'trackLink', e.target.value)} />
                  </div>
                  
                  {!isViewOnly && (
                    <div className="flex justify-center pt-4">
                        <Button onClick={() => handleFormSubmit('sync')} className="bg-[#711CE9] hover:bg-[#6f14ef] text-white w-full md:w-auto px-10">
                            Submit Ticket
                        </Button>
                    </div>
                  )}
              </CardContent>
          </Card>
        </div>
    )
  }

  const renderPlaylistPitchingForm = () => {
    const { data, isViewOnly } = viewState.playlistPitching;
    if (!data) return null;
    
    return (
        <div>
          <div className="flex items-center gap-4 mb-6">
              <Button variant="outline" size="icon" onClick={() => handleBackToList('playlistPitching')}>
                  <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{isViewOnly ? 'View Playlist Pitch' : 'New Playlist Pitching Request'}</h1>
                <p className="text-muted-foreground">{isViewOnly ? 'Viewing the details for your playlist pitch.' : 'Fill in the details for your playlist pitch.'}</p>
              </div>
          </div>
          <Card>
              <CardContent className="p-8 space-y-8">
                  {/* Basic Information Section */}
                  <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <InputWithLabel id="trackName" label="Track Name" placeholder="Artist" value={data.trackName} disabled={isViewOnly} onChange={(e) => handleInputChange('playlistPitching', 'trackName', e.target.value)} />
                          <InputWithLabel id="artistName" label="Artist Name" placeholder="Name" value={data.artistName} disabled={isViewOnly} onChange={(e) => handleInputChange('playlistPitching', 'artistName', e.target.value)} />
                          <InputWithLabel id="labelName" label="Label name" placeholder="Artist Name" value={data.labelName} disabled={isViewOnly} onChange={(e) => handleInputChange('playlistPitching', 'labelName', e.target.value)} />
                          <InputWithLabel id="isrc" label="ISRC of the Track" placeholder="9856674676476" value={data.isrc} disabled={isViewOnly} onChange={(e) => handleInputChange('playlistPitching', 'isrc', e.target.value)} />
                          <SelectWithLabel id="genre" label="Genres" value={data.genre} disabled={isViewOnly} onValueChange={(value) => handleInputChange('playlistPitching', 'genre', value)} options={['Pop', 'Rock', 'Hip Hop']} />
                          <SelectWithLabel id="mood" label="Mood" value={data.mood} disabled={isViewOnly} onValueChange={(value) => handleInputChange('playlistPitching', 'mood', value)} options={['Uplifting', 'Melancholic', 'Energetic']} />
                          <SelectWithLabel id="vocalsPresent" label="Is Vocals Present?" value={data.vocalsPresent} disabled={isViewOnly} onValueChange={(value) => handleInputChange('playlistPitching', 'vocalsPresent', value)} options={['Yes', 'No']} />
                          <SelectWithLabel id="language" label="Language" value={data.language} disabled={isViewOnly} onValueChange={(value) => handleInputChange('playlistPitching', 'language', value)} options={['Beats', 'English', 'Hindi']} />
                          <SelectWithLabel id="theme" label="Theme" value={data.theme} disabled={isViewOnly} onValueChange={(value) => handleInputChange('playlistPitching', 'theme', value)} options={['Journey & Travel', 'Love', 'Party']} />
                          <SelectWithLabel id="selectedStore" label="Select Store" value={data.selectedStore} disabled={isViewOnly} onValueChange={(value) => handleInputChange('playlistPitching', 'selectedStore', value)} options={['Select All', 'Spotify', 'Apple Music']} />
                          <div className="md:col-span-2">
                             <InputWithLabel id="trackLink" label="Track Link" placeholder="Link" value={data.trackLink} disabled={isViewOnly} onChange={(e) => handleInputChange('playlistPitching', 'trackLink', e.target.value)} />
                          </div>
                      </div>
                  </div>
                  {!isViewOnly && (
                    <div className="flex justify-center pt-4">
                        <Button onClick={() => handleFormSubmit('playlistPitching')} className="bg-[#711CE9] hover:bg-[#6f14ef] text-white w-full md:w-auto px-10">
                            Submit Ticket
                        </Button>
                    </div>
                  )}
              </CardContent>
          </Card>
        </div>
    )
  }

  // --- MAIN RENDER ---
  
  if (viewState[activeTab].showForm) {
    return (
        <div className="min-h-screen bg-background text-foreground p-6">
           {activeTab === 'sync' ? renderSyncForm() : renderPlaylistPitchingForm()}
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      {/* Main Page Header */}
      <div>
        <h1 className="text-2xl font-bold">MV Marketing</h1>
        <p className="text-muted-foreground">Create and manage marketing campaigns for your music</p>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 p-1 rounded-lg bg-card w-full max-w-lg my-6">
          <button onClick={() => setActiveTab('sync')} className={`px-4 py-1.5 w-full  text-sm font-medium rounded-md transition-colors ${activeTab === 'sync' ? 'bg-muted-foreground/20 text-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted-foreground/10'}`}>
              Sync
          </button>
          <button onClick={() => setActiveTab('playlistPitching')} className={`px-4 w-full py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'playlistPitching' ? 'bg-muted-foreground/20 text-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted-foreground/10'}`}>
              Playlist Pitching
          </button>
      </div>

      {/* Tab-Specific Content */}
      <div>
        {/* Tab Header */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold">{activeTab === 'sync' ? 'Sync Requests' : 'Playlist Pitching Requests'}</h2>
            <p className="text-muted-foreground text-sm">View, create, and manage your submissions below.</p>
          </div>
          <Button onClick={() => handleNewRequest(activeTab)} className="bg-[#711CE9] hover:bg-[#6f14ef] text-white flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {activeTab === 'sync' ? 'New Sync Request' : 'New Playlist Pitch'}
          </Button>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground border-b border-border">
                  <tr>
                    <th className="p-4 font-medium">Track Name</th>
                    <th className="p-4 font-medium">Track Lang</th>
                    <th className="p-4 font-medium">Stores</th>
                    <th className="p-4 font-medium">Genre</th>
                    <th className="p-4 font-medium">Theme</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Submit Date</th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(activeTab === 'sync' ? syncRequests : pitchingRequests).map((request, index) => (
                    <tr key={index} className="border-b border-border last:border-b-0 hover:bg-muted/50">
                      <td className="p-4">{request.trackName}</td>
                      <td className="p-4">{request.trackLang}</td>
                      <td className="p-4">{request.stores}</td>
                      <td className="p-4">{request.genre}</td>
                      <td className="p-4">{request.theme}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded text-xs bg-yellow-500/20 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400">
                          {request.status}
                        </span>
                      </td>
                      <td className="p-4">{request.submitDate}</td>
                      <td className="p-4">
                        <Button variant="outline" size="sm" onClick={() => handleView(activeTab, request)} className="flex items-center gap-2">
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
      </div>
    </div>
  )
}


// --- HELPER COMPONENTS ---

const InputWithLabel = ({ id, label, value, onChange, disabled, ...props }) => (
    <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} value={value} onChange={onChange} disabled={disabled} className="bg-background border-border" {...props} />
    </div>
);

const SelectWithLabel = ({ id, label, value, onValueChange, disabled, options }) => (
    <div className="space-y-2 ">
        <Label htmlFor={id}>{label}</Label>
        <Select  value={value} onValueChange={onValueChange} disabled={disabled}>
            <SelectTrigger id={id} className=" bg-background border-border">
                <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
                {options.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
            </SelectContent>
        </Select>
    </div>
);

const CheckboxWithLabel = ({ id, label, checked, onCheckedChange, disabled }) => (
    <div className="flex items-center space-x-2">
        <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} />
        <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
        </label>
    </div>
);