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
import Cart from "./pages/cart/Cart";
import Order from "./pages/order/Order";
import AdminOrder from "./pages/adminorder/AdminOrder";
import Search from "./pages/search/Search";
import ForgotPassword from "./pages/forget_password/ForgotPassword";
import AdminRoute from "./protected/AdminRoute";
import UserRoute from "./protected/UserRoute";

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

                {/* Product Details */}
                <Route path="/products/details/:id" element={<ProductDetails />} />

                {/* Search */}
                <Route path="/search/:query" element={<Search />} />

                {/* Forgot Password */}
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Protected Route */}
                {/* Admin Route */}
                <Route element={<AdminRoute />}>
                    {/* Admin Order */}
                    <Route path="/admin/order" element={<AdminOrder />} />
                    {/* Admin Dashboard */}
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    {/* Admin Product Edit */}
                    <Route path="/admin/product/edit/:id" element={<AdminProductEdit />} />
                </Route>

                {/* User Route */}
                <Route element={<UserRoute />}>
                    {/* Profile */}
                    <Route path="/profile" element={<Profile />} />
                    {/* Cart */}
                    <Route path="/cart" element={<Cart />} />
                    {/* Order */}
                    <Route path="/order" element={<Order />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
