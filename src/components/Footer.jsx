import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Globe } from 'lucide-react';

const socialIcons = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Youtube, label: 'Youtube', href: '#' },
];

const footerLinks = [
  ['FAQ', 'Investor Relations', 'Privacy', 'Speed Test'],
  ['Help Center', 'Jobs', 'Cookie Preferences', 'Legal Notices'],
  ['Account', 'Ways to Watch', 'Corporate Information', 'Only on Netflix'],
  ['Media Center', 'Terms of Use', 'Contact Us', 'Redeem Gift Cards'],
];

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-12 px-4 sm:px-12 md:px-24 border-t border-gray-900 mt-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Social Icons */}
        <div className="flex space-x-6 mb-8">
          {socialIcons.map((item, index) => (
            <a
              key={index}
              href={item.href}
              aria-label={item.label}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <item.icon size={24} />
            </a>
          ))}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
          {footerLinks.map((column, colIndex) => (
            <ul key={colIndex} className="space-y-3">
              {column.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a 
                    href="#" 
                    className="hover:underline text-gray-400 text-xs sm:text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* Service Code and Language */}
        <div className="space-y-4 mb-8">
          
          {/* Service Code Button */}
          <button className="border border-gray-400 text-gray-400 hover:border-white hover:text-white transition-colors py-2 px-4 text-xs sm:text-sm">
            Service Code
          </button>

          {/* Language Selector */}
          <div className="relative w-max">
            <Globe className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-400 pointer-events-none" size={16} />
            <select
              defaultValue="ar"
              className="appearance-none bg-transparent border border-gray-400 text-gray-400 py-2 pl-8 pr-6 rounded text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-white"
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>

        {/* Company Info */}
        <div className="text-xs text-gray-400">
          <p>
            © 2024 Netflix, Inc.
          </p>
          <p className="mt-2">
            Netflix is a registered trademark of Netflix, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;