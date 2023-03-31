import React, {useEffect} from "react";
import {UserContext} from "../context/UserContext";
import {useContext, useState} from "react";
import {Link} from "react-router-dom";

const Watchlist = () => {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [characterLimit, setCharacterLimit] = useState(20);
  const [comment, setComment] = useState("");
  const [Text, setText] = useState("");
  const [userWatchlist, setUserWatchlist] = useState([]);
  const [updated, setUpdated] = useState();

  useEffect(() => {
    fetch(`/watchlist/${currentUser._id}`)
      .then((response) => response.json())
      .then((data) => {
        setUserWatchlist(data.data);
        console.log(data);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/tweet", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({status: Text}),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setComment(data.tweet);
        setText("");
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setText(event.target.value);
    setCharacterLimit(20 - inputValue.length);
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
              <div>
                <p>{item.id}</p>
                <h1>{item.title}</h1>
                <button onClick={() => handleClickButtonDelete(item.id)}>
                  Remove from Watchlist
                </button>
                <div>
                  <label>1</label>
                  <textarea
                    rows={2}
                    placeholder="Leave a comment"
                    value={Text}
                    onChange={handleChange}
                  ></textarea>
                  <div value={characterLimit}>{characterLimit}</div>
                  <button disabled={characterLimit < 0} onClick={handleSubmit}>
                    Post
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
