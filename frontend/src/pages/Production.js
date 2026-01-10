import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchBatches, completeBatch } from "../services/productionService";

const Production = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState({});

  const loadData = async () => {
    const data = await fetchBatches();
    setRows(data.map((b) => ({ ...b, id: b.id })));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleComplete = async (id) => {
    await completeBatch(id);
    loadData();
  };

  const columns = [
    { field: "batch_no", headerName: "Batch No", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "Completed" ? "success" : "warning"}
        />
      ),
    },
    {
      field: "start_time",
      headerName: "Start Time",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <Button
            size="small"
            onClick={() => {
              setParams(params.row.process_parameters || {});
              setOpen(true);
            }}
          >
            View Params
          </Button>

          {params.row.status !== "Completed" && (
            <Button
              size="small"
              color="success"
              onClick={() => handleComplete(params.row.id)}
            >
              Complete
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Production Batches
      </Typography>

      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        pageSizeOptions={[5, 10]}
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Process Parameters</DialogTitle>
        <DialogContent>
          <pre>{JSON.stringify(params, null, 2)}</pre>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Production;
