import {useState, useEffect} from "react";
import styled from "styled-components";
import {useNavigate, Link} from "react-router-dom";
import WatchlistButton from "../buttons/WatchlistButton";
import {FiStar, FiLoader, FiChevronRight} from "react-icons/fi";

const Homepage = () => {
  const navigate = useNavigate();
  const [topMovie, setTopMovie] = useState([]);
  const [popMovie, setPopMovie] = useState([]);
  const [topShows, setTopShows] = useState([]);
  const [popShows, setPopShows] = useState([]);
  let topMcounter = 0;
  let popMcounter = 0;
  let topScounter = 0;
  let popScounter = 0;

  useEffect(() => {
    fetch("/topMovies")
      .then((response) => response.json())
      .then((data) => {
        setTopMovie(data.data.results);
        console.log(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("/popularMovies")
      .then((response) => response.json())
      .then((data) => {
        setPopMovie(data.data.results);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("/topShows")
      .then((response) => response.json())
      .then((data) => {
        setTopShows(data.data.results);
      })
      .catch((err) => console.error(err));
  }, []);

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
      {topMovie.length == 0 ? (
        <Waiting>
        <Loader />
      </Waiting>
      ) : (
        <Container>
          <Wrapper>
            <Links to="/topmovies">
              <h1>Top Rated Movies</h1>
              <Arrow />
            </Links>
            <Div>
              {topMovie.map((items) => {
                if (topMcounter < 6) {
                  topMcounter++;
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
                }
              })}
            </Div>
          </Wrapper>
          <Wrapper>
            <Links to="/popularmovies">
              <h1>Most Popular Movies</h1>
              <Arrow />
            </Links>
            <Div>
              {popMovie.map((items) => {
                if (popMcounter < 6) {
                  popMcounter++;
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
                }
              })}
            </Div>
          </Wrapper>
          <Wrapper>
            <Links to="/topshows">
              <h1>Top Rated Shows</h1>
              <Arrow />
            </Links>
            <Div>
              {topShows.map((items) => {
                if (topScounter < 6) {
                  topScounter++;
                  return (
                    <Divmap key={items.id}>
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
                        <UnderImg>
                          <Star />
                          <p>{items.vote_average}</p>
                        </UnderImg>
                        <Pname>{items.name}</Pname>
                      </div>
                      <WatchlistDiv>
                        <WatchlistButton item={items} />
                      </WatchlistDiv>
                    </Divmap>
                  );
                }
              })}
            </Div>
          </Wrapper>
          <Wrapper>
            <Links to="/popularshows">
              <h1>Most Popular Shows</h1>
              <Arrow />
            </Links>
            <Div>
              {popShows.map((items) => {
                if (popScounter < 6) {
                  popScounter++;
                  return (
                    <Divmap key={items.id}>
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
                        <UnderImg>
                            <Star />
                            <p>{items.vote_average}</p>
                          </UnderImg>
                          <Pname>{items.name}</Pname>
                        </div>
                        <WatchlistDiv>
                          <WatchlistButton item={items} />
                        </WatchlistDiv>
                    </Divmap>
                  );
                }
              })}
            </Div>
          </Wrapper>
        </Container>
      )}
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
`;

const Wrapper = styled.div`
  margin-top: 50px;
  width: fit-content;
  border: 1px solid black;
`;

const Links = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  color: white;
  width: 300px;
  :hover& {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const Arrow = styled(FiChevronRight)`
  width: 50px;
  height: 40px;
`;

const Divmap = styled.div`
  margin-right: 30px;
  background-color: #302f2f;
  :hover& {
    cursor: pointer;
  }
`;
const ImgMovie = styled.img`
  width: 180px;
  height: 270px;
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
  margin-left: 10px;
  fill: yellow;
`;

const Div = styled.div`
  display: flex;
  height: 420px;
`;

const Pname = styled.p`
  margin-top: 10px;
  margin-left: 10px;
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
export default Homepage;
