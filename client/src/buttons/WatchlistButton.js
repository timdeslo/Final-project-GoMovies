import React from "react";
import {useState, useContext} from "react";
import styled from "styled-components";
import {UserContext} from "../context/UserContext";

const WatchlistButton = ({item}) => {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [message, setMessage] = useState("");

  const handleClick = (user_id, item) => {

    fetch(`/addToWatchlist`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user_id,
        actualItem: item,
      }),
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.status === 404) {
          setMessage(data.error);
        } else if (data.status === 200) {
          setMessage(data.message);
        }
      });
  };

  return (
    <div>
      <button onClick={() => handleClick(currentUser._id, item)}>
        Add To Watchlist
      </button>
      {message !== null ? <p>{message}</p> : null}
    </div>
  );
};

export default WatchlistButton;
