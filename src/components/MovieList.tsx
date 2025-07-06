'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFavorites } from '@/hooks/useFavorites';
import MovieSkeleton from './MovieSkeleton';

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string | null;
}

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  const { toggleFavorite, isFavorite } = useFavorites();

  const loadMore = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/movies?page=${page}`);
      const data = await res.json();
      setMovies((prev) => [...prev, ...data]);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    if (page === 1) {
      loadMore().then(() => setLoadingInitial(false));
    } else {
      loadMore();
    }
  }, [page, loadMore]);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Popular Movies</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="relative group">
            <Link href={`/movie/${movie.id}`}>
              <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow p-2">

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
                  priority={false}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (!target.src.includes('/fallback.jpg')) {
                      target.src = '/fallback.jpg';
                    }
                  }}
                />
                <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
                <p className="text-sm text-gray-600">⭐ {movie.vote_average}</p>
              </div>
            </Link>

            {/* ❤️ Favorite button */}
            <button
              onClick={() => toggleFavorite(movie.id)}
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:scale-110 transition"
            >
              <span className="text-xl">
                {isFavorite(movie.id) ? '❤️' : '🤍'}
              </span>
            </button>
          </div>
        ))}

        {/* Skeletons for first load only */}
        {loadingInitial &&
          Array.from({ length: 8 }).map((_, i) => <MovieSkeleton key={i} />)}
      </div>

      <div ref={observerRef} className="h-10 mt-10 text-center text-gray-500">
        {loading ? 'Loading more movies...' : 'Scroll to load more'}
      </div>
    </div>
  );
}
