import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Get all raw materials
export const fetchRawMaterials = async () => {
  const response = await API.get("/raw-materials");
  return response.data;
};

// Create raw material
export const createRawMaterial = async (data) => {
  const response = await API.post("/raw-materials", data);
  return response.data;
};

// Consume raw material
export const consumeRawMaterial = async (id, qty) => {
  const response = await API.put(
    `/raw-materials/${id}/consume`,
    null,
    { params: { used_qty: qty } }
  );
  return response.data;
};
