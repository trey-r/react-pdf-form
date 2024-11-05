import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import MainForm from "./views/MainForm";
import Login from "./views/Login";
import Areas from "./views/Admin/Areas";
import Strategies from "./views/Admin/Strategies";
import Security from "./views/Admin/Security";
import Students from "./views/Admin/Students";

const ProtectedRoute = ({ children }) => {
  const username = localStorage.getItem("username")
  return username ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
    const username = localStorage.getItem("username")
    return username === "admin" ? children : <Navigate to="/" />;
  };

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout>
              <Areas />
            </AdminLayout>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/:areaId"
        element={
          <AdminRoute>
            <AdminLayout>
              <Strategies />
            </AdminLayout>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/security"
        element={
          <AdminRoute>
            <AdminLayout>
              <Security />
            </AdminLayout>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/students"
        element={
          <AdminRoute>
            <AdminLayout>
              <Students />
            </AdminLayout>
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
