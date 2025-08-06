import React from 'react';

import { FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebookF, FaLinkedinIn, FaTwitter, FaSpotify } from 'react-icons/fa';
import { Button } from '../ui/button';
import logo from '@/public/images/maheshwarilogo.png'; 
import Image from 'next/image';

const Footer = () => {
  
  const exploreLinks = [
    { title: 'MV Advertisement', href: '#' },
    { title: 'Features for Artists', href: '#' },
    { title: 'Features for Labels', href: '#' },
    { title: 'MV Marketing', href: '#' },
    { title: 'MV Distribution', href: '#' },
    { title: 'MV Production', href: '#' },
    { title: 'Mohi', href: '#' },
    { title: 'Pricing', href: '#' },
    { title: 'Sync', href: '#' },
    { title: 'Playlist Pitching', href: '#' },
  ];

  const moreLinks = [
    { title: 'About', href: '#' },
    { title: 'Careers', href: '#' },
    { title: 'Contact', href: '#' },
    { title: 'Blog', href: '#' },
    { title: 'Sign up', href: '#' },
    { title: 'Log in', href: '#' },
  ];

  const countriesLinks = [
    { title: 'Japan', href: '#' },
    { title: 'South Korea', href: '#' },
    { title: 'Brazil', href: '#' },
    { title: 'Nigeria', href: '#' },
    { title: 'United Kingdom', href: '#' },
    { title: 'France', href: '#' },
    { title: 'United States', href: '#' },
    { title: 'Singapore', href: '#' },
    { title: 'Netherlands', href: '#' },
  ];

  const legalLinks = [
    { title: 'Content Policy', href: '#' },
    { title: 'Cookie Policy', href: '#' },
    { title: 'Privacy Policy', href: '#' },
    { title: 'Terms of Service', href: '#' },
    { title: 'Distribution Agreement', href: '#' },
  ];

  return (
    <footer className="bg-[#1C1F2B] text-white ">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          
          <div className="w-full lg:w-2/5 flex flex-col space-y-8">
            
            <div className="flex items-center space-x-2">
             <Image src={logo} alt='Logo'/>
            </div>

            <div className="p-6 bg-[#212533] rounded-lg w-[80%]">
              <h3 className="text-base font-semibold mb-3">Subscribe to our newsletter for updates</h3>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 text-sm bg-[#1C1F2B] text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                />
                <Button variant='blue'>Subscribe</Button>
               
              </div>
            </div>

            <div className="space-y-4 w-[80%]">
              <p className="text-sm text-gray-400">
                Welcome To Maheshwari Visuals, A Leading Music Distribution Platform!
              </p>
              <div className="flex items-center space-x-2 text-gray-400">
                <FaEnvelope className="text-base" />
                <a href="mailto:support@maheshwarivisuals.com" className="text-sm hover:text-white transition-colors duration-200">
                  support@maheshwarivisuals.com
                </a>
              </div>
              <div className="flex items-start space-x-2 text-gray-400">
                <FaMapMarkerAlt className="text-base mt-1" />
                <p className="text-sm">
                  Maheshwari Complex, Bilsi,<br/>
                  UttarPradesh, India Pincode : 243633
                </p>
              </div>
            </div>

            
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-[#212533] text-gray-400 rounded-lg hover:bg-white hover:text-[#1C1F2B] transition-colors duration-200">
                <FaInstagram className="text-lg" />
              </a>
              <a href="#" className="p-2 bg-[#212533] text-gray-400 rounded-lg hover:bg-white hover:text-[#1C1F2B] transition-colors duration-200">
                <FaFacebookF className="text-lg" />
              </a>
              <a href="#" className="p-2 bg-[#212533] text-gray-400 rounded-lg hover:bg-white hover:text-[#1C1F2B] transition-colors duration-200">
                <FaLinkedinIn className="text-lg" />
              </a>
              <a href="#" className="p-2 bg-[#212533] text-gray-400 rounded-lg hover:bg-white hover:text-[#1C1F2B] transition-colors duration-200">
                <FaTwitter className="text-lg" />
              </a>
              <a href="#" className="p-2 bg-[#212533] text-gray-400 rounded-lg hover:bg-white hover:text-[#1C1F2B] transition-colors duration-200">
                <FaSpotify className="text-lg" />
              </a>
            </div>
          </div>

          
          <div className="w-full lg:w-3/5 grid grid-cols-2 md:grid-cols-4 gap-8">
            
            <div>
              <h4 className="text-lg font-semibold mb-8">Explore</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                {exploreLinks.map((link) => (
                  <li key={link.title}>
                    <a href={link.href} className="hover:text-white transition-colors duration-200">{link.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            
            <div>
              <h4 className="text-lg font-semibold mb-8">More</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                {moreLinks.map((link) => (
                  <li key={link.title}>
                    <a href={link.href} className="hover:text-white transition-colors duration-200">{link.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            
            <div>
              <h4 className="text-lg font-semibold mb-8">Countries</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                {countriesLinks.map((link) => (
                  <li key={link.title}>
                    <a href={link.href} className="hover:text-white transition-colors duration-200">{link.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            
            <div>
              <h4 className="text-lg font-semibold mb-8">Legal</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                {legalLinks.map((link) => (
                  <li key={link.title}>
                    <a href={link.href} className="hover:text-white transition-colors duration-200">{link.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            2022-25. All rights reserved by Maheshwari Visuals PVT LTD.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
