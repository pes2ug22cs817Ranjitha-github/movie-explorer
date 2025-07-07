import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `Movie #${params.id}`,
  };
}

export default async function MovieDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">🎬 Movie Detail Page</h1>
      <p>Movie ID: {params.id}</p>
    </div>
  );
}
