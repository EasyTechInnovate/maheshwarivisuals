import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, X, Music, Upload, Trash2, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const languages = [
   "Afrikaans", "Albanian - shqip", "Amharic - አማርኛ", "Arabic - العربية", "Armenian - հայերեն",
   "Azerbaijani - azərbaycan dili", "Basque - euskara", "Bengali - বাংলা", "Bulgarian - български",
   "Catalan - català", "Chinese - 中文", "Chinese (Simplified) - 中文（简体）", "Chinese (Traditional) - 中文（繁體）",
   "Croatian - hrvatski", "Czech - čeština", "Danish - dansk", "Dutch - Nederlands", "English",
   "English (United States)", "English (United Kingdom)", "Filipino", "Finnish - suomi",
   "French - français", "German - Deutsch", "Greek - Ελληνικά", "Gujarati - ગુજરાતી",
   "Hebrew - עברית", "Hindi - हिन्दी", "Hungarian - magyar", "Indonesian - Indonesia",
   "Italian - italiano", "Japanese - 日本語", "Kannada - ಕನ್ನಡ", "Korean - 한국어",
   "Malayalam - മലയാളം", "Marathi - मराठी", "Norwegian - norsk", "Polish - polski",
   "Portuguese - português", "Portuguese (Brazil) - português (Brasil)", "Punjabi - ਪੰਜਾਬੀ",
   "Romanian - română", "Russian - русский", "Spanish - español", "Swedish - svenska",
   "Tamil - தமிழ்", "Telugu - తెలుగు", "Thai - ไทย", "Turkish - Türkçe", "Ukrainian - українська",
   "Urdu - اردو", "Vietnamese - Tiếng Việt"
];

const genres = [
  "Alternative", "Alternative Rock", "Blues", "Classical", "Country", "Dance", "Electronic",
  "Hip-Hop / Rap", "Jazz", "Metal", "Pop", "R&B", "Reggae", "Rock", "Soul", "World"
];

const labelNames = ["Maheshwari Vishual"];

const soundRecordingProfessions = [
  "Actor", "Brand", "Choir", "Conductor", "Ensemble", "Mixer", 
  "Orchestra", "Musician", "Producer", "Programmer", "Remixer", 
  "Soloist", "Studio Personnel"
];

const musicalWorkRoles = [
  "Arranger", "Composer", "Librettist", "Lyricist", 
  "Publisher", "Non-Lyric Author", "Translator"
];

const releaseTypes = [
  { value: "single", label: "Single" },
  { value: "album", label: "Album" },
  { value: "ep", label: "EP" },
  { value: "mini-album", label: "Mini Album" },
  { value: "ringtone", label: "Ringtone Release" }
];

