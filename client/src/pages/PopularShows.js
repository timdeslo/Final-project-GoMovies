import React from "react";
import {useState, useEffect} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import WatchlistButton from "../buttons/WatchlistButton";

const PopularShows = () => {
  const navigate = useNavigate()
  const [popShows, setPopShows] = useState([]);

  useEffect(() => {
    fetch("/popularShows")
      .then((response) => response.json())
      .then((data) => {
        setPopShows(data.data.results);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {popShows.map((items) => {
        return (
          <div key={items.id}>
            <div
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/show/${items.id}`);
              }}
            >
              <ImgMovie
                src={`https://image.tmdb.org/t/p/w500/${items.poster_path}`}
                alt={items.title}
              />
              <p>{items.name}</p>
            </div>
            <WatchlistButton item={items} />
          </div>
        );
      })}
    </div>
  );
};

const ImgMovie = styled.img`
  width: 100px;
`;

export default PopularShows;
