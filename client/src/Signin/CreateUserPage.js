import React from "react";
import styled from "styled-components";
import {UserContext} from "../context/UserContext";
import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";

const createUser = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const CreateUserPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(createUser);
  const [error, setError] = useState();
  const {currentUser, setCurrentUser} = useContext(UserContext);

  const handleSumbit = (event) => {
    event.preventDefault();
    fetch("/createUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 404) {
          setError(data.error);
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

  return (
    <Container>
      <Wrapper>
        <Form onSubmit={(event) => handleSumbit(event, user)}>
          <Input
            type="text"
            placeholder="First Name"
            label={"firstName"}
            value={user.firstName}
            required={true}
            onChange={(e) => setUser({...user, firstName: e.target.value})}
          />
          <Input
            type="text"
            placeholder="Last Name"
            label="lastName"
            value={user.lastName}
            required={true}
            onChange={(e) => setUser({...user, lastName: e.target.value})}
          />
          <Input
            type="email"
            placeholder="Email"
            label={"email"}
            value={user.email}
            required={true}
            onChange={(e) => setUser({...user, email: e.target.value})}
          />
          <Input
            type="password"
            placeholder="password"
            label={"password"}
            value={user.password}
            required={true}
            onChange={(e) => setUser({...user, password: e.target.value})}
          />
          <Input
            type="password"
            placeholder="comfirm password"
            label={"confirmPassword"}
            required={true}
            onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
          />
          <Button type="submit">Create User</Button>
        </Form>
        {error === undefined ? null : <p style={{color: "red"}}>{error}</p>}
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

export default CreateUserPage;
