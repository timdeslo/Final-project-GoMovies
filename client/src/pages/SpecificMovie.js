import React from "react";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import WatchlistButton from "../buttons/WatchlistButton";

const SpecificMovie = () => {
  const [movie, setMovie] = useState([]);
  const {movieId} = useParams();

  useEffect(() => {
    fetch(`/movie/${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data.data);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      {!movie ? (
        <p>loading</p>
      ) : (
        <div>
          <p>{movie.title}</p>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <WatchlistButton item={movie} />
        </div>
      )}
    </div>
  );
};

export default SpecificMovie;
