import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, X, Music, Upload, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const languages = [
   "Afrikaans",
   "Albanian - shqip",
   "Amharic - አማርኛ",
   "Arabic - العربية",
   "Aragonese - aragonés",
   "Armenian - հայերեն",
   "Asturian - asturianu",
   "Azerbaijani - azərbaycan dili",
   "Basque - euskara",
   "Belarusian - беларуская",
   "Bengali - বাংলা",
   "Bosnian - bosanski",
   "Breton - brezhoneg",
   "Bulgarian - български",
   "Catalan - català",
   "Central Kurdish - کوردی (دەستنوسی عەرەبی)",
   "Chinese - 中文",
   "Chinese (Hong Kong) - 中文（香港）",
   "Chinese (Simplified) - 中文（简体）",
   "Chinese (Traditional) - 中文（繁體）",
   "Corsican",
   "Croatian - hrvatski",
   "Czech - čeština",
   "Danish - dansk",
   "Dutch - Nederlands",
   "English",
   "English (Australia)",
   "English (Canada)",
   "English (India)",
   "English (New Zealand)",
   "English (South Africa)",
   "English (United Kingdom)",
   "English (United States)",
   "Esperanto - esperanto",
   "Estonian - eesti",
   "Faroese - føroyskt",
   "Filipino",
   "Finnish - suomi",
   "French - français",
   "French (Canada) - français (Canada)",
   "French (France) - français (France)",
   "French (Switzerland) - français (Suisse)",
   "Galician - galego",
   "Georgian - ქართული",
   "German - Deutsch",
   "German (Austria) - Deutsch (Österreich)",
   "German (Germany) - Deutsch (Deutschland)",
   "German (Liechtenstein) - Deutsch (Liechtenstein)",
   "German (Switzerland) - Deutsch (Schweiz)",
   "Greek - Ελληνικά",
   "Guarani",
   "Gujarati - ગુજરાતી",
   "Hausa",
   "Hawaiian - ʻŌlelo Hawaiʻi",
   "Hebrew - עברית",
   "Hindi - हिन्दी",
   "Hungarian - magyar",
   "Icelandic - íslenska",
   "Indonesian - Indonesia",
   "Interlingua",
   "Irish - Gaeilge",
   "Italian - italiano",
   "Italian (Italy) - italiano (Italia)",
   "Italian (Switzerland) - italiano (Svizzera)",
   "Japanese - 日本語",
   "Kannada - ಕನ್ನಡ",
   "Kazakh - қазақ тілі",
   "Khmer - ខ្មែរ",
   "Korean - 한국어",
   "Kurdish - Kurdî",
   "Kyrgyz - кыргызча",
   "Lao - ລາວ",
   "Latin",
   "Latvian - latviešu",
   "Lingala - lingála",
   "Lithuanian - lietuvių",
   "Macedonian - македонски",
   "Malay - Bahasa Melayu",
   "Malayalam - മലയാളം",
   "Maltese - Malti",
   "Marathi - मराठी",
   "Mongolian - монгол",
   "Nepali - नेपाली",
   "Norwegian - norsk",
   "Norwegian Bokmål - norsk bokmål",
   "Norwegian Nynorsk - nynorsk",
   "Occitan",
   "Oriya - ଓଡ଼ିଆ",
   "Oromo - Oromoo",
   "Pashto - پښتو",
   "Persian - فارسی",
   "Polish - polski",
   "Portuguese - português",
   "Portuguese (Brazil) - português (Brasil)",
   "Portuguese (Portugal) - português (Portugal)",
   "Punjabi - ਪੰਜਾਬੀ",
   "Quechua",
   "Romanian - română",
   "Romanian (Moldova) - română (Moldova)",
   "Romansh - rumantsch",
   "Russian - русский",
   "Scottish Gaelic",
   "Serbian - српски",
   "Serbo-Croatian - Srpskohrvatski",
   "Shona - chiShona",
   "Sindhi",
   "Sinhala - සිංහල",
   "Slovak - slovenčina",
   "Slovenian - slovenščina",
   "Somali - Soomaali",
   "Southern Sotho",
   "Spanish - español",
   "Spanish (Argentina) - español (Argentina)",
   "Spanish (Latin America) - español (Latinoamérica)",
   "Spanish (Mexico) - español (México)",
   "Spanish (Spain) - español (España)",
   "Spanish (United States) - español (Estados Unidos)",
   "Sundanese",
   "Swahili - Kiswahili",
   "Swedish - svenska",
   "Tajik - тоҷикӣ",
   "Tamil - தமிழ்",
   "Tatar",
   "Telugu - తెలుగు",
   "Thai - ไทย",
   "Tigrinya - ትግርኛ",
   "Tongan - lea fakatonga",
   "Turkish - Türkçe",
   "Turkmen",
   "Twi",
   "Ukrainian - українська",
   "Urdu - اردو",
   "Uyghur",
   "Uzbek - o'zbek",
   "Vietnamese - Tiếng Việt",
   "Walloon - wa",
   "Welsh - Cymraeg",
   "Western Frisian",
   "Xhosa",
   "Yiddish",
   "Yoruba - Èdè Yorùbá",
   "Zulu - isiZulu"
];

