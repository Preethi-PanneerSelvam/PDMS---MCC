import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RawMaterials from "./pages/RawMaterials";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider, Container } from "@mui/material";
import theme from "./theme/theme";
import Production from "./pages/Production";
import QualityPrediction from "./pages/QualityPrediction";
import QCDashboard from "./pages/QCDashboard";
import AIReports from "./pages/AIReports";
import AddRawMaterial from "./pages/AddRawMaterial";
import EquipmentDashboard from "./pages/EquipmentDashboard";
import AddEquipment from "./pages/AddEquipment";
import Inventory from "./pages/Inventory";
import AIAssistant from "./pages/AIAssistant";
import Register from "./pages/Register";
import AdminRegister from "./pages/AdminRegister";
import { isAdmin } from "./utils/auth";












function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container sx={{ mt: 5 }}>
          <Routes>
            <Route path="/login" element={<Login onLogin={() => window.location.replace("/")} />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/raw-materials"
              element={
                <ProtectedRoute>
                  <RawMaterials />
                </ProtectedRoute>
              }
            />
            <Route
              path="/production"
              element={
                <ProtectedRoute>
                  <Production />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/quality"
              element={
                <ProtectedRoute>
                  <QualityPrediction />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/qc"
              element={
                <ProtectedRoute>
                  <QCDashboard />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/ai-reports"
              element={
                <ProtectedRoute>
                  <AIReports />
                </ProtectedRoute>
              }
            />
            <Route
  path="/raw-materials"
  element={
    <ProtectedRoute>
      <RawMaterials />
    </ProtectedRoute>
  }
/>
<Route
  path="/raw-materials/add"
  element={
    <ProtectedRoute>
      <AddRawMaterial />
    </ProtectedRoute>
  }
/>
<Route path="/equipment" element={<EquipmentDashboard />} />
<Route path="/equipment/add" element={<AddEquipment />} />
<Route path="/inventory" element={<Inventory />} />
<Route path="/ai-assistant" element={<AIAssistant />} />
<Route path="/register" element={<Register />} />
{isAdmin() && (
  <Route path="/admin/register" element={<AdminRegister />} />
)}







          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
