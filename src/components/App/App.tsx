import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import styles from './App.module.css';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import toast, { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setMovies([]); 
    setError(null);
    setLoading(true);
    try {
      const resp = await fetchMovies({ query });
      const results = resp.data.results;
      if (!results || results.length === 0) {
        toast('No movies found for your request.');
      }
      setMovies(results);
    } catch (err) {
      console.error(err);
      setError('Error');
      toast.error('There was an error, please try again...');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    setSelected(movie);
  };

  const handleCloseModal = () => {
    setSelected(null);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      <main className={styles.main}>
        {loading && <Loader />}
        {error && <ErrorMessage />}
        {!loading && !error && <MovieGrid movies={movies} onSelect={handleSelect} />}
      </main>

      <MovieModal movie={selected} onClose={handleCloseModal} />
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
