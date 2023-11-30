import { TodoType } from "../types/types";

const HTTPClient = () => {
  const myHeaders = new Headers();
  myHeaders.append("content-type", "application/json");

  const baseURL = "https://jsonplaceholder.typicode.com/todos/";

  async function fetchJSON(endpoint: string, options = {}) {
    const response = await fetch(baseURL + endpoint, {
      ...options,
      headers: myHeaders,
    });

    const data = await response.json();

    return data;
  }

  const GET = async (endpoint: string) => {
    return await fetchJSON(endpoint, {
      method: "get",
    });
  };

  const POST = async (endpoint: string, value: string) => {
    return await fetchJSON(endpoint, {
      method: "post",
      body: JSON.stringify({
        userId: 11,
        title: value,
        completed: false,
      }),
    });
  };

  const PUT = async (endpoint: string, value: TodoType) => {
    return await fetchJSON(endpoint, {
      method: "put",
      body: JSON.stringify({ ...value }),
    });
  };

  const DELETE = async (endpoint: string) => {
    return await fetchJSON(endpoint, {
      method: "delete",
    });
  };

  return { GET, POST, PUT, DELETE };
};

export default HTTPClient;
