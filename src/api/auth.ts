import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const loginUser = async (identifier: string, password: string) => {
  const params = new URLSearchParams();
  params.append('identifier', identifier);
  params.append('password', password);

  const response = await axios.post(`${BASE_URL}/auth/local`, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data;
};

export const registerUser = async (email: string, username:string, password: string) => {
  const params = new URLSearchParams();
  params.append('email', email);
  params.append('username', username);
  params.append('password', password);

  const response = await axios.post(`${BASE_URL}/auth/local/register`, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data;
};
