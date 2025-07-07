import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface MovieDetailPageProps {
  params: {
    id: string;
  };
}

// ✅ Correct: Promise<Metadata>
export async function generateMetadata({ params }: MovieDetailPageProps): Promise<Metadata> {
  return {
    title: `Movie #${params.id}`,
  };
}

// ✅ Correct: `params` is a plain object, not a Promise
export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const movieId = params.id;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">🎬 Movie Detail Page</h1>
      <p>Movie ID: {movieId}</p>
    </div>
  );
}
