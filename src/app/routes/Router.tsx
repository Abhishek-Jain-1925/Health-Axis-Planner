import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Signup from "../../features/Patient/components/Signup";
import NotFound from "../components/NotFound";
import Login from "../../features/Patient/components/Login";
import UserProfile from "../../features/Patient/components/profile/UserProfile";
import AdminProfile from "../../features/Admin/components/AdminProfile";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/profile"
          element={<ProtectedRoute Component={UserProfile} />}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute Component={AdminProfile} />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
