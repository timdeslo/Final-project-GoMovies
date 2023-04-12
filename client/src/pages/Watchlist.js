import React, {useEffect} from "react";
import {UserContext} from "../context/UserContext";
import {useContext, useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {FiLoader} from "react-icons/fi";

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
        window.scrollTo(0, 0)
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
          setTimeout(() => {
            setComment("");
          }, 2000);
          handleClickButtonDelete(id);
        }
      });
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  if (!userWatchlist.watchlist) {
    return (
      <Waiting>
        <Loader />
      </Waiting>
    );
  }
  return (
    <div>
      <DivHeader>
        <p>
          To view the movies you have rated, please click on the view Profile page
          or click <Links to="/profile">here</Links>
        </p>
        </DivHeader>
        {userWatchlist.watchlist.length === 0 ? (
          <DivHeader>
            <H2>
              Looks like your watchlist is empty, Click <Linkss to={"/"}>here</Linkss>{" "}
              if you would like to keep looking around !{" "}
            </H2>
          </DivHeader>
      ) : (
        <Container>
          <h1>Your Watchlist</h1>
          <Div>
            {userWatchlist.watchlist.map((item) => {
              return (
                <Divmap key={item.id}>
                  <ImgMovie
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    alt={item.title}
                  />
                  <Pname>{item.title || item.name}</Pname>

                  <DivInput>
                    <textarea
                      rows={3}
                      placeholder="Leave a comment"
                      value={Text.id}
                      onChange={handleChange}
                    ></textarea>
                    <DivButton>
                      <ButtonGnB
                        onClick={(event) => handleSubmit(item, event, 1, item.id)}
                      >
                        Good
                      </ButtonGnB>
                      <ButtonGnB
                        onClick={(event) => handleSubmit(item, event, 2, item.id)}
                      >
                        Bad
                      </ButtonGnB>
                    </DivButton>
                  </DivInput>
                  <ButtonRemove
                    onClick={() => handleClickButtonDelete(item.id)}
                  >
                    Remove from Watchlist
                  </ButtonRemove>
                </Divmap>
              );
            })}
          </Div>
        </Container>
      )}
    </div>
  );
};

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

const Waiting = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  height: 100vh;
  width: 100vw;
`;

const Loader = styled(FiLoader)`
  font-size: 5em;
  animation: spin 1s linear infinite;
  color: white;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const DivHeader = styled.div`
padding-left: 50px;
font-size: 20px;
font-family: 'Oswald', sans-serif;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
`;

const H2 = styled.h2`
color: white;
display: flex;
align-items: center;
font-size: 20px;
`;

const Linkss = styled(Link)`
color: yellow;
padding: 5px;
`;

const Div = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-rows: repeat(auto, 1fr);
  grid-template-columns: repeat(5, 1fr);
`;

const Divmap = styled.div`
  height: 550px;
  width: fit-content;
  margin-right: 30px;
  margin-bottom: 50px;
  
  background-color: #302f2f;
  :hover& {
    cursor: pointer;
  }
`;

const ImgMovie = styled.img`
  width: 220px;
  height: 320px;
  margin-bottom: 0px;
  border: 1px solid #302f2f;
`;

const Pname = styled.p`
  margin-top: 10px;
  margin-left: 20px;
  font-size: 15px;
`;

const DivInput = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Oswald", sans-serif;
`;

const ButtonRemove = styled.button`
margin-top: 20px;
  margin-left: 25px;
  font-family: "Oswald", sans-serif;
  font-size: 15px;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 7px;
  border: none;
  :hover& {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const DivButton = styled.div`
  display: flex;
  margin-left: 25px;
  margin-top: 15px;
  gap: 33px;
`;

const ButtonGnB = styled.button`
  font-family: "Oswald", sans-serif;
  font-size: 15px;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 7px;
  border: none;
  :hover& {
    cursor: pointer;
    opacity: 0.5;
  }
`;
export default Watchlist;
