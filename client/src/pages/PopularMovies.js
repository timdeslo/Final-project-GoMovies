import React from "react";
import {useState, useEffect} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import WatchlistButton from "../buttons/WatchlistButton";

const PopularMovies = () => {
  const navigate = useNavigate();
  const [popMovie, setPopMovie] = useState([]);

  useEffect(() => {
    fetch("/popularMovies")
      .then((response) => response.json())
      .then((data) => {
        setPopMovie(data.data.results);
      })
      .catch((err) => console.error(err));
  }, []);

  return <div>{popMovie.map((items) => {
    
      return (
        <div key={items.id}>
          <div
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/movie/${items.id}`);
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${items.poster_path}`}
              alt={items.title}
            />
            <p>{items.title}</p>
          </div>
          <WatchlistButton item={items} />
        </div>
      );
    
  })}</div>;
};

export default PopularMovies;
