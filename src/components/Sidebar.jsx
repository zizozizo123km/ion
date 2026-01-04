import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Tv, Clapperboard, Sparkles, Bookmark, Search, Settings } from 'lucide-react';

const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Search', icon: Search, path: '/search' },
    { name: 'TV Shows', icon: Tv, path: '/tv' },
    { name: 'Movies', icon: Clapperboard, path: '/movies' },
    { name: 'New & Popular', icon: Sparkles, path: '/new-popular' },
    { name: 'My List', icon: Bookmark, path: '/my-list' },
];

/**
 * Sidebar component providing primary navigation links in a vertical layout.
 * It is designed to be narrow on smaller desktops and expands slightly, typical of utility sidebars.
 * Note: Netflix often uses a top navigation bar, but this provides a vertical navigation alternative.
 */
const Sidebar = () => {

    return (
        <aside 
            // Fixed, sticky structure. Using Z-index 40 to ensure it's above main content.
            // Width: Narrow (w-16) generally, slightly wider (w-56) on large screens if desired, but 
            // keeping it narrow (w-16) for modern iconic look unless expanded (which would require state).
            // Hiding on extra small screens if a mobile header handles navigation.
            className="fixed top-0 left-0 h-screen w-16 bg-black/95 text-white p-3 shadow-2xl z-40 transition-all duration-300 hidden sm:flex flex-col"
            style={{ borderRight: '1px solid rgba(255, 255, 255, 0.1)' }}
        >
            
            {/* Logo placeholder - N icon */}
            <div className="flex justify-center mb-8 mt-4">
                <div className="text-red-600 text-3xl font-bold">
                    N
                </div>
            </div>

            <nav className="flex flex-col space-y-3 flex-grow">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        title={item.name} // Accessibility and narrow view hint
                        className={({ isActive }) => 
                            `flex justify-center p-3 rounded-lg transition duration-200 
                            group relative
                            ${isActive 
                                ? 'text-white font-semibold bg-red-700 shadow-lg' 
                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                            }`
                        }
                        end
                    >
                        <item.icon className="h-6 w-6 shrink-0" />
                        
                        {/* Tooltip/Expanded Name for narrow view */}
                        <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 
                                        bg-gray-900 text-white text-sm px-3 py-1 rounded-md 
                                        opacity-0 group-hover:opacity-100 pointer-events-none 
                                        whitespace-nowrap z-50 transition-opacity duration-150">
                            {item.name}
                        </span>
                    </NavLink>
                ))}
            </nav>
            
            {/* Settings/Footer Link Section */}
            <div className="border-t border-gray-700 pt-4">
                 <button 
                     title="Settings"
                     className="flex justify-center w-full p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition duration-200 group relative"
                 >
                     <Settings className="h-6 w-6 shrink-0" />
                     <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 
                                        bg-gray-900 text-white text-sm px-3 py-1 rounded-md 
                                        opacity-0 group-hover:opacity-100 pointer-events-none 
                                        whitespace-nowrap z-50 transition-opacity duration-150">
                            Settings
                        </span>
                 </button>
            </div>
            
        </aside>
    );
};

export default Sidebar;