import React from 'react';
import { Metadata } from 'next';

type PageProps = {
  params: {
    id: string;
  };
};

// Optional: dynamically generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = params;

  return {
    title: `Movie #${id} | Movie Explorer`,
    description: `Details and information about Movie ID: ${id}`,
  };
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = params;

  // ✅ Example fetch logic (replace with real TMDB API call)
  // const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
  // const movie = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">🎬 Movie Detail Page</h1>
      <p className="mt-4">You are viewing movie with ID: <strong>{id}</strong></p>

      {/* Optional: display movie data if you fetch it */}
      {/* <div>{movie.title}</div> */}
    </div>
  );
}
