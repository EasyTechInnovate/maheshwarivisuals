import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ArrowLeft, Upload } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function YouTubeMCNRequest() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    channelName: "",
    channelLink: "",
    subscribers: "",
    totalViews: "",
    monetization: "",
    strikes: "",
    originalContent: "",
    adsense: "",
    otherMCN: "",
    otherMCNName: "",
    revenueLastMonth: "",
    analyticsFile: null,
    revenueFile: null,
    legalOwner: false,
    agreeTerms: false,
    ownershipTransfer: false,
    contactConsent: false,
  })

  const [dragActive, setDragActive] = useState({ analytics: false, revenue: false })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckbox = (e) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleDrag = (e, fileType) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(prev => ({ ...prev, [fileType]: true }))
    } else if (e.type === "dragleave") {
      setDragActive(prev => ({ ...prev, [fileType]: false }))
    }
  }

  const handleDrop = (e, fileType) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(prev => ({ ...prev, [fileType]: false }))
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setFormData(prev => ({ ...prev, [`${fileType}File`]: file }))
    }
  }

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, [`${fileType}File`]: file }))
    }
  }

  const handleSubmit = () => {
    console.log("Form data:", formData)
    // Later: Call API with formData
  }

  const FileUploadArea = ({ fileType, label, file }) => (
    <div className="space-y-2 p-4 rounded-lg border">
      <label className="flex items-center gap-2 text-sm font-medium text-white">
        <Upload className="w-4 h-4" />
        {label}
      </label>
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive[fileType] 
            ? 'border-purple-400 bg-purple-400/10' 
            : 'border-gray-600 hover:border-gray-500'
        }`}
        onDragEnter={(e) => handleDrag(e, fileType)}
        onDragLeave={(e) => handleDrag(e, fileType)}
        onDragOver={(e) => handleDrag(e, fileType)}
        onDrop={(e) => handleDrop(e, fileType)}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-300 mb-2">
          {file ? file.name : "Drop your audio file here"}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Supports MP3, WAV, FLAC (Max 100MB)
        </p>
        <input
          type="file"
          accept=".mp3,.wav,.flac,.png,.jpg,.jpeg,.pdf"
          onChange={(e) => handleFileChange(e, fileType)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <Button
          type="button"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2"
          onClick={() => {
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = '.mp3,.wav,.flac,.png,.jpg,.jpeg,.pdf'
            input.onchange = (e) => handleFileChange(e, fileType)
            input.click()
          }}
        >
          Choose File
        </Button>
      </div>
    </div>
  )

  const allTermsAccepted = formData.legalOwner && formData.agreeTerms && formData.ownershipTransfer && formData.contactConsent

  return (
    <div className="min-h-screen   p-4">
      {/* Back Button */}
      <div className="flex items-center gap-3 mb-6">
        <Button 
          variant="outline" 
          className="mt-2 border-gray-600  hover:bg-gray-800" 
          size="icon" 
          onClick={()=> navigate('/user/youtube-mcn')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold">New Request</h1>
      </div>

      {/* Section 1: Basic Information */}
      <Card className="mb-6 ">
        <CardHeader>
          <CardTitle >Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-1 ">YouTube Channel Name</label>
            <input
              type="text"
              name="channelName"
              value={formData.channelName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-600 rounded-md "
            />
          </div>

          <div>
            <label className="block text-sm mb-1 ">YouTube Channel Link</label>
            <input
              type="url"
              name="channelLink"
              value={formData.channelLink}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-600 rounded-md "
            />
          </div>

          <div>
            <label className="block text-sm mb-1 ">Subscribers Count</label>
            <input
              type="number"
              name="subscribers"
              value={formData.subscribers}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-600 rounded-md "
            />
          </div>

          <div>
            <label className="block text-sm mb-1 ">Total Views (last 28 days)</label>
            <input
              type="number"
              name="totalViews"
              value={formData.totalViews}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-600 rounded-md "
            />
          </div>

          <div>
            <label className="block text-sm mb-1 ">Monetization Eligibility</label>
            <select
              name="monetization"
              value={formData.monetization}
              onChange={handleChange}
              className="w-full px-3 py-2 border bg-muted border-slate-600 rounded-md "
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 ">Is AdSense Enabled?</label>
            <select
              name="adsense"
              value={formData.adsense}
              onChange={handleChange}
              className="w-full px-3 py-2 border bg-muted border-slate-600 rounded-md "
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 ">Have you received any copyright strikes?</label>
            <select
              name="strikes"
              value={formData.strikes}
              onChange={handleChange}
              className="w-full px-3 py-2 border bg-muted border-slate-600 rounded-md "
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 ">Is your content 100% original/licensed?</label>
            <select
              name="originalContent"
              value={formData.originalContent}
              onChange={handleChange}
              className="w-full px-3 py-2 border bg-muted border-slate-600 rounded-md "
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 ">Are you part of another MCN currently?</label>
            <select
              name="otherMCN"
              value={formData.otherMCN}
              onChange={handleChange}
              className="w-full px-3 py-2 border bg-muted border-slate-600 rounded-md "
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {formData.otherMCN === "Yes" && (
            <div>
              <label className="block text-sm mb-1 ">If Yes, Name</label>
              <input
                type="text"
                name="otherMCNName"
                value={formData.otherMCNName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-600 rounded-md "
              />
            </div>
          )}

          <div>
            <label className="block text-sm mb-1 ">Channel Revenue (Last Month)</label>
            <select
              name="revenueLastMonth"
              value={formData.revenueLastMonth}
              onChange={handleChange}
              className="w-full px-3 py-2 border bg-muted border-slate-600 rounded-md "
            >
              <option value="">Select</option>
              <option value="0-100">$0 - $100</option>
              <option value="100-500">$100 - $500</option>
              <option value="500-1000">$500 - $1000</option>
              <option value="1000+">$1000+</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Supporting Materials */}
      <Card className="mb-6">
        <CardHeader>
        <CardTitle className="text-xl font-bold  text-white">Supporting Materials</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUploadArea
            fileType="analytics"
            label="Upload Channel Analytics Screenshot (Last 30 Days)"
            file={formData.analyticsFile}
          />
          <FileUploadArea
            fileType="revenue"
            label="Upload Channel Analytics Screenshot (Last 30 Days)"
            file={formData.revenueFile}
          />
        </CardContent>
      </Card>

      {/* Section 3: Terms & Declaration */}
      <Card className="mb-6 p-6">
        <h2 className="text-xl font-bold  text-white">Terms & Declaration</h2>
        <CardContent className="p-0 mb-4 ">
          <h3 className=" font-semibold mb-4">Project Suitability</h3>
          <div className="space-y-4">
            <label className="flex items-start gap-3 text-sm text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                name="legalOwner"
                checked={formData.legalOwner}
                onChange={handleCheckbox}
                className="w-4 h-4 mt-0.5 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
              />
              <span>I confirm that I am the legal owner of the YouTube channel listed above.</span>
            </label>

            <label className="flex items-start gap-3 text-sm text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleCheckbox}
                className="w-4 h-4 mt-0.5 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
              />
              <span>I agree to MV's MCN terms and revenue share model (to be discussed upon approval).</span>
            </label>

            <label className="flex items-start gap-3 text-sm text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                name="ownershipTransfer"
                checked={formData.ownershipTransfer}
                onChange={handleCheckbox}
                className="w-4 h-4 mt-0.5 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
              />
              <span>I understand that joining the MCN does not transfer ownership of my content.</span>
            </label>

            <label className="flex items-start gap-3 text-sm text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                name="contactConsent"
                checked={formData.contactConsent}
                onChange={handleCheckbox}
                className="w-4 h-4 mt-0.5 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
              />
              <span>I consent to MV contacting me regarding this application.</span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="mt-8">
        <Button 
          onClick={handleSubmit} 
          disabled={!allTermsAccepted}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-medium disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Apply
        </Button>
      </div>
    </div>
  )
}   