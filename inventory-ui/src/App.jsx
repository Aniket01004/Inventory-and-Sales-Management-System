import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./layout/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";

import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import DeleteProduct from "./pages/DeleteProduct";
import CreateSale from "./pages/CreateSale";
import ViewSales from "./pages/ViewSales";
import DailyReport from "./pages/DailyReport";
import MonthlyReport from "./pages/MonthlyReport";
import Login from "./pages/Login";
import LowStock from "./pages/LowStock";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>

          <Route
            path="/dashboard"
            element={
              <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                <Dashboard />
              </RoleProtectedRoute>
            }
          />

          <Route path="/products" element={<ProductList />} />

          <Route
            path="/products/add"
            element={
              <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                <AddProduct />
              </RoleProtectedRoute>
            }
          />

          <Route
  path="/products/update/:id"
  element={
    <RoleProtectedRoute allowedRoles={["ADMIN"]}>
      <UpdateProduct />
    </RoleProtectedRoute>
  }
/>

          <Route
            path="/products/delete"
            element={
              <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                <DeleteProduct />
              </RoleProtectedRoute>
            }
          />

          <Route path="/products/low-stock" element={<LowStock />} />

          <Route path="/sales/create" element={<CreateSale />} />
          <Route path="/sales/view" element={<ViewSales />} />

          <Route
            path="/sales/daily"
            element={
              <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                <DailyReport />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/sales/monthly"
            element={
              <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                <MonthlyReport />
              </RoleProtectedRoute>
            }
          />

        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;