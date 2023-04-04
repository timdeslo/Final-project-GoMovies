import React from "react";
import {useState, useContext} from "react";
import styled from "styled-components";
import {UserContext} from "../context/UserContext";
import {Link} from "react-router-dom";

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
          setTimeout(() => {
            setMessage("");
          }, 2000);
        }
      });
  };

  return (
    <div>
      {!currentUser ? (
        <P>Too add this item to watchlist, please <Links to="/signin">sign in</Links></P>
      ) : (
        <div>
          <Button onClick={() => handleClick(currentUser._id, item)}>
            Add To Watchlist
          </Button>
          {message !== null ? <p>{message}</p> : null}
        </div>
      )}
    </div>
  );
};

const Button = styled.button`
  font-family: "Oswald", sans-serif;
  font-weight: bold;
  padding: 10px 40px;
  border-radius: 7px;
  border: none;
  :hover& {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const P = styled.p`
width: 150px;
`;

const Links = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  color: yellow;
  width: 300px;
  :hover& {
    cursor: pointer;
    opacity: 0.5;
  }
`;
export default WatchlistButton;
