import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  TextField,
  Button,
  Chip,
} from "@mui/material";

import {
  fetchInventory,
  dispatchGoods,
} from "../services/inventoryService";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [dispatchQty, setDispatchQty] = useState({});

  const loadInventory = async () => {
    const data = await fetchInventory();
    setInventory(data);
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const handleDispatch = async (id) => {
    if (!dispatchQty[id]) return;
    await dispatchGoods(id, dispatchQty[id]);
    setDispatchQty({ ...dispatchQty, [id]: "" });
    loadInventory();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Finished Goods Inventory
      </Typography>

      <Grid container spacing={3}>
        {inventory.map((item) => {
          const usedPercent =
            (item.used_quantity_kg / item.quantity_kg) * 100;

          const isLow = usedPercent >= 70;
          const isExhausted = !item.is_active;

          return (
            <Grid item xs={12} md={6} lg={4} key={item.id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6">
                    {item.product_name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Batch: {item.batch_no}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Location: {item.warehouse_location}
                  </Typography>

                  <Box mt={2}>
                    <Typography variant="body2">
                      Dispatched: {item.used_quantity_kg} /{" "}
                      {item.quantity_kg} kg
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
                          backgroundColor: isLow
                            ? "#f57c00"
                            : "#2e7d32",
                        },
                      }}
                    />
                  </Box>

                  <Box mt={2} display="flex" alignItems="center">
                    <TextField
                      label="Dispatch (kg)"
                      size="small"
                      value={dispatchQty[item.id] || ""}
                      onChange={(e) =>
                        setDispatchQty({
                          ...dispatchQty,
                          [item.id]: e.target.value,
                        })
                      }
                      disabled={isExhausted}
                    />

                    <Button
                      sx={{ ml: 2 }}
                      variant="contained"
                      color="primary"
                      disabled={isExhausted}
                      onClick={() => handleDispatch(item.id)}
                    >
                      Dispatch
                    </Button>
                  </Box>

                  <Box mt={2}>
                    {isExhausted ? (
                      <Chip label="Dispatched" color="error" />
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

export default Inventory;
