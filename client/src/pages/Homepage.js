import {useState, useEffect} from "react";
import styled from "styled-components";
import {useNavigate, Link} from "react-router-dom";
import WatchlistButton from "../buttons/WatchlistButton";

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
      {!topMovie ? (
        <p>loading</p>
      ) : (
        <Container>
          <Link to="/topmovies">
            <h1>Top Rated Movies</h1>
          </Link>
          <Div>
            {topMovie.map((items) => {
              if (topMcounter < 6) {
                topMcounter++;
                return (
                  <div key={items.id}>
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
                      <p>{items.title}</p>
                    </div>
                    <WatchlistButton item={items} />
                  </div>
                );
              }
            })}
          </Div>
          <Link to="/popularmovies">
          <h1>Most Popular Movies</h1>
          </Link>
          <Div>
            {popMovie.map((items) => {
              if (popMcounter < 6) {
                popMcounter++;
                return (
                  <div key={items.id}>
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
                      <p>{items.title}</p>
                    </div>
                    <WatchlistButton item={items} />
                  </div>
                );
              }
            })}
          </Div>
          <Link to="/topshows">
          <h1>Top Rated Shows</h1>
          </Link>
          <Div>
            {topShows.map((items) => {
              if (topScounter < 6) {
                topScounter++;
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
              }
            })}
          </Div>
          <Link to="/popularshows">
          <h1>Most Popular Shows</h1>
          </Link>
          <Div>
            {popShows.map((items) => {
              if (popScounter < 6) {
                popScounter++;
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
              }
            })}
          </Div>
        </Container>
      )}
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 200px;
`;
const ImgMovie = styled.img`
  width: 100px;
`;

const Div = styled.div`
  display: flex;
`;
export default Homepage;
