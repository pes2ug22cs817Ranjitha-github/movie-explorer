'use client';

import { useEffect, useState } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import Image from 'next/image';
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string | null;
  release_date?: string;
  overview?: string;
}

export default function FavoritesPage() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const all = await Promise.all(
        favorites.map(async (id) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
          );
          return res.ok ? res.json() : null;
        })
      );
      setMovies(all.filter(Boolean));
    };

    if (favorites.length > 0) {
      fetchFavorites();
    } else {
      setMovies([]);
    }
  }, [favorites]);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Favorite Movies</h1>

      {movies.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="relative group">
              {/* Link to detail page */}
              <Link href={`/movie/${movie.id}`}>
                <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow p-2 cursor-pointer hover:shadow-md transition-shadow">
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : '/fallback.jpg'
                    }
                    alt={movie.title}
                    width={300}
                    height={450}
                    className="rounded w-full h-[450px] object-cover"
                  />
                  <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    ⭐ {movie.vote_average}
                  </p>
                </div>
              </Link>

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(movie.id)}
                className="absolute top-2 right-2 bg-white dark:bg-gray-700 p-1 rounded-full shadow hover:scale-110 transition"
              >
                <span className="text-xl">
                  {isFavorite(movie.id) ? '❤️' : '🤍'}
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
