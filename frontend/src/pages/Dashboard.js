import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { isAdmin, getUserRole } from "../utils/auth";

const Dashboard = () => {
  const navigate = useNavigate();
  const role = getUserRole();

  // Uniform width for all buttons
  const btnStyle = { width: "200px" };

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Title */}
      <Typography variant="h4" gutterBottom>
        PDMS MCC Dashboard
      </Typography>

      {/* Register (Admin Only) */}
      {isAdmin() && (
        <Button
          variant="contained"
          color="secondary"
          sx={btnStyle}
          onClick={() => navigate("/admin/register")}
        >
          Register User
        </Button>
      )}

      {/* Main Navigation */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Button variant="contained" sx={btnStyle} onClick={() => navigate("/raw-materials")}>
          Raw Materials
        </Button>

        <Button variant="contained" sx={btnStyle} onClick={() => navigate("/production")}>
          Production
        </Button>

        <Button variant="contained" sx={btnStyle} onClick={() => navigate("/quality")}>
          Quality Prediction
        </Button>

        <Button variant="contained" sx={btnStyle} onClick={() => navigate("/qc")}>
          Quality Control
        </Button>

        <Button variant="contained" sx={btnStyle} onClick={() => navigate("/ai-reports")}>
          AI Reports
        </Button>
      </Box>

      {/* Equipment & Inventory */}
      <Typography variant="h5">Equipment & Inventory</Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {/* Equipment List */}
        <Button
          variant="contained"
          sx={btnStyle}
          onClick={() => navigate("/equipment")}
        >
          Equipment
        </Button>

        {/* Add Equipment (Admin Only) */}
        {role === "admin" && (
          <Button
            variant="contained"
            sx={btnStyle}
            onClick={() => navigate("/equipment/add")}
          >
            Add Equipment
          </Button>
        )}

        {/* Inventory */}
        {(role === "admin" || role === "operator") && (
          <Button
            variant="contained"
            sx={btnStyle}
            onClick={() => navigate("/inventory")}
          >
            Inventory & Dispatch
          </Button>
        )}
      </Box>

      {/* AI Assistant */}
      <Button
        variant="contained"
        color="secondary"
        startIcon={<SmartToyIcon />}
        sx={btnStyle}
        onClick={() => navigate("/ai-assistant")}
      >
        AI Assistant
      </Button>

      {/* Spacer */}
      <Box sx={{ flexGrow: 1 }} />

      {/* Logout */}
      <Button
        variant="outlined"
        color="secondary"
        sx={btnStyle}
        onClick={() => {
          logout();
          window.location.reload();
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;
