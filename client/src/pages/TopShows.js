import React from "react";
import {useState, useEffect} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import WatchlistButton from "../buttons/WatchlistButton";

const TopShows = () => {
  const navigate = useNavigate();
  const [topShows, setTopShows] = useState([]);

  useEffect(() => {
    fetch("/topShows")
      .then((response) => response.json())
      .then((data) => {
        setTopShows(data.data.results);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {topShows.map((items) => {
        return (
          <div key={items.id}>
            <div
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/show/${items.id}`);
              }}
            >
              <img
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

export default TopShows;
