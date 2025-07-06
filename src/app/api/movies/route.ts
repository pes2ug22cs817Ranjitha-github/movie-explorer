// src/app/api/movies/route.ts

import { NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || '1';

  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json(data.results);
}
