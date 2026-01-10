import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  LinearProgress,
} from "@mui/material";
import { predictQuality } from "../services/mlService";

const QualityPrediction = () => {
  const [result, setResult] = useState(null);
  const [form, setForm] = useState({
    moisture: "",
    purity: "",
    temperature: "",
    ph: "",
    duration_min: "",
  });

  const handlePredict = async () => {
    const data = await predictQuality({
      raw_material_properties: {
        moisture: Number(form.moisture),
        purity: Number(form.purity),
      },
      process_parameters: {
        temperature: Number(form.temperature),
        ph: Number(form.ph),
        duration_min: Number(form.duration_min),
      },
    });
    setResult(data);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Quality Prediction (ML)
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Input Parameters</Typography>

              <TextField
                label="Raw Moisture"
                fullWidth
                margin="normal"
                onChange={(e) => setForm({ ...form, moisture: e.target.value })}
              />
              <TextField
                label="Raw Purity"
                fullWidth
                margin="normal"
                onChange={(e) => setForm({ ...form, purity: e.target.value })}
              />
              <TextField
                label="Temperature"
                fullWidth
                margin="normal"
                onChange={(e) => setForm({ ...form, temperature: e.target.value })}
              />
              <TextField
                label="pH"
                fullWidth
                margin="normal"
                onChange={(e) => setForm({ ...form, ph: e.target.value })}
              />
              <TextField
                label="Duration (min)"
                fullWidth
                margin="normal"
                onChange={(e) => setForm({ ...form, duration_min: e.target.value })}
              />

              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handlePredict}
              >
                Predict Quality
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {result && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Prediction Results</Typography>

                <Typography>Moisture: {result.moisture}</Typography>
                <Typography>Particle Size: {result.particle_size}</Typography>
                <Typography>Purity: {result.purity}</Typography>

                <Typography sx={{ mt: 2 }}>
                  Pass Probability
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={result.pass_probability * 100}
                />
                <Typography sx={{ mt: 1 }}>
                  {(result.pass_probability * 100).toFixed(1)}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default QualityPrediction;

