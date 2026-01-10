import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { createQCReport, fetchQCReports } from "../services/qcService";

const QCDashboard = () => {
  const [batchId, setBatchId] = useState("");
  const [form, setForm] = useState({});
  const [reports, setReports] = useState([]);

  const submitQC = async () => {
    const data = await createQCReport({
      batch_id: Number(batchId),
      predicted_moisture: Number(form.pm),
      actual_moisture: Number(form.am),
      predicted_purity: Number(form.pp),
      actual_purity: Number(form.ap),
      remarks: form.remarks,
    });
    setReports([data]);
  };

  const loadReports = async () => {
    const data = await fetchQCReports(batchId);
    setReports(data);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Quality Control (QC)
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">QC Entry</Typography>

          <TextField
            label="Batch ID"
            fullWidth
            margin="normal"
            onChange={(e) => setBatchId(e.target.value)}
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField label="Predicted Moisture" fullWidth onChange={(e) => setForm({ ...form, pm: e.target.value })} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Actual Moisture" fullWidth onChange={(e) => setForm({ ...form, am: e.target.value })} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Predicted Purity" fullWidth onChange={(e) => setForm({ ...form, pp: e.target.value })} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Actual Purity" fullWidth onChange={(e) => setForm({ ...form, ap: e.target.value })} />
            </Grid>
          </Grid>

          <TextField
            label="Remarks"
            fullWidth
            margin="normal"
            onChange={(e) => setForm({ ...form, remarks: e.target.value })}
          />

          <Button variant="contained" sx={{ mt: 2 }} onClick={submitQC}>
            Submit QC
          </Button>
          <Button sx={{ mt: 2, ml: 2 }} onClick={loadReports}>
            Load Reports
          </Button>
        </CardContent>
      </Card>

      {reports.map((r) => (
        <Card key={r.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">
              Batch #{r.batch_id}
            </Typography>

            <Typography>
              Moisture: {r.predicted_moisture} → {r.actual_moisture}
            </Typography>
            <Typography>
              Purity: {r.predicted_purity} → {r.actual_purity}
            </Typography>

            <Chip
              label={r.status}
              color={r.status === "Approved" ? "success" : "error"}
              sx={{ mt: 1 }}
            />

            <Typography sx={{ mt: 1 }}>
              QC Summary:{" "}
              {r.status === "Approved"
                ? "Batch meets quality standards and is released."
                : "Batch deviates from predicted quality and requires review."}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default QCDashboard;
