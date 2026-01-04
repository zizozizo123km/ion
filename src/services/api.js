import axios from 'axios';

// Load environment variables (Vite requires VITE_ prefix)
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

if (!API_KEY) {
  console.error("CRITICAL ERROR: VITE_TMDB_API_KEY is not defined in environment variables.");
}

// ----------------------------------------------------
// Axios Instance Configuration
// ----------------------------------------------------

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'ar-AE', // Setting default language to Arabic (تطبيق نتفلكس requires localization consideration)
  },
  // Optional: Add a timeout to prevent hanging requests
  timeout: 10000, 
});

// Optional: Add an interceptor for debugging or consistent error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Request Failed:", error.response || error.message);
    return Promise.reject(error);
  }
);

// ----------------------------------------------------
// Image Configuration & Helpers
// ----------------------------------------------------

export const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/';
export const POSTER_SIZE = 'w500'; 
export const BACKDROP_SIZE = 'w1280'; 
export const PROFILE_SIZE = 'w185'; 

/**
 * Constructs the full URL for an image resource.
 * @param {string} path - The relative path provided by the API (e.g., /abc.jpg).
 * @param {string} size - The desired size string (e.g., POSTER_SIZE).
 * @returns {string | null} The full image URL or null if path is missing.
 */
export const getImageUrl = (path, size = POSTER_SIZE) => {
    if (!path) return null;
    return `${IMAGE_BASE_URL}${size}${path}`;
};


// ----------------------------------------------------
// API Endpoints Definition
// ----------------------------------------------------

export const Endpoints = {
    // General Categories
    trending: (time_window = 'week') => `/trending/all/${time_window}`, // day | week
    
    // Media Details (Universal)
    details: (type, id) => `/${type}/${id}`, // type: movie or tv

    // Movie Endpoints
    movie: {
        popular: '/movie/popular',
        topRated: '/movie/top_rated',
        upcoming: '/movie/upcoming',
        nowPlaying: '/movie/now_playing',
        credits: (movieId) => `/movie/${movieId}/credits`,
        videos: (movieId) => `/movie/${movieId}/videos`,
        similar: (movieId) => `/movie/${movieId}/similar`,
    },

    // TV Show Endpoints
    tv: {
        popular: '/tv/popular',
        topRated: '/tv/top_rated',
        onTheAir: '/tv/on_the_air',
        airingToday: '/tv/airing_today',
        credits: (tvId) => `/tv/${tvId}/credits`,
        videos: (tvId) => `/tv/${tvId}/videos`,
        similar: (tvId) => `/tv/${tvId}/similar`,
    },
    
    // Genres
    genres: (type = 'movie') => `/genre/${type}/list`, // movie | tv

    // Search
    searchMulti: '/search/multi', 
};

// ----------------------------------------------------
// Export API instance
// ----------------------------------------------------

export default api;