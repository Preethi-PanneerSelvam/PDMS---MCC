import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createEquipment } from "../services/equipmentService";

const AddEquipment = () => {
  const [form, setForm] = useState({
    name: "",
    equipment_code: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔑 IMPORTANT

    try {
      await createEquipment(form);
      navigate("/equipment"); // ✅ redirect AFTER success
    } catch (error) {
      console.error("Failed to add equipment", error);
    }
  };

  return (
    <Box maxWidth={500}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Add Equipment
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Equipment Name"
              name="name"
              fullWidth
              margin="normal"
              value={form.name}
              onChange={handleChange}
              required
            />

            <TextField
              label="Equipment Code"
              name="equipment_code"
              fullWidth
              margin="normal"
              value={form.equipment_code}
              onChange={handleChange}
              required
            />

            <TextField
              label="Location"
              name="location"
              fullWidth
              margin="normal"
              value={form.location}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3 }}
            >
              Save Equipment
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddEquipment;
