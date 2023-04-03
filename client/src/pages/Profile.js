import React, {useEffect} from "react";
import {UserContext} from "../context/UserContext";
import {useContext, useState} from "react";
import {Link} from "react-router-dom";

const Profile = () => {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    fetch(`/watchlistNrating/${currentUser._id}`)
      .then((response) => response.json())
      .then((data) => {
        setUserProfile(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!userProfile) {
    return <p>loading</p>;
  }

  return (
    <div>
      {!userProfile ? (
        <p>loading</p>
      ) : (
        <div>
          {userProfile.rating.map((item, index) => {
            return (
              <div key={index}>
                <h1>{item.movieOrShow.title || item.movieOrShow.name }</h1>
                <p>{item.goodOrBad}</p>
                <p>{item.comment}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Profile;
