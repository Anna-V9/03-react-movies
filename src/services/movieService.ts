import axios from "axios";
import type { AxiosResponse } from "axios";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
  vote_count?: number;
  original_language?: string;
  original_title?: string;
  genre_ids?: number[];
  adult?: boolean;
  popularity?: number;
  video?: boolean;
}

const BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN = import.meta.env.VITE_TMDB_TOKEN as string;

if (!TOKEN) {
  console.warn('VITE_TMDB_TOKEN is not set');
}

export interface FetchMoviesParams {
  query: string;
  page?: number;
  include_adult?: boolean;
}

interface TMDBSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (
  params: FetchMoviesParams,
): Promise<AxiosResponse<TMDBSearchResponse>> => {
  const config = {
    params: {
      query: params.query,
      page: params.page ?? 1,
      include_adult: params.include_adult ?? false,
      language: 'en-US',
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
  };

  return axios.get<TMDBSearchResponse>(
    `${BASE_URL}/search/movie`,
    config,
  );
};

