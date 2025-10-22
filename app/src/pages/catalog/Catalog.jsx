import React, { useState } from 'react'
import { Search, Music, Play, BarChart3, Eye, Download, MoreHorizontal, Edit, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

// Mock data (you would import this from catalog.config.js)
const catalogStats = {
    totalReleases: 24,
    liveReleases: 18,
    totalStreams: '2.4M',
    totalRevenue: '₹48K'
}

const mockReleases = [
    {
        id: 'REL001',
        name: 'Bollywood Hits 2024',
        artist: 'Various Artists',
        status: 'Published',
        requestStatus: 'Published',
        tracks: 12,
        releaseDate: '1/15/2024',
        releaseInfo: {
            releaseName: 'Bollywood Hits 2024',
            genre: 'Bollywood',
            upc: '123456789012',
            labelName: 'Bollywood Records'
        },
        trackInfo: {
            songName: 'Main Title Song',
            genre: 'Bollywood',
            singerName: 'Arijit Singh',
            composerName: 'A.R. Rahman',
            lyricsName: 'Gulzar',
            producerName: 'Yash Raj Films',
            isrc: 'INXXX2400005',
            previousRelease: 'No',
            trackOption: 'New Release'
        },
        stores: 'Selected Platforms'
    },
    {
        id: 'REL006',
        name: 'Urban Beats',
        artist: 'City Rapper',
        status: 'Under Review',
        requestStatus: 'Under Review',
        tracks: 12,
        releaseDate: '1/5/2024',
        releaseInfo: {
            releaseName: 'Urban Beats',
            genre: 'Hip Hop',
            upc: '123456789017',
            labelName: 'Urban Music'
        },
        trackInfo: {
            songName: 'City Life',
            genre: 'Hip Hop',
            singerName: 'City Rapper',
            composerName: 'City Rapper',
            lyricsName: 'City Rapper',
            producerName: 'Urban Productions',
            isrc: 'INXXX2400006',
            previousRelease: 'No',
            trackOption: 'New Release'
        },
        stores: 'All Platforms'
    },
    {
        id: 'REL007',
        name: 'Classical Symphony',
        artist: 'Orchestra Master',
        status: 'Live',
        requestStatus: 'Live',
        tracks: 15,
        releaseDate: '12/20/2023',
        releaseInfo: {
            releaseName: 'Classical Symphony',
            genre: 'Classical',
            upc: '123456789018',
            labelName: 'Symphony Records'
        },
        trackInfo: {
            songName: 'Symphony No. 1',
            genre: 'Classical',
            singerName: 'Orchestra Master',
            composerName: 'Orchestra Master',
            lyricsName: 'Instrumental',
            producerName: 'Classical Productions',
            isrc: 'INXXX2400007',
            previousRelease: 'No',
            trackOption: 'New Release'
        },
        stores: 'Classical Platforms'
    }
]

const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'published':
            case 'live':
                return 'bg-green-500/10 text-green-500 border-green-500/20'
            case 'under review':
                return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
            case 'processing':
                return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
            case 'draft':
                return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
            default:
                return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
        }
    }

    return <Badge className={`${getStatusColor(status)} border`}>{status}</Badge>
}

