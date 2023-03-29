import {useState, useEffect} from "react";
import styled from "styled-components"

const Homepage = () => {
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
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("/popularMovies")
      .then((response) => response.json())
      .then((data) => {
        setPopMovie(data.data.results);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("/topShows")
      .then((response) => response.json())
      .then((data) => {
        setTopShows(data.data.results);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("/topShows")
      .then((response) => response.json())
      .then((data) => {
        setPopShows(data.data.results);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {!topMovie ? (
        <p>loading</p>
      ) : (
        <Container>
            <h1>Top Rated Movies</h1>
          <Div>
          {topMovie.map((items) => {
            if(topMcounter < 6) {
              topMcounter++;
              return (
                <div key={items.id}>
                  <ImgMovie src={`https://image.tmdb.org/t/p/w500/${items.poster_path}`} alt={items.title} />
                  <p>{items.title}</p>
                </div>
              );
            }
          })}
          </Div>
          <h1>Most Popular Movies</h1>
          <Div>
            {popMovie.map((items) => {
              if(popMcounter < 6) {
                popMcounter++
                return (
                  <div key={items.id}>
                    <ImgMovie src={`https://image.tmdb.org/t/p/w500/${items.poster_path}`} alt={items.title} />
                    <p>{items.title}</p>
                  </div>
                );
              }
            })}
          </Div>
          <h1>Top Rated Shows</h1>
          <Div>
            {topShows.map((items) => {
              if(topScounter < 6) {
                topScounter++
                return (
                  <div key={items.id}>
                    <ImgMovie src={`https://image.tmdb.org/t/p/w500/${items.poster_path}`} alt={items.title} />
                    <p>{items.name}</p>
                  </div>
                );
              }
            })}
          </Div>
          <h1>Most Popular Shows</h1>
          <Div>
            {popShows.map((items) => {
              if(popScounter < 6) {
                popScounter++
                return (
                  <div key={items.id}>
                    <ImgMovie src={`https://image.tmdb.org/t/p/w500/${items.poster_path}`} alt={items.title} />
                    <p>{items.name}</p>
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