const genres = [
  "Alternative",
  "Alternative Rock",
  "Alternative & Rock Latino",
  "Anime",
  "Baladas Y Boleros",
  "Big Band",
  "Blues",
  "Brazilian",
  "C-Pop",
  "Cantopop / HK-Pop",
  "Children's",
  "Chinese",
  "Christian",
  "Classical",
  "Comedy",
  "Contemporary Latin",
  "Country",
  "Dance",
  "Easy Listening",
  "Educational",
  "Electronic",
  "Enka",
  "Experimental",
  "Fitness & Workout",
  "Folk",
  "French Pop",
  "German Pop",
  "German Folk",
  "Hip-Hop / Rap",
  "Holiday",
  "Instrumental",
  "Indo Pop",
  "Inspirational",
  "Indian",
  "Indian Pop",
  "Indian Rap",
  "Indian Folk",
  "Indian Bollywood",
  "Indian Devotional & Spiritual",
  "Indian Fusion",
  "Indian Gazal",
  "Indian Classical / Vocal",
  "Indian Dance",
  "Indian Electronic",
  "Jazz",
  "J-Pop",
  "K-Pop",
  "Karaoke",
  "Latin Jazz",
  "Metal",
  "New Age",
  "Opera",
  "Pop",
  "R&B",
  "Reggae",
  "Reggaeton y Hip-Hop",
  "Regional Mexicano",
  "Rock",
  "Salas y Topical",
  "Soul",
  "Soundtrack",
  "Spoken Word",
  "Thai Pop",
  "Trot",
  "Vocal / Nostalgia",
  "World"
];

const labelNames = [
  "Maheshwari Vishual"
];

