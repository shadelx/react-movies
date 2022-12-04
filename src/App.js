import React from "react";
import { useEffect, useState } from "react";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

import './App.css';

//ce4d412b
const API_URL = "http://www.omdbapi.com?apikey=ce4d412b";

// const movie1 ={
//     "Title": "Batman Begins",
//     "Year": "2005",
//     "imdbID": "tt0372784",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
// }

const App = () => {
  const [seachTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  //connect to API
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search)
  };

  useEffect(() => {
    searchMovies('Batman')
  }, []);

  return (
    <div className="container app">
      
      <h1>Movies React App</h1>
      <div className="search">
        <input
           className="input" 
           placeholder="seach for movies"
           value={seachTerm}
           onChange={(e) => setSearchTerm(e.target.value)} 
           onKeyPress ={(e) => {
            if (e.key ==='Enter'){
              e.preventDefault();
              searchMovies(seachTerm)
            }
           }}
        />
        <img 
            src={SearchIcon} 
            alt="search"
            onClick={() => searchMovies(seachTerm)} 
        />
      </div>

      <div className="movies-container">
        {(movies.length>0)?
          ( movies.map((movie) => (
            <MovieCard movie={movie}/>
          ))):
          (<div className="empty">
              <h2>no movies found</h2>
          </div>)
        }
      </div>
      

    </div>
  );
};

export default App;
