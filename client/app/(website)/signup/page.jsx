'use client'

import React, { useEffect, useState } from 'react'
import { Country, State } from 'country-state-city'

const App = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneCode: '+91',
        phoneNumber: '',
        address: '',
        pincode: '',
        state: '',
        country: '',
        password: '',
        confirmPassword: '',
        userType: '', // "Artist" or "Label"
        // Artist-specific fields
        artistName: '',
        // Label-specific fields
        labelName: '',
        popularReleaseLinks: '',
        popularArtistLinks: '',
        totalReleases: '',
        releaseFrequency: 'Daily',
        monthlyReleaseCount: '5-20',
        labelInfo: '',
        // Common fields for both
        youtube: '',
        instagram: '',
        facebook: '',
        website: '',
        acceptTerms: false
    })

    const [countries] = useState(Country.getAllCountries())
    const [states, setStates] = useState([])

    const [isArtist, setIsArtist] = useState(false)
    const [isLabel, setIsLabel] = useState(false)

    useEffect(() => {
        if (formData.country) {
            // Use the package to get states of the selected country
            const newStates = State.getStatesOfCountry(formData.country)
            setStates(newStates)
            // Reset the state field when the country changes
            setFormData((prev) => ({ ...prev, state: '' }))
        } else {
            setStates([])
            setFormData((prev) => ({ ...prev, state: '' }))
        }
    }, [formData.country])
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        if (name === 'userType') {
            setIsArtist(value === 'artist')
            setIsLabel(value === 'label')
        }

        if (type === 'checkbox') {
            setFormData((prev) => ({ ...prev, acceptTerms: checked }))
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        // Add your API call here
    }

    const MainHeadingText = ({ text }) => <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">{text}</h1>

    const Button = ({ children, variant, ...props }) => (
        <button
            {...props}
            className={`px-6 py-3 rounded-full text-white font-bold transition-all duration-300 transform hover:scale-105 shadow-lg
        ${variant === 'blue' ? 'bg-gradient-to-r from-[#652CD6] to-[#0466C7]' : ''}
        ${props.className || ''}`}>
            {children}
        </button>
    )

    const renderArtistFields = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 align-top">
            <div>
                <label>
                    Artist Name <span className="text-[#652CD6]">*</span>
                </label>
                <input
                    type="text"
                    name="artistName"
                    value={formData.artistName}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-gray-500 rounded-md px-3 py-2"
                />
            </div>
            <div>
                <label>
                    Youtube Channel Url <span className="text-[#652CD6]">*</span>
                </label>
                <input
                    type="text"
                    name="youtube"
                    value={formData.youtube}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-gray-500 rounded-md px-3 py-2"
                />
            </div>
            <div>
                <label>
                    Instagram Url <span className="text-[#652CD6]">*</span>
                </label>
                <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-gray-500 rounded-md px-3 py-2"
                />
            </div>
            <div>
                <label>
                    Facebook URL <span className="text-[#652CD6]">*</span>
                </label>
                <input
                    type="text"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-gray-500 rounded-md px-3 py-2"
                />
            </div>
        </div>
    )

    const renderLabelFields = () => (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 align-top">
                <div>
                    <label>
                        Label Name <span className="text-[#652CD6]">*</span>
                    </label>
                    <input
                        type="text"
                        name="labelName"
                        value={formData.labelName}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-gray-500 rounded-md px-3 py-2"
                    />
                </div>
                <div>
                    <label>
                        Youtube Channel Url <span className="text-[#652CD6]">*</span>
                    </label>
                    <input
                        type="text"
                        name="youtube"
                        value={formData.youtube}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-gray-500 rounded-md px-3 py-2"
                    />
                </div>
                <div>
                    <label>
                        Instagram Url <span className="text-[#652CD6]">*</span>
                    </label>
                    <input
                        type="text"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-gray-500 rounded-md px-3 py-2"
                    />
                </div>
                <div>
                    <label>
                        Facebook URL <span className="text-[#652CD6]">*</span>
                    </label>
                    <input
                        type="text"
                        name="facebook"
                        value={formData.facebook}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-gray-500 rounded-md px-3 py-2"
                    />
                </div>
                <div>
                    <label>Website URL</label>
                    <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-gray-500 rounded-md px-3 py-2"
                    />
                </div>
                <div>
                    <label>Your Popular Release Links</label>
                    <input
                        type="text"
                        name="popularReleaseLinks"
                        value={formData.popularReleaseLinks}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-gray-500 rounded-md px-3 py-2 "
                    />
                </div>
                <div>
                    <label>Your Popular Artist Links</label>
                    <input
                        type="text"
                        name="popularArtistLinks"
                        value={formData.popularArtistLinks}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-gray-500 rounded-md px-3 py-2 "
                    />
                </div>
                <div>
                    <label>Total No. Of releases in Your current Catalog</label>
                    <input
                        type="text"
                        name="totalReleases"
                        value={formData.totalReleases}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-gray-500 rounded-md px-3 py-2"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label>How often Do You release your music?</label>
                    <select
                        name="releaseFrequency"
                        value={formData.releaseFrequency}
                        onChange={handleChange}
                        className="w-full bg-[#151A27]  text-white border border-gray-500 rounded-md px-3 py-2">
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Occasionally">Occasionally</option>
                    </select>
                </div>
                <div>
                    <label>How many releases do plan to distribute in a month?</label>
                    <select
                        name="monthlyReleaseCount"
                        value={formData.monthlyReleaseCount}
                        onChange={handleChange}
                        className="w-full bg-[#151A27]  text-white border border-gray-500 rounded-md px-3 py-2">
                        <option value="1-5">1-5</option>
                        <option value="5-20">5-20</option>
                        <option value="20+">20+</option>
                    </select>
                </div>
            </div>
            <div>
                <label>Provide some brief info. About your Label</label>
                <textarea
                    name="labelInfo"
                    value={formData.labelInfo}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-gray-500 rounded-md px-3 py-3 h-28"
                />
            </div>
        </>
    )

    return (
        <div className="bg-[#151A27] min-h-screen flex flex-col w-full overflow-hidden items-center justify-center py-10 pt-[100px] ">
            <MainHeadingText text="SIGN UP" />

            <form
                onSubmit={handleSubmit}
                className="bg-[#191E2A] border border-gray-400 rounded-xl p-8 md:p-20 mt-10 w-full max-w-6xl text-white space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label>
                            First Name <span className="text-[#652CD6]">*</span>
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-500 rounded-md px-3 py-2"
                        />
                    </div>
                    <div>
                        <label>
                            Last Name <span className="text-[#652CD6]">*</span>
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-500 rounded-md px-3 py-2"
                        />
                    </div>
                </div>

                <div>
                    <label>
                        Email ID <span className="text-[#652CD6]">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-gray-500 rounded-md px-3 py-2"
                    />
                </div>

                <label>
                    Phone Number <span className="text-[#652CD6]">*</span>
                </label>
                <div className="flex gap-2">
                    <select
                        name="phoneCode"
                        value={formData.phoneCode}
                        onChange={handleChange}
                        className="bg-[#151A27] border border-gray-500 rounded-md px-3 py-2">
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                    </select>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="flex-1 bg-transparent border border-gray-500 rounded-md px-3 py-2"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label>
                            Address <span className="text-[#652CD6]">*</span>
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-500 rounded-md px-3 py-2"
                        />
                    </div>
                    <div>
                        <label>
                            Pincode <span className="text-[#652CD6]">*</span>
                        </label>
                        <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-500 rounded-md px-3 py-2"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label>
                            Country <span className="text-[#652CD6]">*</span>
                        </label>
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-500 rounded-md px-3 py-2">
                            <option
                                className="bg-[#151A27] text-white"
                                value="">
                                Select Country
                            </option>
                            {countries.map((c) => (
                                <option
                                    className="bg-[#151A27] text-white"
                                    key={c.isoCode}
                                    value={c.isoCode}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>
                            State <span className="text-[#652CD6]">*</span>
                        </label>
                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-500 rounded-md px-3 py-2">
                            <option
                                className="bg-[#151A27] text-white"
                                value="">
                                Select State
                            </option>
                            {states.map((s) => (
                                <option
                                    className="bg-[#151A27] text-white"
                                    key={s.isoCode}
                                    value={s.isoCode}>
                                    {s.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label>
                            Password <span className="text-[#652CD6]">*</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-500 rounded-md px-3 py-2"
                        />
                    </div>
                    <div>
                        <label>
                            Confirm Password <span className="text-[#652CD6]">*</span>
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-500 rounded-md px-3 py-2"
                        />
                    </div>
                </div>

                <div>
                    <label>
                        Which of these best describes you? <span className="text-[#652CD6]">*</span>
                    </label>
                    <div className="flex items-center gap-6 mt-2">
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                id="artist"
                                name="userType"
                                value="artist"
                                onChange={handleChange}
                                checked={isArtist}
                                className="h-5 w-5 accent-purple-500"
                            />
                            <label htmlFor="artist">Artist</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                id="label"
                                name="userType"
                                value="label"
                                onChange={handleChange}
                                checked={isLabel}
                                className="h-5 w-5 accent-purple-500"
                            />
                            <label htmlFor="label">Label</label>
                        </div>
                    </div>
                </div>

                {isArtist && renderArtistFields()}
                {isLabel && renderLabelFields()}

                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        className="h-5 w-5 accent-purple-500"
                    />
                    <label>I accept the terms and conditions</label>
                </div>

                <div className="w-full flex justify-center items-center">
                    <Button
                        variant="blue"
                        onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
            </form>
            
        </div>
    )
}

export default App
