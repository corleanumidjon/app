const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`);
  const data = await response.json();
  return data;
};

export const fetchPhotos = async () => {
  const response = await fetch(`${BASE_URL}/photos`);
  const data = await response.json();
  return data;
};

export const fetchTodos = async () => {
  const response = await fetch(`${BASE_URL}/todos`);
  const data = await response.json();
  console.log(data);
  return data;
};
