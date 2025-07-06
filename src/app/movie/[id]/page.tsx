import { notFound } from 'next/navigation';
import Image from 'next/image';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

async function getMovieDetails(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie:', error);
    return null;
  }
}

export default async function MovieDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await getMovieDetails(params.id);

  if (!movie) {
    notFound();
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 dark:text-white min-h-screen">

      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

      <Image
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/fallback.jpg'
        }
        alt={movie.title}
        width={500}
        height={750}
        className="mb-4 rounded"
      />

      <p className="text-gray-700 dark:text-gray-300 mb-2">
        <strong>Rating:</strong> ⭐ {movie.vote_average}
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
        <strong>Overview:</strong> {movie.overview}
      </p>
    </div>
  );
}
