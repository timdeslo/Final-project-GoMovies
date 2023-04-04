import React from "react";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import WatchlistButton from "../buttons/WatchlistButton";
import {FiStar, FiLoader} from "react-icons/fi";
import styled from "styled-components";
import moment from "moment";

const SpecificMovie = () => {
  const [movie, setMovie] = useState([]);
  const {movieId} = useParams();

  useEffect(() => {
    fetch(`/movie/${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data.data);
        window.scrollTo(0, 0)
      })
      .catch((err) => console.error(err));
  }, []);

  const newTime = (runtime) => {
    const duration = moment.duration(runtime, "minutes");
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    return `${hours}h ${minutes}m`;
  };

  return (
    <Container>
      {movie.length == 0 ? (
        <Waiting>
          <Loader />
        </Waiting>
      ) : (
        <Wrapper>
          <H1>{movie.title}</H1>
          <Header>
            <DivHeaderLeft>
              <p>{movie.release_date.slice(0,4)}</p>
              <p>{newTime(movie.runtime)}</p>
            </DivHeaderLeft>
            <DivHeaderRight>
              <p>IMDB rating</p>
              <Star />
              <p>{movie.vote_average}</p>
            </DivHeaderRight>
          </Header>
          <div>
            <Imgdiv>
              <ImgPoster
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />
              <ImgBack
                src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
              />
            </Imgdiv>
          </div>
          <DivGenres>
            <Divp>
              {movie.genres && movie.genres.length > 1 && (
                <Pgenres>{movie.genres[0].name}</Pgenres>
              )}
              {movie.genres && movie.genres.length > 1 && (
                <Pgenres>{movie.genres[1].name}</Pgenres>
              )}
            </Divp>
          <DivButton>
            <WatchlistButton item={movie} />
          </DivButton>
          </DivGenres>
          <Poverview>{movie.overview}</Poverview>
        </Wrapper>
      )}
    </Container>
  );
};

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
`;

const Wrapper = styled.div`
  padding-top: 30px;
  width: fit-content;
`;

const H1 = styled.h1`
  font-size: 50px;
  margin-bottom: 0px;
  `;

const Header = styled.div`
  display: flex;
  width: 1000px;
  justify-content: space-between;
  `;

const Star = styled(FiStar)`
  color: yellow;
  margin-right: 10px;
  margin-left: 20px;
  fill: yellow;
`;

const DivHeaderLeft = styled.div`
margin-top: 0px;
display: flex;
gap: 15px;
font-size: 20px;
`;

const DivHeaderRight = styled.div`
margin-top: 0px;
display: flex;

font-size: 20px;
align-items: center;
`;

const Imgdiv = styled.div`
  display: flex;
`;

const ImgPoster = styled.img`
  width: 270px;
  height: 410px;
  margin-right: 10px;
  border: 1px solid #302f2f;

`;

const ImgBack = styled.img`
  width: 730px;
  height: 410px;
  border: 1px solid #302f2f;

`;

const DivGenres = styled.div`
  display: flex;
  margin-bottom: 0px;
  width: 1000px;
  justify-content: space-between;
  align-items: center;
`;

const Divp = styled.div`
display: flex;
gap: 20px;
`;

const Pgenres = styled.p`
font-size: 20px;
padding: 5px 10px;
border: 0.5px solid white; 
border-radius: 30px;
`;

const DivButton = styled.div`
padding-top: 25px;
`;

const Poverview = styled.p`
font-size: 20px;
width: 800px;
`;
export default SpecificMovie;
