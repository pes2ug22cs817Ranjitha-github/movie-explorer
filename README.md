# 🎬 Movie Explorer App
Welcome to **Movie Explorer** — a web app built using **Next.js 14**, **TypeScript**, and **Tailwind CSS** that allows users to explore movies using the TMDB API.

------

## 📌 Problem Statement
Create a **Movie Explorer App** using Next.js, where users can:

- Browse movies
- Search for specific ones
- View detailed information
- Save their favorite movies

------

## 🎯 Objective
Build a responsive and feature-rich movie browser app with authentication and persistent user data using TMDB API.

------

## ✅ Requirements

### 1. 🔧 Project Setup
Use Next.js 14 with the App Router
Use TypeScript for type safety
Use Tailwind CSS for styling

✅ Features Implemented:
Initialized project using create-next-app with App Router and TypeScript
Installed and configured Tailwind CSS using PostCSS
Cleaned up boilerplate files and added global styles
Verified project runs on http://localhost:3000

🧩 Folder Structure:

src/
├── app/
│   ├── layout.tsx         // App layout with Tailwind global styles
│   └── page.tsx           // Home page
├── styles/
│   └── globals.css        // Tailwind CSS imports and base styles
├── public/
│   └── favicon.ico        // Default favicon

⚙️ Tooling Setup:
Tailwind CSS initialized via:
npx tailwindcss init -p

Tailwind config and globals set in:
tailwind.config.js
src/styles/globals.css

🧪 Test Steps:
Run npm run dev

Visit http://localhost:3000
Confirm default homepage renders with Tailwind styling applied

📸 Screenshots:
**✅ Terminal Setup**
![Create App](./public/screenshots/create-next-app.png)

**✅ Running on Localhost**
![Homepage](./public/screenshots/localhost-home.png)


---------------------------

### 2. 🔐 Authentication
Implement Login & Register using NextAuth.js or JWT-based authentication
Store user auth state in localStorage or cookies
Restrict access to main features for logged-in users only

✅ Features Implemented:
Setup NextAuth.js with Credentials Provider (or optional GitHub/Google provider)
Created login & register pages with form validations
Auth state stored via NextAuth session cookie
Protected routes using useSession() from next-auth/react
Redirects unauthenticated users to login

🧩 Folder Structure:

src/
├── app/
│   ├── login/page.tsx           // Login form page
│   ├── register/page.tsx        // Register form page
│   ├── dashboard/page.tsx       // Protected route (only for logged-in users)
│   └── api/
│       └── auth/                // NextAuth API route
│           └── [...nextauth].ts
├── components/
│   └── AuthForm.tsx             // Reusable auth form component

⚙️ Auth Setup:
.env.local includes:

NEXTAUTH_SECRET=supersecretkey123
NEXTAUTH_URL=http://localhost:3000
NextAuth config ([...nextauth].ts):

import CredentialsProvider from 'next-auth/providers/credentials';
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Custom auth logic (DB or mock)
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
};

🔐 Protection Example:

import { useSession } from 'next-auth/react';
export default function Dashboard() {
  const { data: session, status } = useSession();
  if (status === 'loading') return <p>Loading...</p>;
  if (!session) return <Redirect to="/login" />;
  return <p>Welcome, {session.user?.name}!</p>;
}

🧪 Test Steps:
Register a new user via /register
Login via /login
Visit /dashboard → only accessible after login
Inspect DevTools → check session cookie or JWT token

📸 Screenshot Suggestions:

Login and Register pages
Authenticated view (e.g., dashboard)
Unauthorized redirect to login
DevTools showing auth token/session

📸 Screenshots:
**Login Page**
![Login Page](./public/screenshots/login-page.png)



---------------------------

### 3. 🎞️ Movie Listing Page
- Fetch and display movies from **TMDB API**
- Show **poster, title, rating** for each movie
- Implement **infinite scrolling or pagination**   

✅ Features Implemented:
Fetches movie data from TMDB API (/movie/popular endpoint).

Displays:
Movie poster
Movie title
Movie rating
Implements infinite scroll to load more movies as the user scrolls down.
Uses Next.js Image Optimization (next/image).

🧩 Folder Structure:

src/
├── app/
│   ├── page.tsx           // Home page using dynamic import
│   └── api/
│       └── movies/
│           └── route.ts   // API route for paginated movie fetching
├── components/
│   └── MovieList.tsx      // Client component with infinite scroll
├── lib/
│   └── tmdb.ts            // TMDB fetch function

⚙️ API Setup:
TMDB API key in .env.local:

NEXTAUTH_SECRET=supersecretkey123
NEXTAUTH_URL=http://localhost:3000
TMDB_API_KEY=83262b89fb23e99a3fbf69508abb9319

🔧 Implementation Summary:
1. fetchPopularMovies(page) – src/lib/tmdb.ts
Fetches movies using the page param.

export async function fetchPopularMovies(page = 1) {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
}

2. API Route – src/app/api/movies/route.ts
Accepts ?page=1 as a query and returns results.