const ReleaseDetailsModal = ({ release, isOpen, onClose }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({})

    // Initialize form data when release changes
    React.useEffect(() => {
        if (release) {
            setFormData(release)
        }
    }, [release])

    const handleInputChange = (section, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }))
    }

    const handleDirectChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSave = () => {
        console.log('Saving form data:', formData)
        setIsEditing(false)
        // Here you would implement the API call to save the data
    }

    const handleCancel = () => {
        setFormData(release)
        setIsEditing(false)
    }

    if (!release) return null

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}>
            <DialogContent className="max-lg:min-w-[90vw] min-w-[80vw]  max-w-7xl max-h-[90vh] overflow-y-auto custom-scroll">
                <DialogHeader className="flex flex-row items-center justify-between">
                    <DialogTitle>Release Details</DialogTitle>
                    <div className="flex gap-2 mr-10">
                        {!isEditing ? (
                            <Button
                                onClick={() => setIsEditing(true)}
                                variant="outline"
                                size="sm">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </Button>
                        ) : (
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleSave}
                                    size="sm"
                                    className="bg-primary">
                                    Save
                                </Button>
                                <Button
                                    onClick={handleCancel}
                                    variant="outline"
                                    size="sm">
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </div>
                </DialogHeader>

                <div className="space-y-6 ">
                    {/* Track Information Section */}

                    <div className="space-y-6">
                        {/* Cover Art Upload */}
                        <div className="md:flex gap-4 max-md:space-y-6">
                            <Card className=" p-6">
                                <CardHeader className="p-0">
                                    <CardTitle>Cover Art</CardTitle>
                                </CardHeader>
                                <div className=" border-2 border-dashed border-muted-foreground rounded-lg flex flex-col p-6 gap-2 items-center justify-center">
                                    <Music className="w-18 h-18 text-muted-foreground bg-muted/50 p-4 rounded-lg" />
                                    <div className="mt-2 space-y-3">
                                        <h1 className="font-semibold">Upload Cover Art</h1>
                                        <p className="text-xs text-muted-foreground text-center">300x300px, JPG/PNG</p>
                                        <Button
                                            disabled={!isEditing}
                                            variant="outline"
                                            size="sm"
                                            className="w-full">
                                            <Upload className="w-4 h-4 mr-2" />
                                            Edit Image
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                            {/* Form Fields */}
                            <Card className="flex-1   p-6">
                                <CardHeader className="p-0">
                                    <CardTitle>Track Information</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4 p-0">
                                    <div>
                                        <Label>Release Name</Label>
                                        <Input
                                            value={formData.releaseInfo?.releaseName || ''}
                                            onChange={(e) => handleInputChange('releaseInfo', 'releaseName', e.target.value)}
                                            disabled={!isEditing}
                                            placeholder="Enter release name"
                                        />
                                    </div>
                                    <div>
                                        <Label>Artist Name</Label>
                                        <Input
                                            value={formData.artist || ''}
                                            onChange={(e) => handleDirectChange('artist', e.target.value)}
                                            disabled={!isEditing}
                                            placeholder="Enter artist name"
                                        />
                                    </div>
                                    <div>
                                        <Label>Song Name</Label>
                                        <Input
                                            value={formData.trackInfo?.songName || ''}
                                            onChange={(e) => handleInputChange('trackInfo', 'songName', e.target.value)}
                                            disabled={!isEditing}
                                            placeholder="Enter song name"
                                        />
                                    </div>
                                    <div>
                                        <Label>Genre</Label>
                                        <Select
                                            value={formData.releaseInfo?.genre || ''}
                                            onValueChange={(value) => handleInputChange('releaseInfo', 'genre', value)}
                                            disabled={!isEditing}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select genre" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Bollywood">Bollywood</SelectItem>
                                                <SelectItem value="Classical">Classical</SelectItem>
                                                <SelectItem value="Folk">Folk</SelectItem>
                                                <SelectItem value="Pop">Pop</SelectItem>
                                                <SelectItem value="Hip Hop">Hip Hop</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className="space-y-6">
                        {/* Cover Art Upload */}
                        <div className="md:flex gap-4 max-md:space-y-6">
                            <Card className=" p-6">
                                <CardHeader className="p-0">
                                    <CardTitle>Audio file</CardTitle>
                                </CardHeader>
                                <div className=" border-2 border-dashed border-muted-foreground rounded-lg flex flex-col p-6 gap-2 items-center justify-center">
                                    <Music className="w-18 h-18 text-muted-foreground bg-muted/50 p-4 rounded-lg" />
                                    <div className="mt-2 space-y-3">
                                        <h1 className="font-semibold">Upload Audio File</h1>
                                        <Button
                                            disabled={!isEditing}
                                            variant="outline"
                                            size="sm"
                                            className="w-full">
                                            <Upload className="w-4 h-4 mr-2" />
                                            Edit Audio
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                            {/* Form Fields */}
                            <Card className="flex-1   p-6">
                                <CardHeader className="p-0">
                                    <CardTitle>Track Information</CardTitle>
                                </CardHeader>
                                <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div>
                                        <Label>Singer Name</Label>
                                        <Input
                                            value={formData.trackInfo?.singerName || ''}
                                            onChange={(e) => handleInputChange('trackInfo', 'singerName', e.target.value)}
                                            disabled={!isEditing}
                                            placeholder="Enter singer name"
                                        />
                                    </div>
                                    <div>
                                        <Label>Composer Name</Label>
                                        <Input
                                            value={formData.trackInfo?.composerName || ''}
                                            onChange={(e) => handleInputChange('trackInfo', 'composerName', e.target.value)}
                                            disabled={!isEditing}
                                            placeholder="Enter composer name"
                                        />
                                    </div>
                                    <div>
                                        <Label>Lyricist Name</Label>
                                        <Input
                                            value={formData.trackInfo?.lyricsName || ''}
                                            onChange={(e) => handleInputChange('trackInfo', 'lyricsName', e.target.value)}
                                            disabled={!isEditing}
                                            placeholder="Enter lyricist name"
                                        />
                                    </div>
                                    <div>
                                        <Label>Producer Name</Label>
                                        <Input
                                            value={formData.trackInfo?.producerName || ''}
                                            onChange={(e) => handleInputChange('trackInfo', 'producerName', e.target.value)}
                                            disabled={!isEditing}
                                            placeholder="Enter producer name"
                                        />
                                    </div>
                                    <div>
                                        <Label>Label Name</Label>
                                        <Input
                                            value={formData.releaseInfo?.labelName || ''}
                                            onChange={(e) => handleInputChange('releaseInfo', 'labelName', e.target.value)}
                                            disabled={!isEditing}
                                            placeholder="Enter label name"
                                        />
                                    </div>
                                    <div>
                                        <Label>ISRC</Label>
                                        <Input
                                            value={formData.trackInfo?.isrc || ''}
                                            onChange={(e) => handleInputChange('trackInfo', 'isrc', e.target.value)}
                                            disabled={!isEditing}
                                            placeholder="Enter ISRC"
                                        />
                                    </div>
                                    <div>
                                        <Label>UPC</Label>
                                        <Input
                                            value={formData.releaseInfo?.upc || ''}
                                            onChange={(e) => handleInputChange('releaseInfo', 'upc', e.target.value)}
                                            disabled={!isEditing}
                                            placeholder="Enter UPC"
                                        />
                                    </div>
                                    <div>
                                        <Label>Previous Release</Label>
                                        <Select
                                            value={formData.trackInfo?.previousRelease || ''}
                                            onValueChange={(value) => handleInputChange('trackInfo', 'previousRelease', value)}
                                            disabled={!isEditing}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select option" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Yes">Yes</SelectItem>
                                                <SelectItem value="No">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Track Option</Label>
                                        <Select
                                            value={formData.trackInfo?.trackOption || ''}
                                            onValueChange={(value) => handleInputChange('trackInfo', 'trackOption', value)}
                                            disabled={!isEditing}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select track option" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="New Release">New Release</SelectItem>
                                                <SelectItem value="Re-Release">Re-Release</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Release Details Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Step 3</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                <div>
                                    <Label>Release Date</Label>
                                    <Input
                                        type="date"
                                        value={formData.releaseDate ? new Date(formData.releaseDate).toISOString().split('T')[0] : ''}
                                        onChange={(e) => handleDirectChange('releaseDate', e.target.value)}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div>
                                    <Label>Stores</Label>
                                    <Input
                                        value={formData.stores || ''}
                                        onChange={(e) => handleDirectChange('stores', e.target.value)}
                                        disabled={!isEditing}
                                        placeholder="Enter stores"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </DialogContent>
        </Dialog>
    )
}

