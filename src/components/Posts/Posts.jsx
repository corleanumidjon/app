import React, { useState, useEffect } from "react";
import * as api from "../../services/api";
import Pagination from "../Pagination/Pagination";
import AddPostForm from "./AddPostForm";
import "./Posts.css";

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [ascending, setAscending] = useState(true);
  const postsPerPage = 10;

  useEffect(() => {
    api.fetchPosts().then((data) => setPosts(data));
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    const value = event.target.value;
    const ascendingOrder = value === sortBy ? !ascending : true;
    setSortBy(value);
    setAscending(ascendingOrder);
  };

  const filteredPosts = currentPosts.filter(
    (post) =>
      post.title &&
      post.title.toLowerCase().includes(searchTerm?.toLowerCase() || "")
  );

  const sortedPosts = filteredPosts.sort((a, b) =>
    ascending ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]
  );

  const addNewPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <div className="content">
      <h1>Posts</h1>
      <div className="filter-options">
        <input className="inp" type="text" placeholder="Search..." onChange={handleSearch} />
        <select className="select"  value={sortBy} onChange={handleSort}>
          <option value="id">ID</option>
          <option value="userId">User ID</option>
          <option value="title">Title</option>
          <option value="body">Text</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={ascending}
            onChange={() => setAscending(!ascending)}
          />
          A-Z in order
        </label>
      </div>
      <ul>
        {sortedPosts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
      <AddPostForm addNewPost={addNewPost} />
    </div>
  );
};

export default Posts;
