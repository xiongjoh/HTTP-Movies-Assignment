import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie'
import AddMovie from './Movies/AddMovie'
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  // to keep updating/fetching movieList everytime it is changed
  const [fetch, setFetch] = useState(false)

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  // fetch toggles to get movieLists when used to delete/update
  useEffect(() => {
    getMovieList();
  },[fetch]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>
      <Route  path="/movies/:id">
        <Movie addToSavedList={addToSavedList} fetch={fetch} setFetch={setFetch}/>
      </Route>
      <Route  path='/update-movie/:id'>
        <UpdateMovie movies={movieList} setMovies={setMovieList} fetch={fetch} setFetch={setFetch}/>
      </Route>
      <Route path='/add-movie'>
        <AddMovie movies={movieList} setMovies={setMovieList}/>
      </Route>
    </>
  );
};

export default App;
