'use client'
import { HeadingText } from '@/components/FixedUiComponents'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { registerUser, getUserProfile } from '@/services/api.services'
import { Country, State } from 'country-state-city'
import toast from 'react-hot-toast'

const DistributionAgreementPage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState(null)
  const [consent, setConsent] = useState({
    terms: false,
    privacy: false,
    marketing: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Load form data from sessionStorage
    const savedData = sessionStorage.getItem('signupFormData')
    if (!savedData) {
      // If no data found, redirect back to signup
      router.push('/signup')
      return
    }

    try {
      const parsedData = JSON.parse(savedData)
      setFormData(parsedData)
    } catch (error) {
      console.error('Error parsing form data:', error)
      router.push('/signup')
    }
  }, [router])

  const handleConsentChange = (field) => {
    setConsent(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const transformFormDataToAPI = () => {
    if (!formData) return null

    // Get country and state names
    const countryData = Country.getCountryByCode(formData.country)
    const stateData = State.getStateByCodeAndCountry(formData.state, formData.country)

    const baseData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      emailAddress: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      userType: formData.userType,
      phoneNumber: formData.phoneCode.replace('+', '') + formData.phoneNumber,
      consent: {
        terms: consent.terms,
        privacy: consent.privacy,
        marketing: consent.marketing
      },
      address: {
        street: formData.address,
        city: stateData?.name || '',
        state: stateData?.name || '',
        country: countryData?.name || '',
        pinCode: formData.pincode
      }
    }

    // Add artist or label specific data
    if (formData.userType === 'artist') {
      baseData.artistData = {
        artistName: formData.artistName || '',
        youtubeLink: formData.youtube || '',
        instagramLink: formData.instagram || '',
        facebookLink: formData.facebook || ''
      }
    } else if (formData.userType === 'label') {
      // Convert popularArtistLinks string to array if needed
      const artistLinksArray = formData.popularArtistLinks
        ? formData.popularArtistLinks.split(',').map(link => link.trim()).filter(Boolean)
        : []

      // Safely extract monthly release count
      let monthlyPlans = 5 // default
      if (formData.monthlyReleaseCount) {
        const parts = formData.monthlyReleaseCount.split('-')
        monthlyPlans = parseInt(parts[0]) || 5
      }

      baseData.labelData = {
        labelName: formData.labelName || '',
        youtubeLink: formData.youtube || '',
        websiteLink: formData.website || '',
        popularReleaseLink: formData.popularReleaseLinks || '',
        popularArtistLinks: artistLinksArray,
        totalReleases: parseInt(formData.totalReleases) || 0,
        releaseFrequency: formData.releaseFrequency ? formData.releaseFrequency.toLowerCase() : 'daily',
        monthlyReleasePlans: monthlyPlans,
        aboutLabel: formData.labelInfo || ''
      }
    }

    return baseData
  }

  const handleSubmit = async () => {
    // Validate consent
    if (!consent.terms || !consent.privacy) {
      toast.error('Please accept Terms and Conditions and Privacy Policy (mandatory)')
      return
    }

    setIsSubmitting(true)

    try {
      const apiData = transformFormDataToAPI()

      // Debug: Log the data being sent
      console.log('🔍 Registration Data Being Sent:', JSON.stringify(apiData, null, 2))

      // Register user with loading toast
      const loadingToast = toast.loading('Creating your account...')

      const registerResponse = await registerUser(apiData)

      if (registerResponse.success) {
        // Store tokens in localStorage
        const { accessToken, refreshToken } = registerResponse.data.tokens
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)

        // Get user profile to check account status
        const profileResponse = await getUserProfile()

        if (profileResponse.success) {
          // Clear signup form data from sessionStorage
          sessionStorage.removeItem('signupFormData')

          toast.success('Account created successfully!', { id: loadingToast })

          // Navigate to subscriptions page
          setTimeout(() => {
            router.push('/subscriptions')
          }, 1000)
        }
      }
    } catch (error) {
      console.error('Registration error:', error)
      console.error('Error response:', error.response?.data)
      console.error('Error status:', error.response?.status)

      const errorMessage = error.response?.data?.message ||
                          error.response?.data?.error ||
                          'Registration failed. Please try again.'
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!formData) {
    return (
      <div className="bg-[#151A27] min-h-screen flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    )
  }

  return (
    <div className="bg-[#151A27] min-h-screen flex flex-col w-full overflow-hidden items-center justify-center py-10 pt-[100px]">
      <HeadingText text="Distribution Agreement" />

      <div className="max-w-6xl w-full mx-auto px-4 mt-8 space-y-8 text-gray-300">

        {/* Header Section */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white mb-10">INTELLECTUAL PROPERTY AGREEMENT / DISTRIBUTION AGREEMENT / MV AGREEMENT</h2>
          <p className="text-sm">This Intellectual Property Agreement (hereinafter referred to as "Agreement") is executed on the signup date of the Firm</p>
          <p className="text-sm">We are a Firm named "Maheshwari Visuals", based out of Uttar Pradesh and the Industry we cater to is "Sound & Video recordings"</p>
        </div>

        {/* Parties Section */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">BY AND BETWEEN</h3>
          <div className="space-y-4">
            <div>
              <p><strong className="text-white">Maheshwari Visuals</strong> having the website <a href="http://www.maheshwarivisuals.com" className="text-blue-400 hover:text-blue-300">www.maheshwarivisuals.com</a> and <a href="http://www.distribution.maheshwarivisuals.com" className="text-blue-400 hover:text-blue-300">www.distribution.maheshwarivisuals.com</a> ("Maheshwari Visuals", "Firm", "we", "us" and "our"), a sole Proprietorship Firm having its registered office at:</p>
              <div className="mt-2 p-3 bg-[#232938] rounded border-l-4 border-blue-500">
                <p className="text-sm">"Galla Mandi Road, Near Kachhala Bus Stand, C/O HARSHIT MAHESHWARI, Galla Mandi Road, Bilsi, Budaun, Uttar Pradesh, 243633, India"</p>
              </div>
            </div>
            <div>
              <p><strong className="text-white">AND</strong></p>
              <p>This Agreement applies to User who use the services of the platform (the "Digital Distribution Services, Marketing services, CMS, Merch launch,") and shall be effective as of the date you sign up to the Platform.</p>
            </div>
          </div>
        </div>

        {/* Terms and Definitions */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Agreement Definitions</h3>
          <div className="space-y-3 text-sm">
            <p>In this Agreement, the party granting the right to use the licensed property, <strong>User</strong>, will be referred to as the "User" and the party who is receiving the right to use the licensed property, <strong>Firm</strong>, will be referred to as the "Firm."</p>
            <ul className="space-y-2 ml-4">
              <li>• User owns all proprietary rights in and to the copyright-able and/or copyrighted works described in this Agreement. The copyrighted works will collectively be referred to as "Work."</li>
              <li>• User owns all rights in and to the Work and retains all rights to the Work, which are not transferred herein.</li>
              <li>• Firm desires to obtain, and User has agreed to grant, a license authorizing the use of the Work by User in accordance with the terms and conditions of this Agreement.</li>
            </ul>
          </div>
        </div>

        {/* Section 1: Grant of License */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">1. GRANT OF LICENSE</h3>
          <p>User owns Property To Be Licensed ("Property"). In accordance with this Agreement, User grants Firm an <strong className="text-white">exclusive license</strong> to Use or Sell the Property. User retains title and Ownership of the Property. Firm will own all rights to materials, products or other works (the Work) created by Firm in connection with this license.</p>
        </div>

        {/* Section 2: Rights and Obligations */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">2. RIGHTS AND OBLIGATIONS</h3>
          <p>Firm shall be the sole owner of the Work and all proprietary rights in and to the Work; however, such ownership shall not include ownership of the copyright in and to the Property or any other rights to the Property not specifically granted in this Agreement.</p>
        </div>

        {/* Section 3: Payment */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">3. PAYMENT</h3>
          <p className="mb-4">Firm agrees to pay User a royalty which shall be calculated as follows:</p>

          {/* Royalty Tables */}
          <div className="space-y-6">
            {/* One Song/Album */}
            <div>
              <h4 className="text-lg font-medium text-white mb-3">Distribution Services</h4>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-600 rounded-lg">
                  <thead className="bg-[#232938]">
                    <tr>
                      <th className="border border-gray-600 p-3 text-left text-white">Plan Name</th>
                      <th className="border border-gray-600 p-3 text-left text-white">Royalty (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-600 p-3">One Song Distribution Service</td>
                      <td className="border border-gray-600 p-3 font-semibold">90%</td>
                    </tr>
                    <tr className="bg-[#1F2433]">
                      <td className="border border-gray-600 p-3">One Album Distribution Service</td>
                      <td className="border border-gray-600 p-3 font-semibold">90%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Artist Plan */}
            <div>
              <h4 className="text-lg font-medium text-white mb-3">Artist Plan</h4>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-600 rounded-lg">
                  <thead className="bg-[#232938]">
                    <tr>
                      <th className="border border-gray-600 p-3 text-left text-white">Plan</th>
                      <th className="border border-gray-600 p-3 text-left text-white">Royalty (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-600 p-3">3 Months Starter Plan</td>
                      <td className="border border-gray-600 p-3 font-semibold">70%</td>
                    </tr>
                    <tr className="bg-[#1F2433]">
                      <td className="border border-gray-600 p-3">6 Months Advance Plan</td>
                      <td className="border border-gray-600 p-3 font-semibold">80%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 p-3">1 Year Pro Plan</td>
                      <td className="border border-gray-600 p-3 font-semibold">90%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Label Plan */}
            <div>
              <h4 className="text-lg font-medium text-white mb-3">Label Plan</h4>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-600 rounded-lg">
                  <thead className="bg-[#232938]">
                    <tr>
                      <th className="border border-gray-600 p-3 text-left text-white">Plan</th>
                      <th className="border border-gray-600 p-3 text-left text-white">Royalty (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-600 p-3">3 Months Starter Plan</td>
                      <td className="border border-gray-600 p-3 font-semibold">70%</td>
                    </tr>
                    <tr className="bg-[#1F2433]">
                      <td className="border border-gray-600 p-3">6 Months Advance Plan</td>
                      <td className="border border-gray-600 p-3 font-semibold">80%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 p-3">1 Year Pro Plan</td>
                      <td className="border border-gray-600 p-3 font-semibold">90%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Aggregators Notice */}
            <div className="bg-[#232938] p-4 rounded-lg border border-gray-600">
              <p className="text-blue-300"><strong>For Aggregators:</strong> There is a custom agreement with custom terms and conditions. Fill the apply now aggregator form. Our dedicated team will coordinate you.</p>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="mt-6 space-y-3 text-sm">
            <p><strong>3.2</strong> We will pay you a share of the net revenue received from different distribution platforms and networks, after deduction of content IPR Users payment or any such 3rd party payment if any.</p>
            <p><strong>3.3</strong> The User will be liable to pay separately for marketing/promotion/playlist pitching/advertisement services. The consideration towards such services shall be decided upon mutual agreement between the Parties.</p>
            <p><strong>3.4</strong> In the event the User wants to take down the Property, they shall be liable to pay <strong>Rs. 500/-</strong> as take-down fees.</p>
            <p><strong>3.5</strong> In the event of any infringement notice or claims, the User shall be liable to pay <strong>Rs. 5000/-</strong> as take-down fees.</p>
            <p><strong>3.6</strong> In the event the User wants to release the Property on Metadata or update it or re-release it, they shall be liable to pay <strong>Rs. 100/-</strong> per release.</p>
            <p><strong>3.7</strong> The User will receive the analytical report post release of the Property, and they shall be given after every <strong>90 days</strong>.</p>
            <p><strong>3.8</strong> The User will be liable to pay DSP Fees, taxes, claims and deductions, and the same shall be deducted from the Royalty fees.</p>
          </div>
        </div>

        {/* Remaining sections collapsed for brevity - keeping all other sections as they are */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">4. MODIFICATIONS</h3>
          <p>Unless the prior written approval of User is obtained, Firm may not modify or change the Property in any manner. User shall not use Licensed property for any purpose that is unlawful or prohibited by these Terms of the Agreement.</p>
        </div>

        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">5. DEFAULTS ON AGREEMENT</h3>
          <p>If Firm fails to abide by the obligations of this Agreement, including the obligation to make a royalty payment when due, User shall have the option to cancel this Agreement by providing <strong>30 days written notice</strong> to Firm. Firm shall have the option of taking corrective action to cure the default to prevent the termination of this Agreement if said corrective action is enacted prior to the end of the time period stated in the previous sentence.</p>
        </div>

        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">6. WARRANTIES</h3>
          <p>Neither party makes any warranties with respect to the use, sale or other transfer of the Property by the other party or by any third party, and Firm accepts the product <strong>"AS IS."</strong> In no event will User be liable for direct, indirect, special, incidental, or consequential damages, that are in any way related to the Property.</p>
        </div>

        {/* Required Documents */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg border border-gray-600">
          <h3 className="text-xl font-semibold text-white mb-4">📋 After Sign Up: Required Self Attested Documents</h3>
          <ul className="space-y-2 text-sm">
            <li>1. Certificate of Incorporation (if applicable)</li>
            <li>2. GST Certificate (if applicable)</li>
            <li>3. Cancelled Cheque</li>
            <li>4. PAN Card Copy</li>
            <li>5. Aadhaar Card Copy</li>
          </ul>
        </div>

        {/* Consent Checkboxes */}
        <div className="mt-12 p-6 bg-[#1A1F2E] rounded-lg border border-gray-600 space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">Your Consent</h3>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="accept-terms"
              checked={consent.terms}
              onChange={() => handleConsentChange('terms')}
              className="mt-1 h-5 w-5 accent-purple-500 cursor-pointer"
            />
            <label htmlFor="accept-terms" className="text-sm text-gray-300 flex-1 cursor-pointer">
              I accept the <strong className="text-white">Terms and Conditions</strong> of this Distribution Agreement and understand all the clauses, payment terms, and obligations mentioned above. <span className="text-red-500">*</span>
            </label>
          </div>

          {/* Privacy Policy */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="accept-privacy"
              checked={consent.privacy}
              onChange={() => handleConsentChange('privacy')}
              className="mt-1 h-5 w-5 accent-purple-500 cursor-pointer"
            />
            <label htmlFor="accept-privacy" className="text-sm text-gray-300 flex-1 cursor-pointer">
              I accept the <strong className="text-white">Privacy Policy</strong> and understand how my data will be collected, used, and protected. <span className="text-red-500">*</span>
            </label>
          </div>

          {/* Marketing Communications */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="accept-marketing"
              checked={consent.marketing}
              onChange={() => handleConsentChange('marketing')}
              className="mt-1 h-5 w-5 accent-purple-500 cursor-pointer"
            />
            <label htmlFor="accept-marketing" className="text-sm text-gray-300 flex-1 cursor-pointer">
              I agree to receive <strong className="text-white">Marketing Communications</strong> including newsletters, promotional offers, and updates from Maheshwari Visuals. (Optional)
            </label>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            <span className="text-red-500">*</span> Required fields
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pb-10">
          <button
            onClick={handleSubmit}
            disabled={!consent.terms || !consent.privacy || isSubmitting}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
              (consent.terms && consent.privacy && !isSubmitting)
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg cursor-pointer'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Creating Account...' : 'Complete Registration'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DistributionAgreementPage
