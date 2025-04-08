import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Admin from "./pages/Admin";
import GestionCategory from "./pages/GestionCategory";
import GestionProduct from "./pages/GestionProduct";
import GestionProductDetails from "./pages/GestionProductDetails";
import GestionCommand from "./pages/gestionCommand";
import NotFound from "./pages/NotFound";
import DetailsProduct from "./pages/DetailsProduct";
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/produits' element={<Product />} />
        <Route path='/produits/:id' element={<DetailsProduct />} />
        <Route path='/login' element={<Login />} />
        <Route path='sign-up' element={<SignUp />} />
        <Route path='/compte/:id' element={<Account />} />
        <Route path='/panier' element={<Cart />} />
        <Route path='/admin' element={<Admin />}>
          <Route index element={<Navigate to="/admin/gestion-produits" replace />} />
          <Route path='gestion-categories' element={<GestionCategory />} />
          <Route path='gestion-produits' element={<GestionProduct />} />
          <Route path='gestion-commandes' element={<GestionCommand />} />
        </Route>
        <Route path='admin/gestion-produits/:id' element={<GestionProductDetails />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;