const BasicReleaseBuilder = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0);
  const [releaseType, setReleaseType] = useState('');
  const [worldWideRelease, setWorldWideRelease] = useState('no');
  const [selectedTerritories, setSelectedTerritories] = useState([]);
  const [selectedPartners, setSelectedPartners] = useState([]);
  const [selectAllPartners, setSelectAllPartners] = useState(false);
  const [copyrightOption, setCopyrightOption] = useState(''); // 'proceed' or 'upload'
  // const [tracks, setTracks] = useState([{ id: 1 }]);

  const generateUniqueId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};

  // Form data state
  const [formData, setFormData] = useState({
    // Cover Art & Track Info
    coverArt: null,
    coverArtPreview: null,
    releaseName: '',
    genre: '',
    upc: '',
    labelName: '',
    
    // Audio & Track Details
    tracks: [{
      id: generateUniqueId(),
      audioFile: null,
      audioFileName: '',
      songName: '',
      genre: '',
      singerName: '',
      composerName: '',
      lyricistName: '',
      producerName: '',
      isrc: '',
      previewCallTiming: '',
      language: ''
    }],
    
    // Delivery Details
    forFutureRelease: '',
    forPreorderPreSave: '',
    worldWideRelease: 'yes',
    territories: [],
    partners: [],
    copyrightOption: '',
    copyrightDocument: null
  });

  const tracks = formData.tracks;

  // const territories = [
  //    'India' , 'Canada', 'USA' , 'UK' ,'Afghanistan', 'Albania', 'Algeria', 'Greece', 'Grenada', 'Guatemala',
  //   'Oman', 'Pakistan', 'Palestine'
  // ];
  const territories = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
  'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
  'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo (Congo-Brazzaville)', 'Costa Rica', 'Cote d\'Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czechia',
  'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
  'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini (formerly Swaziland)', 'Ethiopia',
  'Fiji', 'Finland', 'France',
  'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
  'Haiti', 'Honduras', 'Hungary',
  'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
  'Jamaica', 'Japan', 'Jordan',
  'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan',
  'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
  'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar (formerly Burma)',
  'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia (formerly Macedonia)', 'Norway',
  'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Qatar',
  'Romania', 'Russia', 'Rwanda',
  'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
  'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'Uruguay', 'Uzbekistan',
  'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
  'Yemen',
  'Zambia', 'Zimbabwe'
];

  const partners = [
    { name: '7 Digital', category: 'International Partners' },
    { name: 'Tik Tok', category: 'International Partners' },
    { name: 'Amazon', category: 'International Partners' },
    { name: 'Spotify', category: 'International Partners' },
    { name: 'Apple Music', category: 'International Partners' },
    { name: 'Beatport', category: 'International Partners' },
    { name: 'Juno Download', category: 'International Partners' },
    { name: 'Napster', category: 'International Partners' },
    { name: 'Shazam', category: 'International Partners' },
    { name: 'Sony Music', category: 'International Partners' },
    { name: 'SoundCloud', category: 'International Partners' },
    { name: 'Tidal', category: 'International Partners' },
    { name: 'Deezer', category: 'International Partners' },
    { name: 'Dubset Media', category: 'International Partners' },
    { name: 'Instagram', category: 'International Partners' },
    { name: 'iTunes', category: 'International Partners' },
    { name: 'Juke', category: 'International Partners' },
    { name: 'Traxsource', category: 'International Partners' }
  ];

  // Handle cover art upload
  const handleCoverArtUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        alert('Please select a JPG or PNG image file');
        return;
      }

      // Check file dimensions
      const img = new Image();
      img.onload = function() {
        if (this.width < 3000 || this.height < 3000) {
          alert('Image must be at least 3000x3000 pixels');
          return;
        }
        
        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setFormData({
          ...formData,
          coverArt: file,
          coverArtPreview: previewUrl
        });
      };
      img.src = URL.createObjectURL(file);
    }
  };

  // Handle audio file upload
  const handleAudioUpload = (trackId, event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if it's an audio file
      if (!file.type.startsWith('audio/')) {
        alert('Please select an audio file');
        return;
      }

      const updatedTracks = formData.tracks.map(track => 
        track.id === trackId 
          ? { ...track, audioFile: file, audioFileName: file.name }
          : track
      );
      
      setFormData({
        ...formData,
        tracks: updatedTracks
      });
    }
  };

  // Handle track field changes
  const handleTrackFieldChange = (trackId, field, value) => {
    const updatedTracks = formData.tracks.map(track => 
      track.id === trackId 
        ? { ...track, [field]: value }
        : track
    );
    
    setFormData({
      ...formData,
      tracks: updatedTracks
    });
  };

  const addTrack = () => {
    const newTrack = { 
      id: generateUniqueId(),
      audioFile: null,
      audioFileName: '',
      songName: '',
      genre: '',
      singerName: '',
      composerName: '',
      lyricistName: '',
      producerName: '',
      isrc: '',
      previewCallTiming: '',
      language: ''
    };
   setFormData({
    ...formData,
    tracks: [...formData.tracks, newTrack]
  });
  };

  const removeTrack = (trackId) => {
    if (formData.tracks.length > 1) {
      setFormData({
      ...formData,
      tracks: formData.tracks.filter(track => track.id !== trackId)
    });
    }
  };

  const handleTerritoryChange = (territory, checked) => {
    let updatedTerritories;
    if (checked) {
      updatedTerritories = [...selectedTerritories, territory];
    } else {
      updatedTerritories = selectedTerritories.filter(t => t !== territory);
    }
    setSelectedTerritories(updatedTerritories);
    setFormData({ ...formData, territories: updatedTerritories });
  };

  const handlePartnerChange = (partner, checked) => {
    let updatedPartners;
    if (checked) {
      updatedPartners = [...selectedPartners, partner];
    } else {
      updatedPartners = selectedPartners.filter(p => p !== partner);
      setSelectAllPartners(false);
    }
    setSelectedPartners(updatedPartners);
    setFormData({ ...formData, partners: updatedPartners });
  };

  const handleSelectAllPartners = (checked) => {
    setSelectAllPartners(checked);
    if (checked) {
      const allPartnerNames = partners.map(p => p.name);
      setSelectedPartners(allPartnerNames);
      setFormData({ ...formData, partners: allPartnerNames });
    } else {
      setSelectedPartners([]);
      setFormData({ ...formData, partners: [] });
    }
  };

  const handleCopyrightOptionChange = (option) => {
    setCopyrightOption(option);
    setFormData({ ...formData, copyrightOption: option });
  };

  const handleCopyrightDocumentUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, copyrightDocument: file });
    }
  };

  const renderReleaseTypeSelection = () => (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div 
          className="relative border-2 border-dashed border-slate--600 rounded-lg p-12 hover:border-slate-500 transition-colors cursor-pointer group"
          onClick={() => setReleaseType('single')}
        >
          <div className="flex flex-col items-center justify-center text-center h-48">
            <div className="mb-6">
              <Plus className="w-12 h-12 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <h3 className="text-foreground text-xl font-medium mb-2">Select a Single track</h3>
            <p className="text-muted-foreground text-sm">Add a track from MV Catalog or Spotify</p>
          </div>
        </div>

        <div 
          className="relative border-2 border-dashed border-slate--600 rounded-lg p-12 hover:border-slate-500 transition-colors cursor-pointer group"
          onClick={() => setReleaseType('album')}
        >
          <div className="flex flex-col items-center justify-center text-center h-48">
            <div className="mb-6">
              <Plus className="w-12 h-12 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <h3 className="text-foreground text-xl font-medium mb-2">Select a Album track</h3>
            <p className="text-muted-foreground text-sm">Add a track from MV Catalog or Spotify</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Cover Art Section */}
        <Card className="lg:col-span-1 p-4">
          <div className="bg-muted/50 rounded-lg">
            <h3 className="text-foreground text-lg font-medium mb-6">Cover Art</h3>
            <div className="flex flex-col items-center">
              <div className="w-full h-[250px] bg-muted border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center mb-4 relative overflow-hidden">
                {formData.coverArtPreview ? (
                  <img 
                    src={formData.coverArtPreview} 
                    alt="Cover preview" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <div className='rounded-xl p-6 bg-muted-foreground/10 mb-4'>
                      <Music className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-foreground font-medium mb-1">Upload Cover Art</p>
                    <p className="text-muted-foreground text-sm mb-4">3000x3000px, JPG/PNG</p>
                  </>
                )}
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleCoverArtUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <Button variant="outline" size="sm" onClick={() => document.querySelector('input[type="file"]').click()}>
                Choose Image
              </Button>
            </div>
          </div>
        </Card>

        {/* Track Information Section */}
        <Card className="lg:col-span-3 p-4">
          <div className="bg-muted/50 rounded-lg">
            <h3 className="text-foreground text-lg font-medium mb-6">Cover Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="releaseName" className="text-foreground">Release Name</Label>
                <Input 
                  id="releaseName"
                  placeholder="Enter release name"
                  value={formData.releaseName}
                  onChange={(e) => setFormData({...formData, releaseName: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="genre" className="text-foreground">Genre</Label>
                <Select onValueChange={(value) => setFormData({...formData, genre: value})}>
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre.toLowerCase().replace(/\s+/g, '-')}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="upc" className="text-foreground">UPC</Label>
                <Input 
                  id="upc"
                  placeholder="Enter UPC code"
                  value={formData.upc}
                  onChange={(e) => setFormData({...formData, upc: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div className="">
                <Label htmlFor="labelName" className="text-foreground">Label name</Label>
                <Select onValueChange={(value) => setFormData({...formData, labelName: value})}>
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Select label" />
                  </SelectTrigger>
                  <SelectContent>
                    {labelNames.map((label) => (
                      <SelectItem key={label} value={label}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-6xl mx-auto space-y-8">
      {formData.tracks.map((track, index) => (
        <div key={track.id} className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Audio File Section */}
          <Card className="lg:col-span-1 p-4">
            <div className="bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-foreground text-lg font-medium">Audio File</h3>
                {releaseType === 'album' && formData.tracks.length > 1 && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeTrack(track.id)}
                    className="text-destructive hover:text-destructive"
                  >
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
                      <p className="text-foreground font-medium mb-4">Upload Audio File</p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => handleAudioUpload(track.id, e)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <Button variant="outline" size="sm">
                  Choose Audio
                </Button>
              </div>
            </div>
          </Card>

          {/* Track Information Section */}
          <Card className="lg:col-span-3 p-4">
            <div className="bg-muted/50 rounded-lg">
              <h3 className="text-foreground text-lg font-medium mb-6">Track Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-foreground">Song Name</Label>
                  <Input 
                    placeholder="Enter song name" 
                    className="mt-1" 
                    value={track.songName}
                    onChange={(e) => handleTrackFieldChange(track.id, 'songName', e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-foreground">Genre</Label>
                  <Select onValueChange={(value) => handleTrackFieldChange(track.id, 'genre', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {genres.map((genre) => (
                        <SelectItem key={genre} value={genre.toLowerCase().replace(/\s+/g, '-')}>
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-foreground">Singer Name</Label>
                  <Input 
                    placeholder="Enter singer name" 
                    className="mt-1" 
                    value={track.singerName}
                    onChange={(e) => handleTrackFieldChange(track.id, 'singerName', e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-foreground">Composer Name</Label>
                  <Input 
                    placeholder="Enter composer name" 
                    className="mt-1" 
                    value={track.composerName}
                    onChange={(e) => handleTrackFieldChange(track.id, 'composerName', e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-foreground">Lyricist Name</Label>
                  <Input 
                    placeholder="Enter lyricist name" 
                    className="mt-1" 
                    value={track.lyricistName}
                    onChange={(e) => handleTrackFieldChange(track.id, 'lyricistName', e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-foreground">Producer Name</Label>
                  <Input 
                    placeholder="Enter producer name" 
                    className="mt-1" 
                    value={track.producerName}
                    onChange={(e) => handleTrackFieldChange(track.id, 'producerName', e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-foreground">ISRC</Label>
                  <Input 
                    placeholder="Enter ISRC code" 
                    className="mt-1" 
                    value={track.isrc}
                    onChange={(e) => handleTrackFieldChange(track.id, 'isrc', e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-foreground">Preview/Call-tune timing</Label>
                  <Input 
                    placeholder="Enter timing (e.g., 0:30-1:00)" 
                    className="mt-1" 
                    value={track.previewCallTiming}
                    onChange={(e) => handleTrackFieldChange(track.id, 'previewCallTiming', e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-foreground">Language</Label>
                  <Select onValueChange={(value) => handleTrackFieldChange(track.id, 'language', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {languages.map((language) => (
                        <SelectItem key={language} value={language}>
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ))}

      {releaseType === 'album' && (
        <div className="flex justify-center">
          <Button onClick={addTrack} variant="outline" className="w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add More Tracks
          </Button>
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className=" mx-auto space-y-8">
      {/* Delivery Details */}
      <Card className="space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-foreground">For Future Release</Label>
            <div className=" space-x-2 mt-2 relative">
              <Input 
                type="date" 
                placeholder="mm/dd/yyyy" 
                className=" w-full  [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3  [&::-webkit-calendar-picker-indicator]:invert-0 dark:[&::-webkit-calendar-picker-indicator]:invert" 
                value={formData.forFutureRelease}
                onChange={(e) => setFormData({...formData, forFutureRelease: e.target.value})}
                min={(() => {
                  const today = new Date();
                  const oneWeekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
                  const year = oneWeekLater.getFullYear();
                  const month = String(oneWeekLater.getMonth() + 1).padStart(2, '0');
                  const day = String(oneWeekLater.getDate()).padStart(2, '0');
                  return `${year}-${month}-${day}`;
                })()}
              />
            </div>
          </div>
          <div>
            <Label className="text-foreground">For Preorder/Pre-save release</Label>
            <div className=" space-x-2 mt-2 relative">
              <Input 
                type="date" 
                placeholder="mm/dd/yyyy" 
                className=" w-full  [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3  [&::-webkit-calendar-picker-indicator]:invert-0 dark:[&::-webkit-calendar-picker-indicator]:invert" 
                value={formData.forPreorderPreSave}
                onChange={(e) => setFormData({...formData, forPreorderPreSave: e.target.value})}
                 max={(() => {
                  const today = new Date();
                  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
                  const year = yesterday.getFullYear();
                  const month = String(yesterday.getMonth() + 1).padStart(2, '0');
                  const day = String(yesterday.getDate()).padStart(2, '0');
                  return `${year}-${month}-${day}`;
              })()}
              />
            </div>
          </div>
        </div>

        {/* Territory Rights */}
        <div>
          <h4 className="text-foreground font-medium mb-4">Territory Rights :</h4>
          <div className="space-y-4">
            <div>
              <Label className="text-foreground font-medium">World Wide Release</Label>
              <RadioGroup 
                value={worldWideRelease} 
                onValueChange={(value) => {
                  setWorldWideRelease(value);
                  setFormData({...formData, worldWideRelease: value});
                }}
                className="flex space-x-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {worldWideRelease === 'no' && (
              <Card className="p-6 border border-muted bg-background rounded-lg">
                <Label className="text-foreground">Select The Territories, Where you own the rights</Label>
                <div className="grid grid-cols-3 gap-4 mt-4 max-h-60 overflow-y-auto custom-scroll">
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

        {/* Partner Selection */}
        <div>
          <h4 className="text-foreground font-medium mb-4">Partner Selection :</h4>
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox 
              id="selectAll"
              checked={selectAllPartners}
              onCheckedChange={handleSelectAllPartners}
            />
            <Label htmlFor="selectAll" className="font-medium">Select All Partners</Label>
          </div>

          <Card className="p-6 border border-muted bg-background rounded-lg">
            <Label className="text-primary font-medium">International Partners</Label>
            <div className="grid grid-cols-3 gap-4 mt-4 ">
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

        {/* Copyright Options */}
        <div className="space-y-4">
          <h4 className="text-foreground font-medium mb-4">Copyright Options :</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="proceedWithout"
                checked={copyrightOption === 'proceed'}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleCopyrightOptionChange('proceed');
                  } else if (copyrightOption === 'proceed') {
                    handleCopyrightOptionChange('');
                  }
                }}
              />
              <Label htmlFor="proceedWithout">Proceed without Uploading the Copyright Documents</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="ownCopyright"
                checked={copyrightOption === 'upload'}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleCopyrightOptionChange('upload');
                  } else if (copyrightOption === 'upload') {
                    handleCopyrightOptionChange('');
                  }
                }}
              />
              <Label htmlFor="ownCopyright">I own the Copyrights Will Upload</Label>
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
                  onChange={handleCopyrightDocumentUpload}
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
    if (!releaseType) return renderReleaseTypeSelection();
    
    switch (currentStep) {
      case 0:
        return renderStep1();
      case 1:
        return renderStep2();
      case 2:
        return renderStep3();
      default:
        return renderStep1();
    }
  };

  const getStepTitle = () => {
    if (!releaseType) return '';
    switch (currentStep) {
      case 0: return 'Cover Art & Cover Information';
      case 1: return 'Audio File & Track Details';
      case 2: return 'Delivery Details';
      default: return '';
    }
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    console.log('Tracks:', formData.tracks);
    console.log('Selected Territories:', selectedTerritories);
    console.log('Selected Partners:', selectedPartners);
    console.log('Copyright Option:', copyrightOption);
    // Add your submit logic here
  };

  const goBack = () => {
    // Navigate back to upload release page
    console.log('Navigate back to /app/upload-release');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/app/upload-release')} 
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-foreground text-3xl font-semibold">Upload Release</h1>
              <p className="text-muted-foreground text-sm">Basic Release Builder</p>
            </div>
          </div>
        </div>

        {/* Step Title */}
        {releaseType && (
          <div className=" mb-8">
            <h2 className="text-foreground text-xl font-medium">{getStepTitle()}</h2>
          </div>
        )}

        {/* Main Content */}
        <div className="mb-12">
          {renderStepContent()}
        </div>

        {/* Step Navigation */}
        {releaseType && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {[0, 1, 2].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === currentStep 
                      ? 'bg-primary text-primary-foreground' 
                      : step < currentStep 
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {step + 1}
                  </div>
                  <span className={`ml-2 text-sm ${
                    step === currentStep ? 'text-primary font-medium' : 'text-muted-foreground'
                  }`}>
                    Step {step + 1}
                  </span>
                  {step < 2 && <div className="w-8 h-px bg-muted mx-4"></div>}
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              {currentStep > 0 && (
                <Button 
                  variant="ghost"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              )}
              <Button 
                onClick={() => {
                  if (currentStep < 2) {
                    setCurrentStep(currentStep + 1);
                  } else {
                    handleSubmit();
                  }
                }}
                className="bg-primary text-primary-foreground"
              >
                {currentStep === 2 ? 'Submit' : 'Next Step'}
                {currentStep < 2 && <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicReleaseBuilder;