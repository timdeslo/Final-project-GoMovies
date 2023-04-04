import React, {useEffect} from "react";
import {UserContext} from "../context/UserContext";
import {useContext, useState} from "react";
import styled from "styled-components";
import {FiLoader} from "react-icons/fi";

const Profile = () => {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    fetch(`/watchlistNrating/${currentUser._id}`)
      .then((response) => response.json())
      .then((data) => {
        setUserProfile(data.data);
        window.scrollTo(0, 0)
      })
      .catch((err) => console.error(err));
  }, []);

  if (!userProfile) {
    return (
      <Waiting>
        <Loader />
      </Waiting>
    );
  }

  return (
    <div>
      {!userProfile ? (
        <Waiting>
          <Loader />
        </Waiting>
      ) : (
        <Container>
          <h1>Your Profile</h1>
          <Div>
            {userProfile.rating.map((item, index) => {
              return (
                <Divmap key={index}>
                  <ImgMovie
                    src={`https://image.tmdb.org/t/p/w500/${item.movieOrShow
                    .poster_path}`}
                    alt={item.title}
                  />
                  <Pname>{item.movieOrShow.title || item.movieOrShow.name}</Pname>
                  <DivRnC>
                    <p>Your Rating: <Span>{item.goodOrBad}</Span></p>
                    <Pcomment>Your Comments: <Span>{item.comment}</Span></Pcomment>
                  </DivRnC>
                </Divmap>
              );
            })}
          </Div>
        </Container>
      )}
    </div>
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
  margin-bottom: 100px;
`;

const Div = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-rows: repeat(auto, 1fr);
  grid-template-columns: repeat(5, 1fr);
`;

const Divmap = styled.div`
  height: 500px;
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

const DivRnC = styled.div`
margin-left: 20px;
width: 200px;
display: flex;
flex-wrap: wrap;
`;

const Pname = styled.p`
  margin-top: 10px;
  margin-left: 20px;
  font-size: 15px;
`;

const Span = styled.span`
color: yellow;
margin-left: 2px;
`;

const Pcomment = styled.p`
  width: 200px;
  
`;
export default Profile;
