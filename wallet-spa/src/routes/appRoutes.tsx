import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/home";
import ProtectedRoute from "./protectedRoute";
import Signup from "../pages/signup";
import TransactionInput from "../pages/transactionInput";
import TransactionOutput from "../pages/transactionOutput";

export default function AppRouter() {
	return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transaction/input"
          element={
            <ProtectedRoute>
              <TransactionInput />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transaction/output"
          element={
            <ProtectedRoute>
              <TransactionOutput />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  );
}