3. Client Component – src/components/MovieList.tsx
Uses useEffect + IntersectionObserver to trigger loading next page when user scrolls.
Images, title, and rating are shown in a grid.

4. Home Page – src/app/page.tsx
Dynamically imports MovieList with { ssr: false } for client-only functionality.

import dynamic from 'next/dynamic';
const MovieList = dynamic(() => import('@/components/MovieList'), { ssr: false });

export default function HomePage() {
  return <MovieList />;
}

🧪 Test Steps:
Run npm run dev.
Open http://localhost:3000.
You should see 20 movies.
As you scroll down, more movies load automatically.

📸 Screenshots:
public/screenshots/movie-listing.png
public/screenshots/infinite-scroll.png
public/screenshots/api-fetch-code.png
public/screenshots/movie-list-component.png

🎥 Infinite Scroll Demo
[▶️ Watch Infinite Scroll in Action](./public/videos/infinite-scroll-demo.mp4)


--------------------------- 

### 4. 🔎 Search Functionality
- Add a **search bar** for dynamic movie search
- Fetch and display search results from the API

✅Features Implemented
A search bar allows users to dynamically search for movies by title.
Search results are fetched in real-time from the TMDB API and displayed immediately.
Optimized with a debounce to avoid excessive API calls during typing.

📦 File Structure Involved

src/
├── app/
│   └── page.tsx               // Home page with search integration
├── components/
│   ├── SearchBar.tsx          // Input component for search queries
│   └── MovieList.tsx          // Displays movies based on the search
├── hooks/
│   └── useDebounce.ts         // Custom hook to debounce search input

💻 Implementation Overview
1. SearchBar.tsx
A controlled input component that captures user search input and updates the parent state.

'use client';

type Props = {
  onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  return (
    <input
      type="text"
      placeholder="Search movies..."
      onChange={(e) => onSearch(e.target.value)}
      className="w-full max-w-lg p-2 border border-gray-300 rounded-lg shadow-sm"
    />
  );
}

2. useDebounce.ts
A custom hook to reduce the frequency of API calls as the user types.

import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

3. page.tsx (Home Page)
Main page where the search logic is integrated.

'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import SearchBar from '@/components/SearchBar';
import { useDebounce } from '@/hooks/useDebounce';

const MovieList = dynamic(() => import('@/components/MovieList'), { ssr: false });

export default function HomePage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  return (
    <div className="p-4">
      <SearchBar onSearch={(q) => setQuery(q)} />
      <MovieList query={debouncedQuery} />
    </div>
  );
}

4. MovieList.tsx
Fetches data from TMDB based on the search query.

'use client';

import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

export default function MovieList({ query }: { query: string }) {
  const [movies, setMovies] = useState([]);
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    async function fetchMovies() {
      const endpoint = query
        ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

      const res = await fetch(endpoint);
      const data = await res.json();
      setMovies(data.results);
    }

    fetchMovies();
  }, [query, API_KEY]);

  return (
    <div className="mt-6">
      {query && (
        <h2 className="text-xl font-bold mb-4">Results for "{query}"</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

✅ Outcome
Typing in the search bar instantly fetches and displays movie results.

If no query is provided, popular movies are shown by default.

Fully responsive and optimized for performance.

📸 Screenshots:
public/screenshots/search-bar.png
public/screenshots/search-results.png

---------------------------

### 5. 📝 Movie Detail Page
- Clicking a movie opens a detailed page: `/movie/[id]`
- Show **title, description, rating, release date**, and more

Objective
When a user clicks on a movie card, they should be taken to a detailed page at the route: /movie/[id].

This page should display:
Title
Description (overview)
Rating
Release date
Poster image (with fallback)

🧩 Step 1: Create the Dynamic Route
📁 Create this file:
src/app/movie/[id]/page.tsx
This sets up a dynamic route like /movie/123, where 123 is the movie ID.

🧩 Step 2: Add Movie Fetching Logic
The code for page.tsx:

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

    return await res.json();
  } catch (error) {
    console.error('Error fetching movie:', error);
    return null;
  }
}

🧩 Step 3: Build the Page UI
Below the fetch logic in the same file, add the page component:

export default async function MovieDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await getMovieDetails(params.id);

  if (!movie) {
    notFound(); // Shows 404 page if movie not found
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
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

      <p className="text-gray-700 mb-2">
        <strong>Rating:</strong> ⭐ {movie.vote_average}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p className="text-gray-700 whitespace-pre-line">
        <strong>Overview:</strong> {movie.overview}
      </p>
    </div>
  );
}

🧩 Step 4: Link Movie Cards to Detail Page
Open your MovieList.tsx file and wrap each movie card with a <Link>:

import Link from 'next/link';

<Link href={`/movie/${movie.id}`}>
  <div className="bg-white rounded-lg shadow p-2 cursor-pointer hover:shadow-lg transition">
    <Image
      src={
        movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : '/fallback.jpg'
      }
      alt={movie.title}
      width={300}
      height={450}
      className="rounded"
    />
    <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
    <p className="text-sm text-gray-600">⭐ {movie.vote_average}</p>
  </div>
