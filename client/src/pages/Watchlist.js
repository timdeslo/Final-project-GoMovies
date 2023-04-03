import React, {useEffect} from "react";
import {UserContext} from "../context/UserContext";
import {useContext, useState} from "react";
import {Link} from "react-router-dom";

const Watchlist = () => {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [Text, setText] = useState("");
  const [userWatchlist, setUserWatchlist] = useState([]);
  const [updated, setUpdated] = useState();

  useEffect(() => {
    fetch(`/watchlistNrating/${currentUser._id}`)
      .then((response) => response.json())
      .then((data) => {
        setUserWatchlist(data.data);
      })
      .catch((err) => console.error(err));
  }, [updated]);

  const handleClickButtonDelete = (id) => {
    fetch(`/removeItemWatchlist/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser._id,
      }),
    })
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        setUpdated(data.data);
      });
  };

  const handleSubmit = (item, event, num, id) => {
    event.preventDefault();
    let rating = "";
    if (num == 1) {
      rating = "good";
    } else if (num == 2) {
      rating = "bad";
    }
    fetch("/addToRating", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser._id,
        item: item,
        comment: Text,
        gNb: rating,
      }),
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.status === 404) {
          setComment(data.error);
        } else if (data.status === 200) {
          setComment(data.message);
          handleClickButtonDelete(id);
        }
      });
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  if (!userWatchlist.watchlist) {
    return <p>loading</p>;
  }
  return (
    <div>
      {userWatchlist.watchlist.length === 0 ? (
        <h2>
          Looks like your watchlist is empty, Click <Link to={"/"}>here</Link>{" "}
          if you would like to keep looking around !{" "}
        </h2>
      ) : (
        <div>
          {userWatchlist.watchlist.map((item) => {
            return (
              <div key={item.id}>
                <p>{item.id}</p>
                <h1>{item.title || item.name}</h1>
                <button onClick={() => handleClickButtonDelete(item.id)}>
                  Remove from Watchlist
                </button>
                <div>
                  <label>1</label>
                  <textarea
                    rows={2}
                    placeholder="Leave a comment"
                    value={Text.id}
                    onChange={handleChange}
                  ></textarea>
                  <button
                    onClick={(event) => handleSubmit(item, event, 1, item.id)}
                  >
                    Good
                  </button>
                  <button onClick={(event) => handleSubmit(item, event, 2, item.id)}>
                    Bad
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
