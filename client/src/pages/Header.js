import React from "react";
import styled from "styled-components";
import {UserContext} from "../context/UserContext";
import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";

const Header = () => {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <Headerdiv>
      <Links to="/">
        <Title>GoMovie</Title>
      </Links>
      {currentUser ? (
        <HeaderRight>
          <H2>Hello, {currentUser.firstName}!</H2>
          <LinksDiv>
            <Links to="/watchlist">
              <Pcart>View Watchlist</Pcart>
            </Links>
            {/* have a number that updates the amount of items inside cart */}
            <P onClick={handleChange}>Sign Out</P>
          </LinksDiv>
        </HeaderRight>
      ) : (
        <HeaderRight>
          <Links to="/signin">
            <H2>Sign In</H2>
          </Links>
          {/* have a number that updates the amount of items inside cart */}
        </HeaderRight>
      )}
    </Headerdiv>
  );
};

const LinksDiv = styled.div`
  display: flex;
`;

const Headerdiv = styled.div`
  background-color: #4a4747;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  width: 100vw;
`;

const HeaderRight = styled.div`
  margin-right: 50px;
  height: 100px;
  display: flex;
  flex-direction: column;
  font-family: "Oswald";
`;

const Title = styled.h1`
  font-size: 40px;
  margin-left: 20px;
`;

const Links = styled(Link)`
  text-decoration: none;
  color: black;
  margin-right: 50px;
  font-family: "Oswald";
  display: flex;
`;

const H2 = styled.h2`
  margin-bottom: 0px;
  font-family: "Oswald";
`;

const Pcart = styled.p`
  margin-right: 0px;
  font-family: "Oswald";
  :hover& {
    opacity: 0.5;
  }
`;

const P = styled.p`
  :hover& {
    cursor: pointer;
  }
  :hover& {
    opacity: 0.5;
  }
`;
export default Header;
