import React from "react";
import LoginButton from "../Signin/LoginInButton";
import LogOutButton from "../Signin/LogOutButton";
import styled from "styled-components";
import {useAuth0} from "@auth0/auth0-react";

const Header = () => {
  const {user, isAuthenticated, isLoading} = useAuth0();

  return (
    <Container>
      <Div>
        <h1>Go Movies</h1>
        {!isAuthenticated ? (
          <LoginButton />
        ) : (
          <DivRight>
            <p>{user.email}</p>
            <p>{user.nickname}</p>
            <LogOutButton />
          </DivRight>
        )}
      </Div>
    </Container>
  );
};

const Container = styled.div`
  height: 150px;
  width: cover;
  background-color: grey;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DivRight = styled.div`
  display: flex;
  flex-direction: column;
`;
export default Header;
