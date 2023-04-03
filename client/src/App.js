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
import Watchlist from "./pages/Watchlist";
import TopMovies from "./pages/TopMovies";
import PopularMovies from "./pages/PopularMovies";
import TopShows from "./pages/TopShows";
import PopularShows from "./pages/PopularShows";


const App = () => {
  // const { currentUser, setCurrentUser } = useContext(UserContext);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/createuser" element={<CreateUserPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/topmovies" element={<TopMovies/>} />
          <Route path="/popularmovies" element={<PopularMovies/>} />
          <Route path="/topshows" element={<TopShows />} />
          <Route path="/popularshows" element={<PopularShows/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/watchlist" element={<Watchlist/>} />
          <Route path="/movie/:movieId" element={<SpecificMovie />} />
          <Route path="/show/:showId" element={<SpecificShow />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
