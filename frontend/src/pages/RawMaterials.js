import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  LinearProgress,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  fetchRawMaterials,
  consumeRawMaterial,
} from "../services/rawMaterialService";

const RawMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [consumeQty, setConsumeQty] = useState({});
  const navigate = useNavigate();

  const loadMaterials = async () => {
    const data = await fetchRawMaterials();
    setMaterials(data);
  };

  useEffect(() => {
    loadMaterials();
  }, []);

  const handleConsume = async (id) => {
    if (!consumeQty[id]) return;
    await consumeRawMaterial(id, consumeQty[id]);
    setConsumeQty({ ...consumeQty, [id]: "" });
    loadMaterials();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Raw Material Stock
      </Typography>

      {/* ✅ ADD RAW MATERIAL BUTTON */}
      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={() => navigate("/raw-materials/add")}
      >
        Add Raw Material
      </Button>

      <Grid container spacing={3}>
        {materials.map((rm) => {
          const usedPercent =
            (rm.used_quantity_kg / rm.quantity_kg) * 100;

          const isLow = usedPercent >= 70;
          const isExhausted = !rm.is_active;

          return (
            <Grid item xs={12} md={6} lg={4} key={rm.id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6">{rm.name}</Typography>

                  <Typography variant="body2" color="text.secondary">
                    Batch: {rm.batch_no}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Supplier: {rm.supplier}
                  </Typography>

                  <Box mt={2}>
                    <Typography variant="body2">
                      Used: {rm.used_quantity_kg} / {rm.quantity_kg} kg
                    </Typography>

                    <LinearProgress
                      variant="determinate"
                      value={usedPercent}
                      sx={{
                        height: 8,
                        borderRadius: 5,
                        mt: 1,
                        backgroundColor: "#eee",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: isLow ? "#f57c00" : "#2e7d32",
                        },
                      }}
                    />
                  </Box>

                  <Box mt={2} display="flex" alignItems="center">
                    <TextField
                      label="Consume (kg)"
                      size="small"
                      value={consumeQty[rm.id] || ""}
                      onChange={(e) =>
                        setConsumeQty({
                          ...consumeQty,
                          [rm.id]: e.target.value,
                        })
                      }
                      disabled={isExhausted}
                    />

                    <Button
                      sx={{ ml: 2 }}
                      variant="contained"
                      disabled={isExhausted}
                      onClick={() => handleConsume(rm.id)}
                    >
                      Consume
                    </Button>
                  </Box>

                  <Box mt={2}>
                    {isExhausted ? (
                      <Chip label="Exhausted" color="error" />
                    ) : isLow ? (
                      <Chip label="Low Stock" color="warning" />
                    ) : (
                      <Chip label="Available" color="success" />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default RawMaterials;
