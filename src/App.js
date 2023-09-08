import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Posts from "./components/Posts/Posts";
import Photos from "./components/Photos/Photos";
import Todos from "./components/Todos/Todos";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("posts");

  let activeContent = null;

  if (activeTab === "posts") {
    activeContent = <Posts />;
  } else if (activeTab === "photos") {
    activeContent = <Photos />;
  } else if (activeTab === "todos") {
    activeContent = <Todos />;
  }

  return (
    <div className="app">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeContent}
    </div>
  );
}

export default App;
