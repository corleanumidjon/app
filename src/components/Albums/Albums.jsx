import React, { useState, useEffect } from "react";
import * as api from "../../services/api";
import Pagination from "../Pagination/Pagination";
import "./Albums.css";

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const albumsPerPage = 10;

  useEffect(() => {
    api.fetchAlbums().then((data) => setAlbums(data));
  }, []);

  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="content">
      <h1>Alboms</h1>
      <ul>
        {currentAlbums.map((album) => (
          <li key={album.id}>{album.title}</li>
        ))}
      </ul>
      <Pagination
        itemsPerPage={albumsPerPage}
        totalItems={albums.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Albums;
