import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Homepage from "./pages/homepage/Homepage";
import Navbar from "./components/navbar/Navbar";
import About from "./pages/about/About";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import ProductDetails from "./pages/productDetails/ProductDetails";
import AdminDashboard from "./pages/admin/AdminDashboard/AdminDashboard";
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

                {/* Product Details */}
                <Route path="/products/details/:id" element={<ProductDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
