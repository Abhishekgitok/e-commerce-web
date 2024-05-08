import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Policy from "./pages/Policy.jsx";
import Pagenotfound from "./pages/Pagenotfound.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import Dashboard from "./pages/user/Dashboard.jsx";
import ForgotPasssword from "./pages/Auth/ForgotPasssword.jsx";
import PrivateRoute from "./components/Routes/Private.jsx";
import AdminRoute from "./components/Routes/AdminRoute.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import CreateCategory from "./pages/Admin/CreateCategory.jsx";
import CreateProduct from "./pages/Admin/CreateProduct.jsx";
import Profile from "./pages/user/Profile.jsx";
import Orders from "./pages/user/Orders.jsx";
import Products from "./pages/Admin/Products.jsx";
import UpdateProduct from "./pages/Admin/UpdateProduct.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Search from "./pages/Search.jsx";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search  />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/login" element={<Login />} />

        {/* User Section Nasted Routing  */}

        <Route path="/dashboard" element={<PrivateRoute/>}>
           <Route path="user" element={<Dashboard />} />
           <Route path="user/profile" element={<Profile />} />
           <Route path="user/orders" element={<Orders />} />
        </Route>

        {/* Admin Section Nasted Routing  */}
        <Route path="/dashboard" element={<AdminRoute/>}>
           <Route path="admin" element={<AdminDashboard/>} />
           <Route path="admin/create-category" element={<CreateCategory/>} />
           <Route path="admin/create-product" element={<CreateProduct/>} />
           <Route path="admin/products" element={<Products />} />
           <Route path="admin/product/:slug" element={<UpdateProduct />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
