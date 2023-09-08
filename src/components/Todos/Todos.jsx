import React, { useState, useEffect } from "react";
import * as api from "../../services/api";
import Pagination from "../Pagination/Pagination";
import "./Todos.css";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("id");
  const [ascending, setAscending] = useState(true);
  const todosPerPage = 10;

  useEffect(() => {
    api.fetchTodos().then((data) => setTodos(data));
  }, []);

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredTodos = currentTodos.filter((todo) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return todo.completed;
    } else {
      return !todo.completed;
    }
  });

  const handleSort = (event) => {
    const value = event.target.value;
    const ascendingOrder = value === sortBy ? !ascending : true;
    setSortBy(value);
    setAscending(ascendingOrder);
  };

  const sortedTodos = filteredTodos.sort((a, b) =>
    ascending ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]
  );

  return (
    <div className="content">
      <h1>Todos</h1>
      <div className="filter-options">
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="completed">Done</option>
          <option value="incomplete">Not done</option>
        </select>
        <select value={sortBy} onChange={handleSort}>
          <option value="id">ID</option>
          <option value="title">Title</option>
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
        {sortedTodos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            {todo.title}
          </li>
        ))}
      </ul>
      <Pagination
        itemsPerPage={todosPerPage}
        totalItems={todos.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Todos;
