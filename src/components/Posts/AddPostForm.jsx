import React, { useState } from "react";
import * as api from "../../services/api";

const AddPostForm = ({ addNewPost }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = {
      id: +1,
      title: title,
      body: body,
    };

    api.fetchPosts(newPost).then((response) => {
      addNewPost(response);
      setTitle("");
      setBody("");
    });
  };

  return (
    <div className="add-post-form">
      <h2>Add Post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <label>
          text:
          <textarea value={body} onChange={handleBodyChange} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddPostForm;