</Link>

🧪 Step 5: Test the Page
Run your app terminal:

npm run dev
Visit:
http://localhost:3000

Click on any movie → You should be redirected to /movie/[id] and see the full details.

✅ Title
✅ Poster
✅ Rating
✅ Release date
✅ Overview

📸 Screenshots:
public/screenshots/movie-detail-page.png
public/screenshots/movie-detail-routing.png
public/screenshots/movie-detail-api-code.png
public/screenshots/movie-detail-component.png

---------------------------

### 6. ❤️ Favorite Movies Feature
- Users can **add/remove favorites**
- Store favorites in **localStorage**
- Include a **"My Favorites"** page
  
 Objectives
✅ Add/Remove movies from favorites
✅ Store favorites in localStorage to persist across sessions
✅ Create a Favorites Page to view saved movies

Step 1: Create useFavorites Hook
Path: src/hooks/useFavorites.ts

import { useEffect, useState } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const toggleFavorite = (id: number) => {
    const updated = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];

    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const isFavorite = (id: number) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite };
}

Step 2: Add Favorite Button to Movie Cards
File: MovieList.tsx
✔ Add ❤️ / 🤍 toggle on each movie

const { toggleFavorite, isFavorite } = useFavorites();

// Inside your movie card
<button
  onClick={() => toggleFavorite(movie.id)}
  className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
>
  <span className="text-xl">{isFavorite(movie.id) ? '❤️' : '🤍'}</span>
</button>

Step 3: Create Favorites Page
Path: src/app/favorites/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import Image from 'next/image';

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string | null;
}

export default function FavoritesPage() {
  const { favorites } = useFavorites();
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

    if (favorites.length > 0) fetchFavorites();
  }, [favorites]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Favorite Movies</h1>
      {movies.length === 0 ? (
        <p className="text-gray-500">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-white rounded-lg shadow p-2">
              <Image
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : '/fallback.jpg'
                }
                alt={movie.title}
                width={300}
                height={450}
                className="rounded"
              />
              <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
              <p className="text-sm text-gray-600">⭐ {movie.vote_average}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Step 4: Add Link to Navbar
path: src/app/layout.tsx:

import Link from 'next/link';

<Link href="/favorites" className="text-blue-500 hover:underline">
  My Favorites
</Link>

✅ How to Test
Go to the home page and click ❤️ on a movie.
Open DevTools → Application Tab → Local Storage → favorites
You’ll see movie IDs stored like [986056,574475]
Navigate to /favorites or click the "My Favorites" link.
You’ll see all favorited movies rendered from TMDB API.

📸 Screenshot:
public/screenshots/favorite-button.png
public/screenshots/add-to-favorites.png
public/screenshots/favorites-page.png
public/screenshots/favorites-localstorage.png

---------------------------


### 7. 🖼️ UI & Performance
- Responsive design using **Tailwind CSS**
- Use **next/image** for image optimization
- Use **loading skeletons** for better performance

Step 1: Responsive UI with Tailwind CSS
✅ Implementation:

<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
This automatically adapts the number of columns:

Device	Grid Columns
Mobile	2 
Tablet (sm)	3
Desktop (md+)	4

📱 Step 2: Test Layouts
Open Chrome browser.
Right-click → Inspect or press Ctrl+Shift+I.
Click the 📱 Device Toolbar icon.

Select devices:
✅ iPhone SE → Shows 2 cards.
✅ iPad → Shows 3 cards.
✅ Responsive → Resize freely to test.

Observe the number of cards per row adjusts dynamically.

📸 Step 3: Image Optimization with next/image
✅ Used Image Component:

<Image
  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
  width={300}
  height={450}
  alt={movie.title}
  className="rounded w-full h-[450px] object-cover"
/>

Lazy loading enabled automatically.
WebP and responsive images delivered.
Improves page speed and SEO.

✅ Configured in next.config.js:

images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'image.tmdb.org',
      pathname: '/t/p/**',
    },
  ],
},

💨 Step 4: Loading Performance (Skeleton UI)
✅ MovieSkeleton component shown while data loads:

{loadingInitial &&
  Array.from({ length: 8 }).map((_, i) => <MovieSkeleton key={i} />)}

Shows placeholders instead of blank screen.
Makes the app feel faster.
Prevents layout shifts while content loads.

 Responsive Layout Testing
✅ iPhone SE layout	Show 2 cards per row in DevTools
✅ iPad layout	Show 3 cards per row in DevTools
✅ Desktop layout	Show 4 cards per row in wide screen or full window
✅ Responsive resizing	Show grid auto-adjusting while resizing the window manually


📸 Screenshots:
public/screenshots/responsive iPhone SE
public/screenshots/responsive ipad
public/screenshots/responsive-ui.png
public/screenshots/loading-skeleton.png

















#   m o v i e - e x p l o r e r - a p p  
 