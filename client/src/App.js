import {BrowserRouter, Routes, Route} from "react-router-dom";
// import { UserContext } from "./context/UserContext";
// import { useContext } from "react";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import Header from "./pages/Header";
import CreateUserPage from "./Signin/CreateUserPage";
import SigninPage from "./Signin/SigninPage";
import SpecificMovie from "./pages/SpecificMovie";
import SpecificShow from "./pages/SpecificShow";

const App = () => {
  // const { currentUser, setCurrentUser } = useContext(UserContext);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/createuser" element={<CreateUserPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movie/:movieId" element={<SpecificMovie />} />
          <Route path="/show/:showId" element={<SpecificShow />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
