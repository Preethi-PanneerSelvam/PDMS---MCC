import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createRawMaterial } from "../services/rawMaterialService";

const AddRawMaterial = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    supplier: "",
    batch_no: "",
    quantity_kg: "",
    properties: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      quantity_kg: Number(formData.quantity_kg),
      properties: JSON.parse(formData.properties || "{}"),
    };

    await createRawMaterial(payload);
    navigate("/raw-materials");
  };

  return (
    <Box maxWidth={700} mx="auto">
      <Typography variant="h4" gutterBottom>
        Add Raw Material
      </Typography>

      <Card elevation={3}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Material Name"
                name="name"
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Supplier"
                name="supplier"
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Batch Number"
                name="batch_no"
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Quantity (kg)"
                name="quantity_kg"
                type="number"
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Properties (JSON format)"
                name="properties"
                fullWidth
                multiline
                rows={3}
                placeholder='{"purity": 95, "moisture": 12}'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
              >
                Add Raw Material
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddRawMaterial;
