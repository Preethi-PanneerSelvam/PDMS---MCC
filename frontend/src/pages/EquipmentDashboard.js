import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { fetchEquipment } from "../services/equipmentService";

const EquipmentDashboard = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const navigate = useNavigate();

  const loadEquipment = async () => {
    const data = await fetchEquipment();
    setEquipmentList(data);
  };

  useEffect(() => {
    loadEquipment();
  }, []);

  const getStatus = (health) => {
    if (health >= 75) return { label: "Healthy", color: "success" };
    if (health >= 40) return { label: "Warning", color: "warning" };
    return { label: "Critical", color: "error" };
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Equipment Health Dashboard
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={() => navigate("/equipment/add")}
      >
        Add Equipment
      </Button>

      <Grid container spacing={3}>
        {equipmentList.map((eq) => {
          const status = getStatus(eq.health_score);

          return (
            <Grid item xs={12} md={6} lg={4} key={eq.id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6">{eq.name}</Typography>

                  <Typography variant="body2" color="text.secondary">
                    Code: {eq.equipment_code}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Location: {eq.location}
                  </Typography>

                  <Box mt={2}>
                    <Typography variant="body2">
                      Health Score: {eq.health_score}%
                    </Typography>

                    <LinearProgress
                      variant="determinate"
                      value={eq.health_score}
                      sx={{
                        height: 8,
                        borderRadius: 5,
                        mt: 1,
                        backgroundColor: "#eee",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor:
                            status.color === "success"
                              ? "#2e7d32"
                              : status.color === "warning"
                              ? "#f57c00"
                              : "#d32f2f",
                        },
                      }}
                    />
                  </Box>

                  <Box mt={2}>
                    <Chip
                      label={status.label}
                      color={status.color}
                      variant="filled"
                    />
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

export default EquipmentDashboard;
