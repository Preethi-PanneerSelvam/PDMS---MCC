import axios from "axios";

const API_URL = "http://127.0.0.1:8000/ml";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const predictQuality = async (payload) => {
  const response = await axios.post(
    `${API_URL}/predict-quality`,
    payload,
    { headers: getAuthHeader() }
  );
  return response.data;
};
