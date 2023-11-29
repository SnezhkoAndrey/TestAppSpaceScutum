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

    console.log(data);

    return data;
  }

  const GET = async (endpoint: string) => {
    return await fetchJSON(endpoint, {
      method: "get",
    });
  };

  // const POST = async (endpoint: string, value: UserType | PeopleType) => {
  //   return await fetchJSON(endpoint, {
  //     method: "post",
  //     body: JSON.stringify({ ...value }),
  //   });
  // };

  // const PUT = async (endpoint: string, value: PeopleType) => {
  //   return await fetchJSON(endpoint, {
  //     method: "put",
  //     body: JSON.stringify({ ...value }),
  //   });
  // };

  return { GET };
};

export default HTTPClient;
