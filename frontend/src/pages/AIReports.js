import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { getQCSummary } from "../services/genaiService";

const AIReports = () => {
  const [form, setForm] = useState({});
  const [summary, setSummary] = useState("");

  const generateReport = async () => {
    const res = await getQCSummary({
      batch_id: Number(form.batch_id),
      predicted_purity: Number(form.predicted),
      actual_purity: Number(form.actual),
      status: form.status,
    });
    setSummary(res.summary);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        AI Quality Reports
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6">Batch Details</Typography>

              <TextField
                label="Batch ID"
                fullWidth
                margin="normal"
                onChange={(e) => setForm({ ...form, batch_id: e.target.value })}
              />

              <TextField
                label="Predicted Purity"
                fullWidth
                margin="normal"
                onChange={(e) => setForm({ ...form, predicted: e.target.value })}
              />

              <TextField
                label="Actual Purity"
                fullWidth
                margin="normal"
                onChange={(e) => setForm({ ...form, actual: e.target.value })}
              />

              <TextField
                label="QC Status (Approved / Rejected)"
                fullWidth
                margin="normal"
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              />

              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={generateReport}
              >
                Generate AI Report
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                AI-Generated Quality Summary
              </Typography>

              <Divider sx={{ my: 2 }} />

              {summary ? (
                <Typography>{summary}</Typography>
              ) : (
                <Typography color="text.secondary">
                  AI explanation will appear here after generation.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AIReports;
