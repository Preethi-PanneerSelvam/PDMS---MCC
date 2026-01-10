import axios from "axios";

const API_URL = "http://127.0.0.1:8000/genai";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getQCSummary = async (payload) => {
  const res = await axios.post(
    `${API_URL}/qc-summary`,
    payload,
    { headers: authHeader() }
  );
  return res.data;
};
