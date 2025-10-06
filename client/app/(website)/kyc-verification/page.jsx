"use client";

import { MainHeadingText } from '@/components/FixedUiComponents';
import React, { useState, useCallback } from 'react';


const KycVerificationPage = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [aadhaarError, setAadhaarError] = useState('');
  const [panError, setPanError] = useState('');

  // Handles input and formatting for Aadhaar number
  const handleAadhaarChange = useCallback((e) => {
    const rawValue = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
    let formattedValue = '';
    for (let i = 0; i < rawValue.length && i < 12; i++) {
      formattedValue += rawValue[i];
      if ((i + 1) % 4 === 0 && i !== 11) {
        formattedValue += ' ';
      }
    }
    setAadhaarNumber(formattedValue);
    setAadhaarError(rawValue.length === 12 ? '' : 'Aadhaar number must be 12 digits.');
  }, []);

  // Handles input and formatting for PAN number
  const handlePanChange = useCallback((e) => {
    const rawValue = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    setPanNumber(rawValue);
    
    // Simple PAN validation (10 characters, specific format)
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    setPanError(panRegex.test(rawValue) ? '' : 'PAN number must be 10 characters.');
  }, []);

  // Placeholder functions for the "Verify" and "Submit" actions
  const handleVerifyAadhaar = () => {
    const rawValue = aadhaarNumber.replace(/\s/g, '');
    if (rawValue.length === 12) {
      alert('Aadhaar number verified!');
      // In a real app, you would make an API call here.
    } else {
      setAadhaarError('Please enter a valid 12-digit Aadhaar number.');
    }
  };

  const handleVerifyPan = () => {
    const rawValue = panNumber;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (panRegex.test(rawValue)) {
      alert('PAN number verified!');
      // In a real app, you would make an API call here.
    } else {
      setPanError('Please enter a valid 10-character PAN number.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const aadhaarValid = aadhaarNumber.replace(/\s/g, '').length === 12;
    const panValid = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber);

    if (aadhaarValid && panValid) {
      alert('KYC submission successful!');
      // Handle the final form submission here.
    } else {
      setAadhaarError(aadhaarValid ? '' : 'Aadhaar is invalid.');
      setPanError(panValid ? '' : 'PAN is invalid.');
    }
  };

  return (
    <div className="bg-[#151A27] min-h-screen flex flex-col w-full overflow-hidden items-center py-10 pt-[100px] text-white">
      <MainHeadingText text="KYC VERIFICATION" />

      <form onSubmit={handleSubmit} className="bg-[#1A1F2E] max-w-5xl w-[90vw] mt-10 p-6 lg:p-20 rounded-lg border border-gray-700 shadow-xl">
        {/* Aadhaar Card Section */}
        <div className="mb-8">
          <label htmlFor="aadhaar" className="font-semibold text-xl block mb-2">
            Aadhaar Card Number <span className="text-purple-600">*</span>
          </label>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              id="aadhaar"
              type="text"
              value={aadhaarNumber}
              onChange={handleAadhaarChange}
              placeholder="XXXX XXXX XXXX"
              maxLength="14" // 12 digits + 2 spaces
              className="flex-1 w-full border border-gray-600 bg-[#252a36] text-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ease-in-out text-lg tracking-[0.2em]"
            />
            <button
              type="button"
              onClick={handleVerifyAadhaar}
              className="w-full sm:w-auto px-6 py-3 font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#1A1F2E]"
            >
              Verify
            </button>
          </div>
          {aadhaarError && <p className="text-red-500 text-sm mt-2">{aadhaarError}</p>}
        </div>

        {/* PAN Card Section */}
        <div className="mb-10">
          <label htmlFor="pan" className="font-semibold text-xl block mb-2">
            PAN Card Number <span className="text-purple-600">*</span>
          </label>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              id="pan"
              type="text"
              value={panNumber}
              onChange={handlePanChange}
              placeholder="ABCDE1234F"
              maxLength="10"
              className="flex-1 w-full border border-gray-600 bg-[#252a36] text-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ease-in-out text-lg tracking-widest"
            />
            <button
              type="button"
              onClick={handleVerifyPan}
              className="w-full sm:w-auto px-6 py-3 font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#1A1F2E]"
            >
              Verify
            </button>
          </div>
          {panError && <p className="text-red-500 text-sm mt-2">{panError}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="px-10 py-4 font-semibold text-white rounded-lg bg-purple-600 hover:bg-purple-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#1A1F2E]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default KycVerificationPage;
