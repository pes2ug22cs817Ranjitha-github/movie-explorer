import { Metadata } from "next";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // your metadata logic here
  return {
    title: `Movie ${params.id}`,
  };
}

export default async function MovieDetailPage({ params }: Props) {
  const movieId = params.id;

  // your fetch logic here
  return (
    <div>
      <h1>Movie Detail Page for ID: {movieId}</h1>
    </div>
  );
}
