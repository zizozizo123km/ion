import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Netfix header turns solid black after scrolling down about 100px
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', active: true },
    { name: 'TV Shows' },
    { name: 'Movies' },
    { name: 'New & Popular' },
    { name: 'My List' },
  ];

  // Conditional background styling based on scroll state
  const headerClass = isScrolled
    ? 'bg-black shadow-lg'
    : 'bg-gradient-to-b from-black/70 to-transparent';

  // Placeholder for the Netflix logo image URL
  const NETFLIX_LOGO = 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg';
  
  // Placeholder for a generic profile avatar
  const PROFILE_AVATAR = 'https://i.pravatar.cc/150?img=68'; 

  return (
    <header
      className={`fixed top-0 z-50 w-full transition duration-300 ease-in ${headerClass}`}
    >
      <div className="flex items-center justify-between h-16 px-4 md:px-12">
        {/* Left Section: Logo and Navigation */}
        <div className="flex items-center space-x-8">
          
          {/* Netflix Logo */}
          <img
            src={NETFLIX_LOGO}
            alt="Netflix Logo"
            className="h-6 sm:h-8 object-contain cursor-pointer"
          />

          {/* Primary Navigation (Hidden on small screens) */}
          <nav className="hidden lg:flex space-x-6 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href="#"
                className={`text-white text-base transition duration-200 hover:text-gray-300 ${
                  link.active ? 'font-semibold' : 'font-normal text-gray-300'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile/Genre dropdown (visible on md screens or smaller) */}
          <div className="lg:hidden text-white text-sm flex items-center cursor-pointer hover:text-gray-300">
            Browse
            <ChevronDown size={16} className="ml-1 transition duration-200" />
          </div>
        </div>

        {/* Right Section: Icons and Profile */}
        <div className="flex items-center space-x-4 md:space-x-6 text-white">
          <Search size={22} className="cursor-pointer hover:text-gray-300 transition" />
          
          <span className="hidden lg:inline text-sm cursor-pointer hover:text-gray-300 transition">
            Kids
          </span>
          
          <Bell size={22} className="cursor-pointer hover:text-gray-300 transition" />
          
          {/* Profile Dropdown */}
          <div className="flex items-center space-x-2 cursor-pointer group relative">
            {/* Avatar */}
            <img
              src={PROFILE_AVATAR} 
              alt="Profile"
              className="w-8 h-8 rounded-md object-cover"
            />
            {/* Dropdown Indicator (optional, but standard Netflix UI) */}
            <ChevronDown 
              size={16} 
              className="transition transform duration-300 hidden md:block group-hover:rotate-180" 
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;