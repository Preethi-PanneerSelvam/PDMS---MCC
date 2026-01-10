import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/equipment";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Get all equipment
export const fetchEquipment = async () => {
  const response = await axios.get(API_BASE, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Create new equipment
export const createEquipment = async (data) => {
  const response = await axios.post(API_BASE, data, {
    headers: getAuthHeader(),
  });
  return response.data;
};
