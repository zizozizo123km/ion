import React, { useState, useEffect, useCallback } from 'react';
import { Play, Info, Search, Bell, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

// --- MOCK API DATA START --- (In a real app, this would be imported from src/services/api.js)

const MOCK_MOVIES = [
    { id: 101, title: "The Quantum Enigma", backdrop_path: "/backdrop1.jpg", poster_path: "/poster1.jpg", overview: "A gripping mystery spanning decades and dimensions.", rating: 8.5 },
    { id: 102, title: "Echoes of the Void", backdrop_path: "/backdrop2.jpg", poster_path: "/poster2.jpg", overview: "A sci-fi epic about humanity's last hope.", rating: 7.9 },
    { id: 103, title: "Crimson Tide", backdrop_path: "/backdrop3.jpg", poster_path: "/poster3.jpg", overview: "Naval officers clash during a nuclear crisis.", rating: 9.1 },
    { id: 104, title: "The Royal Gambit", backdrop_path: "/backdrop4.jpg", poster_path: "/poster4.jpg", overview: "Intrigue and power struggles in a fictional monarchy.", rating: 8.8 },
    { id: 105, title: "Street Vipers", backdrop_path: "/backdrop5.jpg", poster_path: "/poster5.jpg", overview: "A brutal look at organized crime in the 90s.", rating: 9.0 },
    { id: 106, title: "Laugh Riot", backdrop_path: "/backdrop6.jpg", poster_path: "/poster6.jpg", overview: "A compilation of stand-up comedy specials.", rating: 7.5 },
    { id: 107, title: "Desert Storm", backdrop_path: "/backdrop7.jpg", poster_path: "/poster7.jpg", overview: "Military action deep in enemy territory.", rating: 8.2 },
    { id: 108, title: "Coded Secrets", backdrop_path: "/backdrop8.jpg", poster_path: "/poster8.jpg", overview: "Hackers race against time to save the internet.", rating: 8.9 },
];

const mockFetchMovies = (type) => new Promise(resolve => {
    // Simulate real fetching delay and mapping
    setTimeout(() => {
        resolve(MOCK_MOVIES.map((m, index) => ({
            ...m,
            id: m.id + type.length + index,
            title: `${m.title} (${type})`,
            // Simple mapping to generate diverse data/image keys
            poster_path: type.includes('Originals') ? MOCK_MOVIES[index % 8].poster_path : MOCK_MOVIES[(index + 1) % 8].poster_path,
            backdrop_path: MOCK_MOVIES[(index + 2) % 8].backdrop_path,
        })));
    }, 600);
});

// Helper function to get image URL (Mocked using Picsum IDs based on path hash)
const getImageUrl = (path, size = 'w500') => {
    const id = (path.charCodeAt(path.length - 1) % 50) + 10;
    // We use different aspect ratios for backdrop (16:9) and poster (3:4 roughly)
    const width = size === 'original' ? 1280 : 300;
    const height = size === 'original' ? 720 : 400; 
    return `https://picsum.photos/id/${id}/${width}/${height}`;
};

// --- MOCK API DATA END ---

// -------------------------------------------------------------------
// Navbar Component
// -------------------------------------------------------------------

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav 
            className={`fixed top-0 z-50 w-full p-4 transition duration-300 ease-in ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'}`}
        >
            <div className="flex items-center justify-between mx-auto max-w-[95%]">
                <div className="flex items-center space-x-8">
                    <h1 className="text-red-600 text-3xl font-bold cursor-pointer">NETFLIX</h1>
                    
                    <ul className="hidden md:flex space-x-6 text-sm">
                        <li className="text-white font-medium cursor-pointer transition hover:text-gray-300">Home</li>
                        <li className="text-gray-300 cursor-pointer transition hover:text-white">TV Shows</li>
                        <li className="text-gray-300 cursor-pointer transition hover:text-white">Movies</li>
                        <li className="text-gray-300 cursor-pointer transition hover:text-white">New & Popular</li>
                    </ul>
                </div>

                <div className="flex items-center space-x-6">
                    <Search className="h-6 w-6 text-white cursor-pointer hover:text-gray-300 transition" />
                    <Bell className="h-6 w-6 text-white cursor-pointer hover:text-gray-300 transition" />
                    
                    <div className="relative group cursor-pointer">
                        <div className="flex items-center space-x-1">
                            <img 
                                src={getImageUrl('/profile', 'w40')} // Mock profile image
                                alt="Profile" 
                                className="rounded w-8 h-8 object-cover" 
                            />
                            <ChevronDown className="h-4 w-4 text-white transition transform group-hover:rotate-180 duration-300" />
                        </div>
                        
                        <div className="absolute right-0 top-full mt-4 w-40 bg-black/80 text-white rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                            <ul className="py-2 text-sm">
                                <li className="px-4 py-2 hover:bg-gray-800 transition">Account</li>
                                <li className="px-4 py-2 hover:bg-gray-800 transition border-t border-gray-700 mt-1">Sign Out</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};


// -------------------------------------------------------------------
// Billboard Component (Hero Section)
// -------------------------------------------------------------------

