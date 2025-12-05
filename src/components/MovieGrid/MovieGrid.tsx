import React from 'react';
import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onSelect }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <ul className={css.grid}>
      {movies.map((m) => (
        <li key={m.id}>
          <div
            className={css.card}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(m)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onSelect(m);
            }}
          >
            <img
              className={css.image}
              src={
                m.poster_path
                  ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                  : '/placeholder.png'
              }
              alt={m.title}
              loading="lazy"
            />
            <h2 className={css.title}>{m.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;
