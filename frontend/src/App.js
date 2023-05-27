import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import About from "./pages/about/About";
import Navbar from "./components/navbar/Navbar";
import AdminDashboard from "./pages/admin/AdminDashboard/AdminDashboard";
import Profile from "./pages/profile/Profile";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminProductEdit from "./pages/admin/AdminProductEdit/AdminProductEdit";

function App() {
    return (
        <Router>
            <Navbar />
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* About */}
                <Route path="/about" element={<About />} />

                {/* Profile */}
                <Route path="/profile" element={<Profile />} />

                {/* Admin Dashboard */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                {/* Admin Product Edit */}
                <Route path="/admin/product/edit/:id" element={<AdminProductEdit />} />
            </Routes>
        </Router>
    );
}

export default App;
