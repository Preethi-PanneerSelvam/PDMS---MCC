import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

// 🔐 Attach token (same pattern as earlier phases)
const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// ============================
// GET INVENTORY
// ============================
export const fetchInventory = async () => {
  const response = await axios.get(
    `${API_URL}/inventory/`,
    authHeaders()
  );
  return response.data;
};

// ============================
// ADD FINISHED GOODS
// ============================
export const addFinishedGoods = async (data) => {
  const response = await axios.post(
    `${API_URL}/inventory/`,
    data,
    authHeaders()
  );
  return response.data;
};

// ============================
// DISPATCH GOODS
// ============================
export const dispatchGoods = async (id, quantity) => {
  const response = await axios.post(
    `${API_URL}/inventory/${id}/dispatch`,
    null,
    {
      params: { quantity },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};