const Billboard = ({ featuredMovie }) => {
    if (!featuredMovie) {
        return (
             <div className="relative h-[85vh] w-full bg-gray-900 animate-pulse">
                <div className="absolute bottom-0 p-16 text-white w-full">
                    <div className="h-8 w-1/4 bg-gray-700 mb-4 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-700 mb-6 rounded"></div>
                    <div className="flex space-x-3">
                        <div className="h-10 w-32 bg-red-600 rounded-lg"></div>
                        <div className="h-10 w-32 bg-gray-600 rounded-lg"></div>
                    </div>
                </div>
            </div>
        );
    }
    
    const imageUrl = getImageUrl(featuredMovie.backdrop_path, 'original');

    return (
        <div className="relative h-[85vh]">
            <div 
                className="w-full h-full bg-cover bg-center transition-all duration-500"
                style={{ backgroundImage: `url(${imageUrl})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute top-1/3 left-0 p-6 md:p-16 text-white w-full lg:w-2/3"
            >
                <h2 className="text-4xl md:text-7xl font-extrabold mb-4 drop-shadow-lg leading-tight">
                    {featuredMovie.title.split('(')[0].trim()}
                </h2>
                <p className="text-base md:text-xl mb-6 line-clamp-3 drop-shadow-md max-w-xl">
                    {featuredMovie.overview || "Experience the depth of this masterpiece, nominated for countless awards and now streaming exclusively on Netflix."}
                </p>

                <div className="flex space-x-3">
                    <button className="flex items-center px-6 py-2 md:px-8 md:py-3 bg-white text-black font-semibold rounded-lg text-lg hover:bg-gray-300 transition duration-300">
                        <Play fill="black" className="w-6 h-6 mr-2" />
                        Play
                    </button>
                    <button className="flex items-center px-6 py-2 md:px-8 md:py-3 bg-gray-600/70 text-white font-semibold rounded-lg text-lg hover:bg-gray-500/90 transition duration-300">
                        <Info className="w-6 h-6 mr-2" />
                        More Info
                    </button>
                </div>
            </motion.div>
        </div>
    );
};


// -------------------------------------------------------------------
// Movie Card Component
// -------------------------------------------------------------------

const MovieCard = ({ movie }) => {
    const imageUrl = getImageUrl(movie.poster_path, 'w500');

    return (
        <motion.div 
            layout 
            whileHover={{ scale: 1.1, zIndex: 10, y: -10 }} // Lift and scale on hover
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative h-32 md:h-48 min-w-[180px] md:min-w-[280px] cursor-pointer rounded-md shadow-xl bg-gray-800"
        >
            <img 
                src={imageUrl} 
                alt={movie.title} 
                className="object-cover w-full h-full rounded-md" 
            />
             {/* Hover Detail Panel */}
            <motion.div 
                initial={{ opacity: 0 }}
                className="absolute inset-0 bg-black/95 p-3 flex flex-col justify-end rounded-md opacity-0 group-hover:opacity-100 transition duration-300"
            >
                <h4 className="text-white text-lg font-semibold truncate mb-2">{movie.title.split('(')[0].trim()}</h4>
                <div className="flex items-center space-x-2 mb-2">
                    <button className="p-2 bg-white rounded-full text-black hover:bg-gray-300 transition">
                        <Play fill="black" className="w-4 h-4" />
                    </button>
                    <span className="text-green-400 text-xs font-semibold">{movie.rating || '90%'} Match</span>
                </div>
                <p className="text-gray-400 text-xs line-clamp-2">{movie.overview || 'A quick summary of the featured title.'}</p>
            </motion.div>
        </motion.div>
    );
};

// -------------------------------------------------------------------
// Row Component
// -------------------------------------------------------------------

const Row = ({ title, movies }) => {
    if (!movies || movies.length === 0) return null;

    return (
        <div className="mb-8 px-4 md:px-16">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 hover:text-gray-300 cursor-pointer transition">
                {title}
            </h3>
            
            {/* Horizontal Scroll Container - Uses custom utility class for hidden scrollbar */}
            <div className="flex space-x-2 md:space-x-4 overflow-y-hidden overflow-x-scroll p-2 scrollbar-hide">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

// -------------------------------------------------------------------
// Dashboard Main Component
// -------------------------------------------------------------------

const Dashboard = () => {
    const [moviesData, setMoviesData] = useState({
        originals: [],
        trending: [],
        topRated: [],
        action: [],
        comedy: [],
    });
    const [loading, setLoading] = useState(true);

    const fetchAllMovies = useCallback(async () => {
        setLoading(true);
        try {
            const [originals, trending, topRated, action, comedy] = await Promise.all([
                mockFetchMovies('Netflix Originals'),
                mockFetchMovies('Trending Now'),
                mockFetchMovies('Top Rated'),
                mockFetchMovies('Action Movies'),
                mockFetchMovies('Comedy'),
            ]);

            setMoviesData({ originals, trending, topRated, action, comedy });
        } catch (error) {
            // In a real application, handle error state globally
            console.error("Error fetching movie data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllMovies();
    }, [fetchAllMovies]);

    // Randomly select a featured movie from originals
    const featuredMovie = moviesData.originals[Math.floor(Math.random() * moviesData.originals.length)] || null;

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full"
                />
            </div>
        );
    }


    return (
        <div className="bg-black text-white min-h-screen overflow-x-hidden">
            <Navbar />
            
            <main>
                <Billboard featuredMovie={featuredMovie} />
                
                {/* Content Rows container shifted up to overlap Billboard footer gradient */}
                <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="relative -mt-24 md:-mt-32 pb-16 space-y-10"
                >
                    <Row title="NETFLIX ORIGINALS (Watch Now)" movies={moviesData.originals} />
                    <Row title="Trending Now" movies={moviesData.trending} />
                    <Row title="Top Rated" movies={moviesData.topRated} />
                    <Row title="Action Thrillers" movies={moviesData.action} />
                    <Row title="Comedies" movies={moviesData.comedy} />
                </motion.div>
            </main>
            
            <footer className="py-10 text-center text-gray-500 text-xs">
                <p>&copy; {new Date().getFullYear()} Netflix Clone. Built with React and Tailwind CSS.</p>
            </footer>
        </div>
    );
};

export default Dashboard;