const AdvancedReleaseBuilder = () => {

  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState(0);
  const [worldWideRelease, setWorldWideRelease] = useState('yes');
  const [selectedTerritories, setSelectedTerritories] = useState([]);
  const [selectedPartners, setSelectedPartners] = useState([]);
  const [selectAllPartners, setSelectAllPartners] = useState(false);
  const [copyrightOption, setCopyrightOption] = useState('');

  const generateUniqueId = () => {
    return Date.now() + Math.random().toString(36).substr(2, 9);
  };

  const [formData, setFormData] = useState({
    coverArt: null,
    coverArtPreview: null,
    releaseName: '',
    releaseVersion: '',
    catalogNumber: '',
    releaseType: '',
    accountId: '',
    primaryArtists: [{ id: generateUniqueId(), value: '' }],
    featuringArtists: [{ id: generateUniqueId(), value: '' }],
    variousArtist: false,
    variousArtistNames: [{ id: generateUniqueId(), value: '' }],
    needUPC: 'yes',
    upc: '',
    labelName: '',
    cLine: '',
    cLineYear: '',
    pLine: '',
    pLineYear: '',
    releasePricingTier: '',
    
    tracks: [{
      id: generateUniqueId(),
      audioFile: null,
      audioFileName: '',
      trackName: '',
      mixVersion: '',
      primaryArtists: [{ id: generateUniqueId(), value: '' }],
      featuringArtists: [{ id: generateUniqueId(), value: '' }],
      contributorsToSound: [{ id: generateUniqueId(), profession: '', contributors: '' }],
      contributorsToMusical: [{ id: generateUniqueId(), role: '', contributors: '' }],
      needISRC: 'yes',
      isrc: '',
      primaryGenre: '',
      secondaryGenre: '',
      explicitStatus: '',
      hasHumanVocals: 'no',
      language: '',
      isAvailableForDownload: 'no',
      previewStartTiming: ''
    }],
    
    forFutureRelease: '',
    forPreorderPreSave: '',
    worldWideRelease: 'yes',
    territories: [],
    partners: [],
    copyrightOption: '',
    copyrightDocument: null
  });

  const territories = [
    'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria', 'Bangladesh',
    'Belgium', 'Brazil', 'Canada', 'Chile', 'China', 'Colombia', 'Denmark', 'Egypt',
    'Finland', 'France', 'Germany', 'Greece', 'India', 'Indonesia', 'Iran', 'Iraq',
    'Ireland', 'Israel', 'Italy', 'Japan', 'Kenya', 'Malaysia', 'Mexico', 'Netherlands',
    'New Zealand', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Philippines',
    'Poland', 'Portugal', 'Qatar', 'Russia', 'Saudi Arabia', 'Singapore', 'South Africa',
    'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Thailand', 'Turkey', 'Ukraine',
    'United Arab Emirates', 'United Kingdom', 'United States of America', 'Vietnam'
  ];

  const partners = [
    { name: '7 Digital' }, { name: 'Tik Tok' }, { name: 'Amazon' }, { name: 'Spotify' },
    { name: 'Apple Music' }, { name: 'Beatport' }, { name: 'Juno Download' },
    { name: 'Napster' }, { name: 'Shazam' }, { name: 'SoundCloud' }, { name: 'Tidal' },
    { name: 'Deezer' }, { name: 'Instagram' }, { name: 'iTunes' }, { name: 'Traxsource' }
  ];

  const handleCoverArtUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        alert('Please select a JPG or PNG image file');
        return;
      }
      const img = new Image();
      img.onload = function() {
        if (this.width < 3000 || this.height < 3000) {
          alert('Image must be at least 3000x3000 pixels');
          return;
        }
        const previewUrl = URL.createObjectURL(file);
        setFormData({ ...formData, coverArt: file, coverArtPreview: previewUrl });
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const addDynamicField = (section, trackId = null) => {
    if (trackId) {
      const updatedTracks = formData.tracks.map(track => {
        if (track.id === trackId) {
          let newItem;
          if (section === 'contributorsToSound') {
            newItem = { id: generateUniqueId(), profession: '', contributors: '' };
          } else if (section === 'contributorsToMusical') {
            newItem = { id: generateUniqueId(), role: '', contributors: '' };
          } else {
            newItem = { id: generateUniqueId(), value: '' };
          }
          return {
            ...track,
            [section]: [...track[section], newItem]
          };
        }
        return track;
      });
      setFormData({ ...formData, tracks: updatedTracks });
    } else {
      setFormData({
        ...formData,
        [section]: [...formData[section], { id: generateUniqueId(), value: '' }]
      });
    }
  };

  const removeDynamicField = (section, fieldId, trackId = null) => {
    if (trackId) {
      const updatedTracks = formData.tracks.map(track => {
        if (track.id === trackId && track[section].length > 1) {
          return {
            ...track,
            [section]: track[section].filter(item => item.id !== fieldId)
          };
        }
        return track;
      });
      setFormData({ ...formData, tracks: updatedTracks });
    } else {
      if (formData[section].length > 1) {
        setFormData({
          ...formData,
          [section]: formData[section].filter(item => item.id !== fieldId)
        });
      }
    }
  };

  const updateDynamicField = (section, fieldId, value, trackId = null, fieldName = 'value') => {
    if (trackId) {
      const updatedTracks = formData.tracks.map(track => {
        if (track.id === trackId) {
          return {
            ...track,
            [section]: track[section].map(item => 
              item.id === fieldId ? { ...item, [fieldName]: value } : item
            )
          };
        }
        return track;
      });
      setFormData({ ...formData, tracks: updatedTracks });
    } else {
      setFormData({
        ...formData,
        [section]: formData[section].map(item => 
          item.id === fieldId ? { ...item, [fieldName]: value } : item
        )
      });
    }
  };

  const handleAudioUpload = (trackId, event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      const updatedTracks = formData.tracks.map(track => 
        track.id === trackId ? { ...track, audioFile: file, audioFileName: file.name } : track
      );
      setFormData({ ...formData, tracks: updatedTracks });
    }
  };

  const handleTrackFieldChange = (trackId, field, value) => {
    const updatedTracks = formData.tracks.map(track => 
      track.id === trackId ? { ...track, [field]: value } : track
    );
    setFormData({ ...formData, tracks: updatedTracks });
  };

  const addTrack = () => {
    const newTrack = {
      id: generateUniqueId(),
      audioFile: null,
      audioFileName: '',
      trackName: '',
      mixVersion: '',
      primaryArtists: [{ id: generateUniqueId(), value: '' }],
      featuringArtists: [{ id: generateUniqueId(), value: '' }],
      contributorsToSound: [{ id: generateUniqueId(), year: '', contributors: '' }],
      contributorsToMusical: [{ id: generateUniqueId(), year: '', contributors: '' }],
      needISRC: 'yes',
      isrc: '',
      primaryGenre: '',
      secondaryGenre: '',
      explicitStatus: '',
      hasHumanVocals: 'no',
      language: '',
      isAvailableForDownload: 'no',
      previewStartTiming: ''
    };
    setFormData({ ...formData, tracks: [...formData.tracks, newTrack] });
  };

  const removeTrack = (trackId) => {
    if (formData.tracks.length > 1) {
      setFormData({ ...formData, tracks: formData.tracks.filter(track => track.id !== trackId) });
    }
  };

  const handleTerritoryChange = (territory, checked) => {
    let updatedTerritories = checked 
      ? [...selectedTerritories, territory]
      : selectedTerritories.filter(t => t !== territory);
    setSelectedTerritories(updatedTerritories);
    setFormData({ ...formData, territories: updatedTerritories });
  };

  const handlePartnerChange = (partner, checked) => {
    let updatedPartners = checked
      ? [...selectedPartners, partner]
      : selectedPartners.filter(p => p !== partner);
    if (!checked) setSelectAllPartners(false);
    setSelectedPartners(updatedPartners);
    setFormData({ ...formData, partners: updatedPartners });
  };

  const handleSelectAllPartners = (checked) => {
    setSelectAllPartners(checked);
    const allPartnerNames = checked ? partners.map(p => p.name) : [];
    setSelectedPartners(allPartnerNames);
    setFormData({ ...formData, partners: allPartnerNames });
  };

  const renderStep1 = () => (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <Card className="lg:col-span-1 p-4">
          <div className="bg-muted/50 rounded-lg">
            <h3 className="text-foreground text-lg font-medium mb-6">Cover Art</h3>
            <div className="flex flex-col items-center">
              <div className="w-full h-[250px] bg-muted border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center mb-4 relative overflow-hidden">
                {formData.coverArtPreview ? (
                  <img src={formData.coverArtPreview} alt="Cover preview" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <>
                    <div className='rounded-xl p-6 bg-muted-foreground/10 mb-4'>
                      <Music className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-foreground font-medium mb-1">Upload Cover Art</p>
                    <p className="text-muted-foreground text-sm mb-4">3000x3000px, JPG/PNG</p>
                  </>
                )}
                <input type="file" accept=".jpg,.jpeg,.png" onChange={handleCoverArtUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>
              <Button variant="outline" size="sm">Choose Image</Button>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-3 p-4">
          <div className="bg-muted/50 rounded-lg">
            <h3 className="text-foreground text-lg font-medium mb-6">Track Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-foreground">Release Name</Label>
                  <Input placeholder="Enter release name" className="mt-1" value={formData.releaseName} onChange={(e) => setFormData({...formData, releaseName: e.target.value})} />
                </div>
                <div>
                  <Label className="text-foreground">Release Version</Label>
                  <Input placeholder="Enter release version" className="mt-1" value={formData.releaseVersion} onChange={(e) => setFormData({...formData, releaseVersion: e.target.value})} />
                  <p className="text-[10px] text-muted-foreground mt-1">Use for non-original release EG: Remastered, Live, Remixes etc</p>
                </div>
                <div>
                  <Label className="text-foreground">Catalog #</Label>
                  <Input placeholder="Enter catalog number" className="mt-1" value={formData.catalogNumber} onChange={(e) => setFormData({...formData, catalogNumber: e.target.value})} />
                  <p className="text-[10px] text-muted-foreground mt-1">Your internal identifier for this release. This cannot be changed after audio is uploaded to the release.</p>
                </div>
                <div>
                  <Label className="text-foreground">Release Type</Label>
                  <Select onValueChange={(value) => setFormData({...formData, releaseType: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select release type" />
                    </SelectTrigger>
                    <SelectContent>
                      {releaseTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-foreground">Account ID</Label>
                  <Input placeholder="Enter account ID" className="mt-1" value={formData.accountId} onChange={(e) => setFormData({...formData, accountId: e.target.value})} />
                </div>
              </div>

              <div>
                <Label className="text-foreground mb-2 block">Primary Artists</Label>
                {formData.primaryArtists.map((artist, index) => (
                  <div key={artist.id} className="flex items-center gap-2 mb-2">
                    <Input placeholder="Enter primary artist name" className="flex-1" value={artist.value} onChange={(e) => updateDynamicField('primaryArtists', artist.id, e.target.value)} />
                    {index === formData.primaryArtists.length - 1 ? (
                      <Button variant="ghost" size="sm" className="p-2" onClick={() => addDynamicField('primaryArtists')}>
                        <Plus className="w-5 h-5 text-primary" />
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" className="p-2" onClick={() => removeDynamicField('primaryArtists', artist.id)}>
                        <Trash2 className="w-5 h-5 text-destructive" />
                      </Button>
                    )}
                  </div>
                ))}
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox id="variousArtist" checked={formData.variousArtist} onCheckedChange={(checked) => setFormData({...formData, variousArtist: checked})} />
                  <Label htmlFor="variousArtist" className="text-sm">Various Artist</Label>
                </div>
                
                {formData.variousArtist && (
                  <div className="mt-4 ml-6 space-y-2">
                    <Label className="text-foreground text-sm">Various Artist Names</Label>
                    {formData.variousArtistNames.map((artist, index) => (
                      <div key={artist.id} className="flex items-center gap-2">
                        <Input placeholder="Enter various artist name" className="flex-1" value={artist.value} onChange={(e) => updateDynamicField('variousArtistNames', artist.id, e.target.value)} />
                        {index === formData.variousArtistNames.length - 1 ? (
                          <Button variant="ghost" size="sm" className="p-2" onClick={() => addDynamicField('variousArtistNames')}>
                            <Plus className="w-5 h-5 text-primary" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" className="p-2" onClick={() => removeDynamicField('variousArtistNames', artist.id)}>
                            <Trash2 className="w-5 h-5 text-destructive" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Label className="text-foreground mb-2 block">Featuring Artists(optional)</Label>
                {formData.featuringArtists.map((artist, index) => (
                  <div key={artist.id} className="flex items-center gap-2 mb-2">
                    <Input placeholder="Enter featuring artist name" className="flex-1" value={artist.value} onChange={(e) => updateDynamicField('featuringArtists', artist.id, e.target.value)} />
                    {index === formData.featuringArtists.length - 1 ? (
                      <Button variant="ghost" size="sm" className="p-2" onClick={() => addDynamicField('featuringArtists')}>
                        <Plus className="w-5 h-5 text-primary" />
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" className="p-2" onClick={() => removeDynamicField('featuringArtists', artist.id)}>
                        <Trash2 className="w-5 h-5 text-destructive" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <Label className="text-foreground font-medium">Do you need a UPC for this release?</Label>
                <RadioGroup value={formData.needUPC} onValueChange={(value) => setFormData({...formData, needUPC: value})} className="flex space-x-6 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="upc-yes" />
                    <Label htmlFor="upc-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="upc-no" />
                    <Label htmlFor="upc-no">No</Label>
                  </div>
                </RadioGroup>
                <p className="text-[10px] text-muted-foreground mt-1">Gearnuun can be able to view your UPC once</p>
              </div>

              {formData.needUPC === 'no' && (
                <div>
                  <Label className="text-foreground">UPC</Label>
                  <Input placeholder="Enter UPC code" className="mt-1" value={formData.upc} onChange={(e) => setFormData({...formData, upc: e.target.value})} />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-foreground">Label Name</Label>
                  <Select onValueChange={(value) => setFormData({...formData, labelName: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                    <SelectContent>
                      {labelNames.map((label) => (
                        <SelectItem key={label} value={label}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-foreground">CLine</Label>
                  <div className="flex gap-2 mt-1">
                    <Select onValueChange={(value) => setFormData({...formData, cLineYear: value})} className="w-32">
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 50}, (_, i) => new Date().getFullYear() - i).map(year => (
                          <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input placeholder="Enter CLine details" className="flex-1" value={formData.cLine} onChange={(e) => setFormData({...formData, cLine: e.target.value})} />
                  </div>
                </div>
                <div>
                  <Label className="text-foreground">PLine</Label>
                  <div className="flex gap-2 mt-1">
                    <Select onValueChange={(value) => setFormData({...formData, pLineYear: value})} className="w-32">
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 50}, (_, i) => new Date().getFullYear() - i).map(year => (
                          <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input placeholder="Enter PLine details" className="flex-1" value={formData.pLine} onChange={(e) => setFormData({...formData, pLine: e.target.value})} />
                  </div>
                </div>
                <div>
                  <Label className="text-foreground">Release pricing tier</Label>
                  <Select onValueChange={(value) => setFormData({...formData, releasePricingTier: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Front" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="front">Front</SelectItem>
                      <SelectItem value="mid">Mid</SelectItem>
                      <SelectItem value="back">Back</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderStep2 = () => {
    const canAddMultipleTracks = formData.releaseType && !['single', 'ringtone'].includes(formData.releaseType);
    
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        {formData.tracks.map((track, index) => (
          <div key={track.id} className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <Card className="lg:col-span-1 p-4">
              <div className="bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-foreground text-lg font-medium">Track Details</h3>
                  {canAddMultipleTracks && formData.tracks.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => removeTrack(track.id)} className="text-destructive hover:text-destructive">
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full h-[250px] bg-muted border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center mb-4 relative">
                    {track.audioFileName ? (
                      <div className="text-center p-4">
                        <Music className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <p className="text-foreground font-medium text-sm">{track.audioFileName}</p>
                        <p className="text-muted-foreground text-xs">Audio uploaded</p>
                      </div>
                    ) : (
                      <>
                        <div className='rounded-xl p-6 bg-muted-foreground/10 mb-4'>
                          <Music className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="text-foreground font-medium mb-4">Upload Track</p>
                      </>
                    )}
                    <input type="file" accept="audio/*" onChange={(e) => handleAudioUpload(track.id, e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  </div>
                  <Button variant="outline" size="sm">Choose Audio</Button>
                </div>
              </div>
            </Card>

            <Card className="lg:col-span-3 p-4">
              <div className="bg-muted/50 rounded-lg">
                <h3 className="text-foreground text-lg font-medium mb-6">Track Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground">Track Name</Label>
                      <Input placeholder="Enter track name" className="mt-1" value={track.trackName} onChange={(e) => handleTrackFieldChange(track.id, 'trackName', e.target.value)} />
                    </div>
                    <div>
                      <Label className="text-foreground">Mix version</Label>
                      <Input placeholder="Enter mix version" className="mt-1" value={track.mixVersion} onChange={(e) => handleTrackFieldChange(track.id, 'mixVersion', e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <Label className="text-foreground mb-2 block">Primary Artists</Label>
                    {track.primaryArtists.map((artist, idx) => (
                      <div key={artist.id} className="flex items-center gap-2 mb-2">
                        <Input placeholder="Enter primary artist name" className="flex-1" value={artist.value} onChange={(e) => updateDynamicField('primaryArtists', artist.id, e.target.value, track.id)} />
                        {idx === track.primaryArtists.length - 1 ? (
                          <Button variant="ghost" size="sm" className="p-2" onClick={() => addDynamicField('primaryArtists', track.id)}>
                            <Plus className="w-5 h-5 text-primary" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" className="p-2" onClick={() => removeDynamicField('featuringArtists', artist.id, track.id)}>
                            <Trash2 className="w-5 h-5 text-destructive" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div>
                    <Label className="text-foreground mb-2 block">Contributors to Sound Recording</Label>
                    {track.contributorsToSound.map((contributor, idx) => (
                      <div key={contributor.id} className="flex items-center gap-2 mb-2">
                        <Select onValueChange={(value) => updateDynamicField('contributorsToSound', contributor.id, value, track.id, 'profession')}>
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Select profession" />
                          </SelectTrigger>
                          <SelectContent>
                            {soundRecordingProfessions.map((prof) => (
                              <SelectItem key={prof} value={prof.toLowerCase()}>{prof}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input placeholder="Enter contributor name" className="flex-1" value={contributor.contributors} onChange={(e) => updateDynamicField('contributorsToSound', contributor.id, e.target.value, track.id, 'contributors')} />
                        {idx === track.contributorsToSound.length - 1 ? (
                          <Button variant="ghost" size="sm" className="p-2" onClick={() => addDynamicField('contributorsToSound', track.id)}>
                            <Plus className="w-5 h-5 text-primary" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" className="p-2" onClick={() => removeDynamicField('contributorsToSound', contributor.id, track.id)}>
                            <Trash2 className="w-5 h-5 text-destructive" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div>
                    <Label className="text-foreground mb-2 block">Contributors to Musicial Work</Label>
                    {track.contributorsToMusical.map((contributor, idx) => (
                      <div key={contributor.id} className="flex items-center gap-2 mb-2">
                        <Select onValueChange={(value) => updateDynamicField('contributorsToMusical', contributor.id, value, track.id, 'role')}>
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            {musicalWorkRoles.map((role) => (
                              <SelectItem key={role} value={role.toLowerCase()}>{role}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input placeholder="Enter contributor name" className="flex-1" value={contributor.contributors} onChange={(e) => updateDynamicField('contributorsToMusical', contributor.id, e.target.value, track.id, 'contributors')} />
                        {idx === track.contributorsToMusical.length - 1 ? (
                          <Button variant="ghost" size="sm" className="p-2" onClick={() => addDynamicField('contributorsToMusical', track.id)}>
                            <Plus className="w-5 h-5 text-primary" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" className="p-2" onClick={() => removeDynamicField('contributorsToMusical', contributor.id, track.id)}>
                            <Trash2 className="w-5 h-5 text-destructive" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div>
                    <Label className="text-foreground font-medium">Do you need a ISRC for this release?</Label>
                    <RadioGroup value={track.needISRC} onValueChange={(value) => handleTrackFieldChange(track.id, 'needISRC', value)} className="flex space-x-6 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id={`isrc-yes-${track.id}`} />
                        <Label htmlFor={`isrc-yes-${track.id}`}>Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id={`isrc-no-${track.id}`} />
                        <Label htmlFor={`isrc-no-${track.id}`}>No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {track.needISRC === 'no' && (
                    <div>
                      <Label className="text-foreground">ISRC</Label>
                      <Input placeholder="Enter ISRC code" className="mt-1" value={track.isrc} onChange={(e) => handleTrackFieldChange(track.id, 'isrc', e.target.value)} />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground">Primary Genre</Label>
                      <Select onValueChange={(value) => handleTrackFieldChange(track.id, 'primaryGenre', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Please select" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {genres.map((genre) => (
                            <SelectItem key={genre} value={genre.toLowerCase().replace(/\s+/g, '-')}>{genre}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-foreground">Secondary Genre</Label>
                      <Select onValueChange={(value) => handleTrackFieldChange(track.id, 'secondaryGenre', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Please select" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {genres.map((genre) => (
                            <SelectItem key={genre} value={genre.toLowerCase().replace(/\s+/g, '-')}>{genre}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-foreground font-medium">Explicit Status</Label>
                    <RadioGroup value={track.explicitStatus} onValueChange={(value) => handleTrackFieldChange(track.id, 'explicitStatus', value)} className="flex space-x-6 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id={`explicit-yes-${track.id}`} />
                        <Label htmlFor={`explicit-yes-${track.id}`}>Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id={`explicit-no-${track.id}`} />
                        <Label htmlFor={`explicit-no-${track.id}`}>No</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cleaned" id={`explicit-cleaned-${track.id}`} />
                        <Label htmlFor={`explicit-cleaned-${track.id}`}>Cleaned</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-foreground font-medium">Does this Track have Human Vocals?</Label>
                    <RadioGroup value={track.hasHumanVocals} onValueChange={(value) => handleTrackFieldChange(track.id, 'hasHumanVocals', value)} className="flex space-x-6 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id={`vocals-yes-${track.id}`} />
                        <Label htmlFor={`vocals-yes-${track.id}`}>Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id={`vocals-no-${track.id}`} />
                        <Label htmlFor={`vocals-no-${track.id}`}>No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {track.hasHumanVocals === 'yes' && (
                    <div>
                      <Label className="text-foreground">Language</Label>
                      <Select onValueChange={(value) => handleTrackFieldChange(track.id, 'language', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {languages.map((language) => (
                            <SelectItem key={language} value={language}>{language}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div>
                    <Label className="text-foreground font-medium">Is Track is available for download Purchase?</Label>
                    <RadioGroup value={track.isAvailableForDownload} onValueChange={(value) => handleTrackFieldChange(track.id, 'isAvailableForDownload', value)} className="flex space-x-6 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id={`download-yes-${track.id}`} />
                        <Label htmlFor={`download-yes-${track.id}`}>Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id={`download-no-${track.id}`} />
                        <Label htmlFor={`download-no-${track.id}`}>No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-foreground">Preview Start Timing / Callertune Start Timing</Label>
                    <Input placeholder="Enter timing in seconds" className="mt-1" value={track.previewStartTiming} onChange={(e) => handleTrackFieldChange(track.id, 'previewStartTiming', e.target.value)} />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}

        {canAddMultipleTracks && (
          <div className="flex justify-center">
            <Button onClick={addTrack} variant="outline" className="w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add New Track
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderStep3 = () => (
    <div className="mx-auto space-y-8">
      <Card className="space-y-6 p-6">
        <h3 className="text-foreground text-xl font-semibold">Delivery Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-foreground">For Future release</Label>
            <div className="mt-2 relative">
              <Input 
                type="date" 
                placeholder="mm/dd/yyyy" 
                className="w-full [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:invert-0 dark:[&::-webkit-calendar-picker-indicator]:invert" 
                value={formData.forFutureRelease}
                onChange={(e) => setFormData({...formData, forFutureRelease: e.target.value})}
                min={(() => {
                  const today = new Date();
                  const oneWeekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
                  return oneWeekLater.toISOString().split('T')[0];
                })()}
              />
            </div>
          </div>
          <div>
            <Label className="text-foreground">For Previous/Past release</Label>
            <div className="mt-2 relative">
              <Input 
                type="date" 
                placeholder="mm/dd/yyyy" 
                className="w-full [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:invert-0 dark:[&::-webkit-calendar-picker-indicator]:invert" 
                value={formData.forPreorderPreSave}
                onChange={(e) => setFormData({...formData, forPreorderPreSave: e.target.value})}
                max={(() => {
                  const today = new Date();
                  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
                  return yesterday.toISOString().split('T')[0];
                })()}
              />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-foreground font-semibold mb-4">Territory Rights :</h4>
          <div className="space-y-4">
            <div>
              <Label className="text-foreground font-medium">World Wide Release</Label>
              <RadioGroup value={worldWideRelease} onValueChange={(value) => {
                setWorldWideRelease(value);
                setFormData({...formData, worldWideRelease: value});
              }} className="flex space-x-6 mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="worldwide-yes" />
                  <Label htmlFor="worldwide-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="worldwide-no" />
                  <Label htmlFor="worldwide-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {worldWideRelease === 'no' && (
              <Card className="p-6 border border-muted bg-background rounded-lg">
                <Label className="text-foreground font-medium">Select The Territories, Where you own the rights</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 max-h-60 overflow-y-auto custom-scroll">
                  {territories.map((territory) => (
                    <div key={territory} className="flex items-center space-x-2">
                      <Checkbox 
                        id={territory}
                        checked={selectedTerritories.includes(territory)}
                        onCheckedChange={(checked) => handleTerritoryChange(territory, checked)}
                      />
                      <Label htmlFor={territory} className="text-sm">{territory}</Label>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-foreground font-semibold mb-4">Partner Selection :</h4>
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox 
              id="selectAllPartners"
              checked={selectAllPartners}
              onCheckedChange={handleSelectAllPartners}
            />
            <Label htmlFor="selectAllPartners" className="font-medium">Select All Partners</Label>
          </div>

          <Card className="p-6 border border-muted bg-background rounded-lg">
            <Label className="text-primary font-medium mb-4 block">International Partners</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {partners.map((partner) => (
                <div key={partner.name} className="flex items-center space-x-2">
                  <Checkbox 
                    id={partner.name}
                    checked={selectedPartners.includes(partner.name)}
                    onCheckedChange={(checked) => handlePartnerChange(partner.name, checked)}
                  />
                  <Label htmlFor={partner.name} className="text-sm">{partner.name}</Label>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <h4 className="text-foreground font-semibold">Copyright Options :</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="proceedWithoutCopyright"
                checked={copyrightOption === 'proceed'}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setCopyrightOption('proceed');
                    setFormData({...formData, copyrightOption: 'proceed'});
                  } else if (copyrightOption === 'proceed') {
                    setCopyrightOption('');
                    setFormData({...formData, copyrightOption: ''});
                  }
                }}
              />
              <Label htmlFor="proceedWithoutCopyright">Proceed without Uploading the Copyright Documents</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="ownCopyrightUpload"
                checked={copyrightOption === 'upload'}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setCopyrightOption('upload');
                    setFormData({...formData, copyrightOption: 'upload'});
                  } else if (copyrightOption === 'upload') {
                    setCopyrightOption('');
                    setFormData({...formData, copyrightOption: ''});
                  }
                }}
              />
              <Label htmlFor="ownCopyrightUpload">I own the Copyrights Will Upload</Label>
            </div>
          </div>

          {copyrightOption === 'upload' && (
            <div className="ml-6 mt-4">
              <Label className="text-foreground">Upload Copyright Document</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Input 
                  type="file" 
                  accept=".pdf,.doc,.docx" 
                  className="flex-1"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setFormData({...formData, copyrightDocument: file});
                  }}
                />
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return renderStep1();
      case 1: return renderStep2();
      case 2: return renderStep3();
      default: return renderStep1();
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 0: return 'Cover Details';
      case 1: return 'Track Details';
      case 2: return 'Distribution';
      default: return '';
    }
  };

  const handleSubmit = () => {
    console.log('Advanced Release Form Data:', formData);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button onClick={()=>navigate('/user/upload-release/')} variant="outline" size="sm" className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-foreground text-3xl font-semibold">Upload Release</h1>
              <p className="text-muted-foreground text-sm">Upload your music and distribute it to all major platforms</p>
            </div>
          </div>
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-medium">
            Step {currentStep + 1} of 3
          </div>
        </div>

        <Card className="flex flex-row items-center justify-between px-10 mb-8 py-3 space-x-4">
          {[
            { icon: Upload, label: 'Cover Details', step: 0 },
            { icon: Music, label: 'Track Details', step: 1 },
            { icon: Globe, label: 'Distribution', step: 2 }
          ].map(({icon: Icon, label, step}) => (
            <div key={step} className="flex items-center">
              <div className={`flex items-center space-x-2 px-4 py-2  `}>
                <div className={`p-2 rounded-full ${currentStep === step ? 'bg-[#711CE9] text-white' : 'bg-muted-foreground/10 text-muted-foreground'}`}>
                <Icon className={`w-5 h-5  `} />

                </div>
                <span className="font-medium hidden md:inline">{label}</span>
              </div>
              {step < 2 && <div className="w-12 h-px bg-muted mx-2"></div>}
            </div>
          ))}
        </Card>

        <div className="mb-12">
          {renderStepContent()}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* {[0, 1, 2].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === currentStep ? 'bg-primary text-primary-foreground' : step < currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {step + 1}
                </div>
                <span className={`ml-2 text-sm ${step === currentStep ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                  Step {step + 1}
                </span>
                {step < 2 && <div className="w-8 h-px bg-muted mx-4"></div>}
              </div>
            ))} */}
          </div>

          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/user/upload-release')}
            >
              Cancel
            </Button>
            <Button onClick={() => {
              if (currentStep < 2) {
                setCurrentStep(currentStep + 1);
              } else {
                handleSubmit();
              }
            }} className="bg-primary text-primary-foreground">
              {currentStep === 2 ? 'Submit' : 'Submit'}
              {currentStep < 2 && <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedReleaseBuilder;