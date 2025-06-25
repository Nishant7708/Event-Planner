import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import MyRsvps from "./pages/MyRsvps"; 
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={user ? <Events /> : <Navigate to="/login" />}
        />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route
          path="/admin"
          element={user?.role === "Admin" ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/my-rsvps"
          element={user ? <MyRsvps /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
