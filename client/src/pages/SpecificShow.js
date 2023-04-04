import React from 'react'
import {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import WatchlistButton from "../buttons/WatchlistButton";
import {FiStar, FiLoader} from "react-icons/fi";
import styled from "styled-components";

const SpecificShow = () => {
  const [show, setShow] = useState([]);
  const {showId} = useParams();

  useEffect(() => {
    fetch(`/show/${showId}`)
      .then((response) => response.json())
      .then((data) => {
        setShow(data.data);
        window.scrollTo(0, 0)
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container>
      {show.length === 0 ? (
        <Waiting>
          <Loader />
        </Waiting>
      ) : (
        <Wrapper>
          <H1>{show.name}</H1>
          <Header>
            <DivHeaderLeft>
              <p>{show.first_air_date.slice(0,4)}</p>
              <p>{show.runtime}</p>
            </DivHeaderLeft>
            <DivHeaderRight>
              <p>IMDB rating</p>
              <Star />
              <p>{show.vote_average}</p>
            </DivHeaderRight>
          </Header>
          <div>
            <Imgdiv>
              <ImgPoster
                src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
              />
              <ImgBack
                src={`https://image.tmdb.org/t/p/w500/${show.backdrop_path}`}
              />
            </Imgdiv>
          </div>
          <DivGenres>
            <Divp>
              {show.genres && show.genres.length > 0 && (
                <Pgenres>{show.genres[0].name}</Pgenres>
              )}
              {show.genres && show.genres.length > 1 && (
                <Pgenres>{show.genres[1].name}</Pgenres>
              )}
            </Divp>
          <DivButton>
            <WatchlistButton item={show} />
          </DivButton>
          </DivGenres>
          <Poverview>{show.overview}</Poverview>
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

export default SpecificShow;