const CatalogPage = () => {
    const [activeTab, setActiveTab] = useState('your-release')
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedRelease, setSelectedRelease] = useState(null)
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

    const publishedReleases = mockReleases.filter((release) => release.status === 'Published' || release.status === 'Live')

    const draftReleases = mockReleases.filter(
        (release) => release.status === 'Draft' || release.status === 'Under Review' || release.status === 'Processing'
    )

    const currentReleases = activeTab === 'your-release' ? publishedReleases : draftReleases

    const filteredReleases = currentReleases.filter(
        (release) => release.name.toLowerCase().includes(searchTerm.toLowerCase()) || release.artist.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleViewDetails = (release) => {
        setSelectedRelease(release)
        setIsDetailModalOpen(true)
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Catalog</h1>
                    <p className="text-muted-foreground mt-1">Manage all your releases and track their performance</p>
                </div>
                <Button className="bg-[#711CE9] text-white hover:bg-[#711CE9]/90">
                    <Music className="w-4 h-4 mr-2" />
                    New Release
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className='p-0'>
                    <CardContent className="p-6 ">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm">Total Releases</p>
                                <p className="text-2xl font-bold">{catalogStats.totalReleases}</p>
                            </div>
                            <Music className="w-8 h-8 text-muted-foreground" />
                        </div>
                    </CardContent>
                </Card>

                <Card className='p-0'>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm">Live Releases</p>
                                <p className="text-2xl font-bold">{catalogStats.liveReleases}</p>
                            </div>
                            <div className="flex items-center bg-green-200/10 p-2 rounded-full ">
                                <div className="w-2 h-2 bg-green-500  rounded-full "></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className='p-0'>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm">Total Streams</p>
                                <p className="text-2xl font-bold">{catalogStats.totalStreams}</p>
                            </div>
                            <Play className="w-8 h-8 text-muted-foreground" />
                        </div>
                    </CardContent>
                </Card>

                <Card className='p-0'>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm">Total Revenue</p>
                                <p className="text-2xl font-bold">{catalogStats.totalRevenue}</p>
                            </div>
                            <BarChart3 className="w-8 h-8 text-muted-foreground" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        placeholder="Search releases..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select defaultValue="newest-first">
                    <SelectTrigger className="w-48">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest-first">Newest First</SelectItem>
                        <SelectItem value="oldest-first">Oldest First</SelectItem>
                        <SelectItem value="alphabetical">Alphabetical</SelectItem>
                    </SelectContent>
                </Select>
                <Select defaultValue="all-status">
                    <SelectTrigger className="w-48">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all-status">All Status</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="under-review">Under Review</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-1 mb-6">
                <Button
                    variant={activeTab === 'your-release' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('your-release')}
                    className={`px-6 py-2 rounded-lg ${activeTab === 'your-release' ? '' : 'hover:bg-secondary/50'}`}>
                    Your Release
                </Button>
                <Button
                    variant={activeTab === 'draft-release' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('draft-release')}
                    className={`px-6 py-2 rounded-lg ${activeTab === 'draft-release' ? '' : 'hover:bg-secondary/50'}`}>
                    Draft Release
                </Button>
            </div>

            {/* Releases Section */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>
                    {activeTab === "your-release" ? "Your Releases" : "Draft Releases"}
                    </CardTitle>
                    <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        Export All
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                    </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="overflow-x-auto">
                    {activeTab === "your-release" ? (
                        // -------- Your Releases Table (detailed) --------
                        <table className="min-w-full text-sm text-left border-collapse">
                        <thead className="border-b text-muted-foreground">
                            <tr className='whitespace-nowrap'>
                            <th className="px-4 py-2">Release ID</th>
                            <th className="px-4 py-2">Release Name</th>
                            <th className="px-4 py-2">Artist</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Request Status</th>
                            <th className="px-4 py-2">Tracks</th>
                            <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReleases.map((release) => (
                            <tr key={release.id} className="hover:bg-secondary/50 whitespace-nowrap">
                                <td className="px-4 py-3">{release.id}</td>
                                <td className="px-4 py-3 truncate max-w-[200px]" title={release.name}>{release.name}</td>
                                <td className="px-4 py-3 truncate max-w-[100px]" title={release.artist}>{release.artist}</td>
                                <td className="px-4 py-3">
                                <StatusBadge status={release.status} />
                                </td>
                                <td className="px-4 py-3">
                                <StatusBadge status={release.requestStatus} />
                                </td>
                                <td className="px-4 py-3">{release.tracks} tracks</td>
                                <td className="px-4 py-3 flex gap-2">
                                <Button
                                    onClick={() => handleViewDetails(release)}
                                    size="sm"
                                    className="bg-[#711CE9] text-white hover:bg-[#711CE9]/90 "
                                >
                                    <Eye className="w-4 h-4 mr-1" />
                                    View Details
                                </Button>
                                <Button size="sm" className='bg-[#711CE9] text-white hover:bg-[#711CE9]/90'>
                                    <Download className="w-4 h-4 mr-1" />
                                    Download
                                </Button>
                                <Button size="sm" variant="ghost">
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                                </td>
                            </tr>
                            ))}
                            {filteredReleases.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-12">
                                <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground">No releases found</p>
                                </td>
                            </tr>
                            )}
                        </tbody>
                        </table>
                    ) : (
                        // -------- Draft Releases Table (simpler) --------
                        <table className="min-w-full text-sm text-left border-collapse">
                        <thead className="border-b text-muted-foreground">
                            <tr>
                            <th className="px-4 py-2">Release</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2 whitespace-nowrap">Release Date</th>
                            <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReleases.map((release) => (
                            <tr key={release.id} className="hover:bg-secondary/50">
                                <td className="px-4 py-3 flex items-center whitespace-nowrap gap-3">
                                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                                    <Music className="w-6 h-6 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="font-medium">{release.name}</p>
                                    <p className="text-muted-foreground text-sm">{release.artist}</p>
                                </div>
                                </td>
                                <td className="px-4 py-3">
                                <StatusBadge status={release.status} />
                                </td>
                                <td className="px-4 py-3">{release.releaseDate}</td>
                                <td className="px-4 py-3 flex gap-2">
                                <Button
                                    onClick={() => handleViewDetails(release)}
                                    size="sm"
                                    className="bg-[#711CE9] text-white hover:bg-[#711CE9]/90"
                                >
                                    <Eye className="w-4 h-4 mr-1" />
                                    View Details
                                </Button>
                                <Button size="sm" className='bg-[#711CE9] text-white hover:bg-[#711CE9]/90'>
                                    <Download className="w-4 h-4 mr-1" />
                                    Download
                                </Button>
                                <Button size="sm" variant="ghost">
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                                </td>
                            </tr>
                            ))}
                            {filteredReleases.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-12">
                                <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground">No draft releases found</p>
                                </td>
                            </tr>
                            )}
                        </tbody>
                        </table>
                    )}
                    </div>
                </CardContent>
            </Card>

            {/* Release Details Modal */}
            <ReleaseDetailsModal
                release={selectedRelease}
                isOpen={isDetailModalOpen}
                onClose={() => {
                    setIsDetailModalOpen(false)
                    setSelectedRelease(null)
                }}
            />
        </div>
    )
}

export default CatalogPage
