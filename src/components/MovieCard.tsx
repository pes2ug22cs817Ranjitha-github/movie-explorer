import Image from 'next/image';

const MovieCard = ({ movie }) => {
  const imagePath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/fallback.jpg'; // fallback image in public folder

  return (
    <div className="rounded shadow p-2">
      <Image
        src={imagePath}
        alt={movie.title}
        width={300}
        height={450}
        className="rounded"
      />
      <h2 className="mt-2 font-semibold">{movie.title}</h2>
      <p className="text-sm text-yellow-600">⭐ {movie.vote_average}</p>
    </div>
  );
};

export default MovieCard;
