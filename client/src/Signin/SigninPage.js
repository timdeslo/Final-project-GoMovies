import React from "react";
import styled from "styled-components";
import {UserContext} from "../context/UserContext";
import {useState, useContext, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";

const signin = {
  email: "",
  password: "",
};

const SigninPage = () => {
  const navigate = useNavigate();
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [signIn, setSignIn] = useState(signin);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUser = (event) => {
    event.preventDefault();
    fetch(`/signIn/${signIn.email}/${signIn.password}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 404) {
          setErrorMessage(data.error);
        } else {
          localStorage.setItem("user", JSON.stringify(data.data));
          setCurrentUser(data.data);
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    if (currentUser !== null) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <Container>
      <Wrapper>
        <Form onSubmit={handleUser}>
          <Input
            type="email"
            placeholder="Email"
            label={"email"}
            required={true}
            value={signIn.email}
            onChange={(e) => setSignIn({...signIn, email: e.target.value})}
          />
          <Input
            type="password"
            placeholder="password"
            label={"password"}
            required={true}
            onChange={(e) => setSignIn({...signIn, password: e.target.value})}
          />
          <Button type="submit">Sign In</Button>
        </Form>
        {errorMessage !== undefined ? (
          <p style={{color: "red"}}>{errorMessage}</p>
        ) : null}
        <DivFooterForm>
          <p>If you have no account click here</p>
          <Links to="/createuser">
            <Plink>Create Account</Plink>
          </Links>
        </DivFooterForm>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
`;

const Wrapper = styled.div`
  background-color: #202020;
  width: fit-content;
  height: fit-content;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 50px;
`;

const Input = styled.input`
  font-family: "Oswald", sans-serif;
  font-weight: bold;
  font-size: 27px;
`;

const Button = styled.button`
  margin-top: 20px;
  font-family: "Oswald", sans-serif;
  font-weight: bold;
  font-size: 20px;
  padding: 10px 40px;
  border-radius: 7px;
  border: none;
  :hover& {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const DivFooterForm = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const Links = styled(Link)`
  text-decoration: none;
  color: yellow;
  :hover& {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const Plink = styled.p`
color: yellow;
`;
export default SigninPage;
