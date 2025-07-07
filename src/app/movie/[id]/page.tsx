// src/app/movie/[id]/page.tsx
import React from "react";

type MoviePageProps = {
  params: {
    id: string;
  };
};

export default async function MovieDetailPage({ params }: MoviePageProps) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const movie = await res.json();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="rounded-lg mb-4"
      />
      <p className="text-lg text-gray-700 mb-2">{movie.overview}</p>
      <p className="text-sm text-gray-500">Release Date: {movie.release_date}</p>
      <p className="text-sm text-gray-500">Rating: {movie.vote_average} / 10</p>
    </div>
  );
}
