import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const AdminRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "operator",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://127.0.0.1:8000/auth/register",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("User registered successfully");
    } catch (err) {
      alert(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Admin – Register User
        </Typography>

        <TextField
          fullWidth
          label="Name"
          name="name"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          select
          label="Role"
          name="role"
          margin="normal"
          value={form.role}
          onChange={handleChange}
        >
          <MenuItem value="operator">Operator</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleSubmit}
        >
          Register User
        </Button>
      </Paper>
    </Container>
  );
};

export default AdminRegister;
