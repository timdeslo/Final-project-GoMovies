import React from 'react'
import {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';

const SpecificShow = () => {
  const [show, setShow] = useState([]);
  const {showId} = useParams();

  useEffect(() => {
    fetch(`/show/${showId}`)
      .then((response) => response.json())
      .then((data) => {
        setShow(data.data);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      {!show ? (
        <p>loading</p>
        ) : (
          <div>
            {show.name}
          </div>
        )}
    </div>
  )
}

export default SpecificShow;