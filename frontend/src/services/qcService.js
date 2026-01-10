import axios from "axios";

const API_URL = "http://127.0.0.1:8000/qc";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const createQCReport = async (payload) => {
  const res = await axios.post(
    `${API_URL}/report`,
    payload,
    { headers: authHeader() }
  );
  return res.data;
};

export const fetchQCReports = async (batchId) => {
  const res = await axios.get(
    `${API_URL}/report/${batchId}`,
    { headers: authHeader() }
  );
  return res.data;
};
