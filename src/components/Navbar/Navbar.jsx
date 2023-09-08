import React from "react";
import "./Navbar.css";

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="navbar">
      <button
        className={activeTab === "posts" ? "active" : ""}
        onClick={() => setActiveTab("posts")}>
        Posts
      </button>
      <button
        className={activeTab === "photos" ? "active" : ""}
        onClick={() => setActiveTab("photos")}>
        Photos
      </button>
      <button
        className={activeTab === "todos" ? "active" : ""}
        onClick={() => setActiveTab("todos")}>
        Todos
      </button>
    </div>
  );
};

export default Navbar;
