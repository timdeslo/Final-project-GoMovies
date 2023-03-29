import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { UserContext } from "./context/UserContext";
// import { useContext } from "react";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import Header from "./pages/Header";

const App = () => {
  // const { currentUser, setCurrentUser } = useContext(UserContext);
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={ <Homepage />} />
          
          <Route path="/profile" element={ <Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
