import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import AuthProvider from "./context/Auth/AuthProvider";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CartProvider from "./context/Cart/CartProvider";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import MyordersPage from "./pages/MyordersPage";
import Footer from "./pages/Footer";
import UsersList from "./pages/UsersList";
import EditUserForm from "./pages/EditUserFrom";
import CategoryList from "./pages/CategoryList";
import AddCategory from "./pages/AddCategory";
import ProductList from "./pages/ProductList";
import EditProduct from "./pages/editProduct";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/my-orders" element={<MyordersPage />} />
              <Route path="/users-list" element={<UsersList />} />
              <Route path="/user-edit/:id" element={<EditUserForm />} />
              <Route path="/category-list" element={<CategoryList />} />
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/product-list" element={<ProductList />} />
              <Route path="/product-edit/:id" element={<EditProduct />} />
              <Route path="/add-product" element={<AddProduct />} />
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
