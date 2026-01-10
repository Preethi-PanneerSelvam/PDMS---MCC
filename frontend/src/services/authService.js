import axios from "axios";

const API_URL = "http://127.0.0.1:8000/auth";

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login-ui`, {
    email,
    password,
  });

  if (response.data.access_token) {
    localStorage.setItem("token", response.data.access_token);
  }

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
