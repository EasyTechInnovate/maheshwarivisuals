"use client";
import React, { useEffect, useState } from "react";
import { Country, State } from "country-state-city";
import { MainHeadingText } from "@/components/FixedUiComponents";
import { Button } from "@/components/ui/button";

const FormPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneCode: "+91",
    phoneNumber: "",
    address: "",
    pincode: "",
    state: "",
    country: "",
    companyName: "",
    youtube: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    website: "",
    popularReleaseLinks: [""],
    popularArtistLinks: [""],
    labels: [""],
    totalReleases: "",
    releaseFrequency: "Daily",
    monthlyReleaseCount: "5-20",
    companyInfo: "",
    services: [],
    howKnowUs: [],
    otherClient: "",
    acceptTerms: false,
  });

  const [countries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);

  useEffect(() => {
    if (formData.country) {
      const newStates = State.getStatesOfCountry(formData.country);
      setStates(newStates);
      // Reset selected state if country changes
      setFormData((prev) => ({ ...prev, state: "" }));
    } else {
      setStates([]);
      setFormData((prev) => ({ ...prev, state: "" }));
    }
  }, [formData.country]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      // special-case acceptTerms -> boolean
      if (name === "acceptTerms") {
        setFormData((prev) => ({ ...prev, acceptTerms: checked }));
        return;
      }

      // otherwise treat as multi-value checkbox array (services, howKnowUs)
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((v) => v !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const addArrayField = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // API call here
  };

  return (
    <div className="bg-[#151A27] min-h-screen flex flex-col w-full overflow-hidden items-center justify-center py-10 pt-[150px] ">
      <MainHeadingText text="Apply form now for" text2="Aggregators" />

      <form
        onSubmit={handleSubmit}
        className="bg-[#191E2A] border border-gray-400 rounded-xl  p-20 mt-20 w-full max-w-6xl text-white space-y-6"
      >
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>First Name <span className="text-[#652CD6]">*</span> </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 rounded px-3 py-2"
            />
          </div>
          <div>
            <label>Last Name <span className="text-[#652CD6]">*</span> </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 rounded px-3 py-2"
            />
          </div>
        </div>

        
        <div>
          <label>Email ID <span className="text-[#652CD6]">*</span> </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-transparent border border-gray-500 rounded px-3 py-2"
          />
        </div>

        
          <label>Phone Number <span className="text-[#652CD6]">*</span> </label>
        <div className="flex gap-2">
          <select
            name="phoneCode"
            value={formData.phoneCode}
            onChange={handleChange}
            className="bg-[#151A27] border border-gray-500 rounded px-3 py-2"
          >
            <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
          </select>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="flex-1 bg-transparent border border-gray-500 rounded px-3 py-2"
          />
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Address <span className="text-[#652CD6]">*</span> </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 rounded px-3 py-2"
            />
          </div>
          <div>
            <label>Pincode <span className="text-[#652CD6]">*</span> </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 rounded px-3 py-2"
            />
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Country <span className="text-[#652CD6]">*</span> </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 rounded px-3 py-2"
            >
              <option className="bg-[#151A27]  text-white" value="">
                Select Country
              </option>
              {countries.map((c) => (
                <option
                  className="bg-[#151A27]  text-white"
                  key={c.isoCode}
                  value={c.isoCode}
                >
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>State <span className="text-[#652CD6]">*</span> </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 rounded px-3 py-2"
            >
              <option className="bg-[#151A27]  text-white" value="">Select State</option>
              {states.map((s) => (
                <option className="bg-[#151A27]  text-white" key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        
        <div>
          <label>Company/Firm Name <span className="text-[#652CD6]">*</span> </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full bg-transparent border border-gray-500 rounded px-3 py-2"
          />
        </div>

        
        {[
          { label: "Youtube Channel Url", name: "youtube" },
          { label: "Instagram Url", name: "instagram" },
          { label: "Facebook Page Url", name: "facebook" },
          { label: "Linkedin Url", name: "linkedin" },
          { label: "Website", name: "website" },
        ].map((field) => (
          <div key={field.name}>
            <label>{field.label} <span className="text-[#652CD6]">*</span> </label>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 rounded px-3 py-2"
            />
          </div>
        ))}

        
        <div>
          <label>Your Popular Release Links <span className="text-[#652CD6]">*</span> </label>
          {formData.popularReleaseLinks.map((link, index) => (
            <input
              key={index}
              type="text"
              value={link}
              onChange={(e) =>
                handleArrayChange(index, "popularReleaseLinks", e.target.value)
              }
              className="w-full bg-transparent border border-gray-500 rounded px-3 py-2 mt-2"
            />
          ))}
          <button
            type="button"
            onClick={() => addArrayField("popularReleaseLinks")}
            className="text-purple-500 mt-2"
          >
            + Add More link
          </button>
        </div>

        
        <div>
          <label>Your Popular Artist Links <span className="text-[#652CD6]">*</span> </label>
          {formData.popularArtistLinks.map((link, index) => (
            <input
              key={index}
              type="text"
              value={link}
              onChange={(e) =>
                handleArrayChange(index, "popularArtistLinks", e.target.value)
              }
              className="w-full bg-transparent border border-gray-500 rounded px-3 py-2 mt-2"
            />
          ))}
          <button
            type="button"
            onClick={() => addArrayField("popularArtistLinks")}
            className="text-purple-500 mt-2"
          >
            + Add More link
          </button>
        </div>

        
        <div>
          <label>Your Labels <span className="text-[#652CD6]">*</span> </label>
          {formData.labels.map((label, index) => (
            <input
              key={index}
              type="text"
              value={label}
              onChange={(e) =>
                handleArrayChange(index, "labels", e.target.value)
              }
              className="w-full bg-transparent border border-gray-500 rounded px-3 py-2 mt-2"
            />
          ))}
          <button
            type="button"
            onClick={() => addArrayField("labels")}
            className="text-purple-500 mt-2"
          >
            + Add More Labels
          </button>
        </div>

        

        
        <div>
          <label>Total No. Of releases in Your current Calalog <span className="text-[#652CD6]">*</span> </label>
          <input
            type="text"
            name="totalReleases"
            value={formData.totalReleases}
            onChange={handleChange}
            className="w-full bg-transparent border border-gray-500 rounded px-3 py-2"
          />
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>How often Do You release your music? <span className="text-[#652CD6]">*</span> </label>
            <select
              name="releaseFrequency"
              value={formData.releaseFrequency}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 rounded px-3 py-2"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Occasionally">Occasionally</option>
            </select>
          </div>

          <div>
            <label>How many releases do plan to distribute in a month? <span className="text-[#652CD6]">*</span> </label>
            <select
              name="monthlyReleaseCount"
              value={formData.monthlyReleaseCount}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 rounded px-3 py-2"
            >
              <option value="1-5">1-5</option>
              <option value="5-20">5-20</option>
              <option value="20+">20+</option>
            </select>
          </div>
        </div>

        
        <div>
          <label>Provide some brief info. About your Firm/Company <span className="text-[#652CD6]">*</span> </label>
          <textarea
            name="companyInfo"
            value={formData.companyInfo}
            onChange={handleChange}
            className="w-full bg-transparent border border-gray-500 rounded px-3 py-3 h-28"
          />
        </div>

        
        <div>
          <label>Are you interested in any of our additional services? <span className="text-[#652CD6]">*</span> </label>
          <div className="mt-3 space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="services"
                value="Music Marketing/Advertisement"
                checked={formData.services.includes(
                  "Music Marketing/Advertisement"
                )}
                onChange={handleChange}
                className="h-5 w-5 accent-purple-500"
              />
              <span>Music Marketing/Advertisment</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="services"
                value="YouTube Channel CMS"
                checked={formData.services.includes("YouTube Channel CMS")}
                onChange={handleChange}
                className="h-5 w-5 accent-purple-500"
              />
              <span>YouTube Channel CMS</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="services"
                value="Music Video Distribution"
                checked={formData.services.includes("Music Video Distribution")}
                onChange={handleChange}
                className="h-5 w-5 accent-purple-500"
              />
              <span>Music Video Distribution</span>
            </label>
          </div>
        </div>

        
        <div>
          <label>How do You Know about us ? <span className="text-[#652CD6]">*</span> </label>
          <div className="mt-3 space-y-3">
            {[
              "Google",
              "Facebook",
              "Instagram",
              "Our Existing Artist/Label",
              "Others",
            ].map((opt) => (
              <label key={opt} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="howKnowUs"
                  value={opt}
                  checked={formData.howKnowUs.includes(opt)}
                  onChange={handleChange}
                  className="h-5 w-5 accent-purple-500"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        
        <div>
          <label>If Choose Other/our existing client <span className="text-[#652CD6]">*</span> </label>
          <input
            type="text"
            name="otherClient"
            value={formData.otherClient}
            onChange={handleChange}
            className="w-full bg-transparent border border-gray-500 rounded px-3 py-2"
          />
        </div>

        
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
            <Button variant="blue" onClick={handleSubmit} >Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;
