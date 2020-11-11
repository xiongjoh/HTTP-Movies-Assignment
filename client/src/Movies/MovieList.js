import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import axios from 'axios'


function MovieList({ movies }) {

  const history = useHistory()

  return (
    <div className="movie-list">
      <button className='add-movie-button' onClick={() => history.push('/add-movie')}>Add Movie</button>
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
