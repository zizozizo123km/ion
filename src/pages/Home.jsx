import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Info } from 'lucide-react';
import api from '../services/api';
import MovieRow from '../components/MovieRow';
import FeaturedMovie from '../components/FeaturedMovie';
import Header from '../components/Header';
import Loading from '../components/Loading';

const Home = () => {
    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [blackHeader, setBlackHeader] = useState(false);

    useEffect(() => {
        const loadAll = async () => {
            try {
                // 1. Get List of Movies
                let list = await api.getHomeList();
                setMovieList(list);

                // 2. Get Featured Movie
                let originals = list.find(i => i.slug === 'originals');
                if (originals && originals.items.length > 0) {
                    let randomChosen = Math.floor(Math.random() * originals.items.length);
                    let chosen = originals.items[randomChosen];
                    
                    let chosenInfo = await api.getMovieInfo(chosen.id, 'tv');
                    setFeaturedData(chosenInfo);
                }

                setLoading(false);
            } catch (error) {
                console.error("Error loading data:", error);
                setLoading(false);
            }
        };

        loadAll();
    }, []);

    useEffect(() => {
        const scrollListener = () => {
            if (window.scrollY > 10) {
                setBlackHeader(true);
            } else {
                setBlackHeader(false);
            }
        };

        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener);
        };
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="page bg-black text-white min-h-screen">
            <Header black={blackHeader} />

            {featuredData && 
                <FeaturedMovie item={featuredData} />
            }

            <section className="lists mt-[-150px] md:mt-[-100px] pb-20">
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items} />
                ))}
            </section>

            <footer>
                <div className="text-center py-10 text-gray-400 text-sm border-t border-gray-800">
                    <p>
                        Developed for educational purposes by a Senior React Developer.<br/>
                        Rights to imagery and data belong to Netflix and The Movie Database (TMDb).
                    </p>
                    <p className="mt-2">
                         Data provided by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">TMDb</a>
                    </p>
                </div>
            </footer>
            
            {movieList.length === 0 && !loading && (
                <div className="flex justify-center items-center h-screen text-2xl">
                    Loading... Please wait.
                </div>
            )}
        </div>
    );
};

export default Home;