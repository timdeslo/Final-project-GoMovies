import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { UserContext } from "./context/UserContext";
// import { useContext } from "react";
import Homepage from "./pages/Homepage";
import SignIn from "./Signin/SignIn";
import Profile from "./pages/Profile";

const App = () => {
  // const { currentUser, setCurrentUser } = useContext(UserContext);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Homepage />} />
          <Route path="/signin" element={ <SignIn />} />
          <Route path="/profile" element={ <Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
