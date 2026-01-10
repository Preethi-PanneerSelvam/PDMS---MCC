import axios from "axios";

const API_URL = "http://127.0.0.1:8000/production";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const fetchBatches = async () => {
  const res = await axios.get(`${API_URL}/batch`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const completeBatch = async (batchId) => {
  return axios.put(`${API_URL}/batch/${batchId}/complete`, {}, {
    headers: getAuthHeader(),
  });
};
