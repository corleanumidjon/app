import React, { useState, useEffect } from "react";
import * as api from "../../services/api";
import "./Photos.css";

const Photos = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    api.fetchPhotos().then((data) => setPhotos(data));
  }, []);

  return (
    <div className="content">
      <h1>Photos</h1>
      <ul className="list">
        {photos.map((photo) => (
          <li key={photo.id}>
            <img src={photo.thumbnailUrl} alt="Image" />
            <p>{photo.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Photos;
