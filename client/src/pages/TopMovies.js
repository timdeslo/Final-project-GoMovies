import React from "react";
import {useState, useEffect} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import WatchlistButton from "../buttons/WatchlistButton";
import {FiStar, FiLoader} from "react-icons/fi";

const TopMovies = () => {
  const navigate = useNavigate();
  const [topMovie, setTopMovie] = useState([]);

  useEffect(() => {
    fetch("/topMovies")
      .then((response) => response.json())
      .then((data) => {
        setTopMovie(data.data.results);
        window.scrollTo(0, 0)
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {topMovie.length == 0 ? (
        <Waiting>
          <Loader />
        </Waiting>
      ) : (
        <Container>
          <Div>
            {topMovie.map((items) => {
              return (
                <Divmap key={items.id}>
                  <div
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/movie/${items.id}`);
                    }}
                  >
                    <ImgMovie
                      src={`https://image.tmdb.org/t/p/w500/${items.poster_path}`}
                      alt={items.title}
                    />
                    <UnderImg>
                      <Star />
                      <p>{items.vote_average}</p>
                    </UnderImg>
                    <Pname>{items.title}</Pname>
                  </div>
                  <WatchlistDiv>
                    <WatchlistButton item={items} />
                  </WatchlistDiv>
                </Divmap>
              );
            })}
          </Div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
`;

const Div = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(5, 1fr);
  
`;

const Divmap = styled.div`
  height: 470px;
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

const UnderImg = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0px;
  margin-top: 10px;
  height: 15px;
`;

const Star = styled(FiStar)`
  color: yellow;
  margin-right: 10px;
  margin-left: 20px;
  fill: yellow;
`;

const Pname = styled.p`
  margin-top: 10px;
  margin-left: 20px;
  font-size: 13px;
`;

const WatchlistDiv = styled.div`
  display: flex;
  margin-top: 0px;
  margin-left: 10px;
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
export default TopMovies;
