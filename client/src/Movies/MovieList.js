import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import axios from 'axios'


function MovieList({ movies }) {

  return (
    <div className="movie-list">
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
