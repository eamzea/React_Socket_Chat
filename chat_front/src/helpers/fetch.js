const baseURL = process.env.REACT_APP_API_URL;

export const fetchWHtoken = async (endpoint, data, method = 'GET') => {
  const url = `${baseURL}/${endpoint}`;

  try {
    if (method === 'GET') {
      const response = await fetch(url);
      return await response.json();
    } else {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchWtoken = async (endpoint, data, method = 'GET') => {
  const url = `${baseURL}/${endpoint}`;
  const token = localStorage.getItem('token');

  try {
    if (method === 'GET') {
      const response = await fetch(url, {
        headers: {
          'x-token': token,
        },
      });
      return await response.json();
    } else {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-token': token,
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    }
  } catch (error) {
    console.log(error);
  }
};
