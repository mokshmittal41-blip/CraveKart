import React, { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useCart } from './hooks/useCart';
import { useLocalStorage } from './hooks/useLocalStorage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import Toast from './components/Toast';
import Home from './pages/Home';
import Menu from './pages/Menu';
import DishDetail from './pages/DishDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import './App.css';

export default function App() {
  const [user, setUser] = useLocalStorage('cravekart_user', null);
  const [orders, setOrders] = useLocalStorage('cravekart_orders', []);

  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subtotal,
    deliveryFee,
    tax,
    grandTotal,
    amountNeededForFreeDelivery,
  } = useCart();

  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast({ message: '', type: 'success' });
  }, []);

  const handleLogin = useCallback((userData) => {
    setUser(userData);
  }, [setUser]);

  const handleLogout = useCallback(() => {
    setUser(null);
    showToast('Signed out successfully. See you soon!', 'info');
  }, [setUser, showToast]);

  const handlePlaceOrder = useCallback((newOrder) => {
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
  }, [setOrders]);

  const handleAddToCartWithToast = useCallback((dish, quantity = 1) => {
    addToCart(dish, quantity);
    showToast(`Added ${quantity}x "${dish.name}" to cart! 🛒`, 'success');
  }, [addToCart, showToast]);

  return (
    <div className="app-layout">
      <ScrollToTop />
      <Navbar 
        totalItems={totalItems} 
        user={user} 
        onLogout={handleLogout} 
      />

      <Routes>
        <Route 
          path="/" 
          element={<Home onAddToCart={handleAddToCartWithToast} />} 
        />
        
        <Route 
          path="/menu" 
          element={<Menu onAddToCart={handleAddToCartWithToast} />} 
        />
        
        <Route 
          path="/menu/:dishId" 
          element={<DishDetail onAddToCart={handleAddToCartWithToast} />} 
        />
        
        <Route 
          path="/cart" 
          element={
            <Cart
              cart={cart}
              totalItems={totalItems}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              tax={tax}
              grandTotal={grandTotal}
              amountNeededForFreeDelivery={amountNeededForFreeDelivery}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              onClearCart={clearCart}
              onShowToast={showToast}
            />
          } 
        />

        <Route 
          path="/login" 
          element={<Login onLogin={handleLogin} onShowToast={showToast} />} 
        />
        
        <Route 
          path="/signup" 
          element={<Signup onLogin={handleLogin} onShowToast={showToast} />} 
        />

        <Route path="/about" element={<About />} />
        
        <Route path="/contact" element={<Contact onShowToast={showToast} />} />

        <Route 
          path="/checkout" 
          element={
            <Checkout
              cart={cart}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              tax={tax}
              grandTotal={grandTotal}
              user={user}
              onPlaceOrder={handlePlaceOrder}
              onClearCart={clearCart}
              onShowToast={showToast}
            />
          } 
        />

        <Route 
          path="/orders" 
          element={
            <ProtectedRoute user={user}>
              <Orders orders={orders} user={user} />
            </ProtectedRoute>
          } 
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={hideToast} 
      />
    </div>
  );
}
