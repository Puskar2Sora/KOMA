import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoomDetails from "./pages/RoomDetails";
import EditRoom from "./pages/EditRoom";
import MyRooms from "./pages/MyRooms";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import PublicRoute from "./components/PublicRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Rooms from "./pages/Rooms";
import AddRoom from "./pages/AddRoom";
import GoogleSuccess from "./pages/GoogleSuccess";
import LandingPage from "./pages/LandingPage";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.get("https://koma-backend-801z.onrender.com/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return null; 

  return (
    <BrowserRouter>
      <Navbar user={user} />

      <main className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Routes>
          <Route 
            path="/" 
            element={user ? <Rooms /> : <LandingPage />} 
          />
          
          <Route path="/rooms/:id" element={<RoomDetails />} />

          {/* 🔓 Public routes */}
          <Route
            path="/login"
            element={
              <PublicRoute user={user}>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute user={user}>
                <Signup />
              </PublicRoute>
            }
          />

          <Route path="/google-success" element={<GoogleSuccess />} />

          {/* 🔐 Protected routes */}
          <Route
            path="/add-room"
            element={
              <ProtectedRoute user={user}>
                <AddRoom />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-rooms"
            element={
              <ProtectedRoute user={user}>
                <MyRooms />
              </ProtectedRoute>
            }
          />

          <Route
            path="/rooms/:id/edit"
            element={
              <ProtectedRoute user={user}>
                <EditRoom />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />

    </BrowserRouter>
  );
}

export default App;