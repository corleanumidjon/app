import React, { useState, useEffect } from "react";
import * as api from "../../services/api";
import "./Album.css";

const Album = ({ albumId }) => {
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    api.fetchAlbum(albumId).then((data) => setAlbum(data));
    api.fetchPhotosByAlbum(albumId).then((data) => setPhotos(data));
  }, [albumId]);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="album">
      {album && (
        <div>
          <h2>{album.title}</h2>
          <div className="album-photos">
            {photos.map((photo) => (
              <img
                key={photo.id}
                src={photo.thumbnailUrl}
                alt={photo.title}
                onClick={() => openModal(photo)}
              />
            ))}
          </div>
          {showModal && (
            <div className="modal">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <img src={selectedPhoto.url} alt={selectedPhoto.title} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Album;
