// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/login';
import { CartProvider } from './components/CartContext';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  return (
      <Router>
        <CartProvider>
        <Routes>     
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} setToken={setToken} />}
          />          
          <Route
            path="/"
            element={
             isAuthenticated || token ? (
                <Home setIsAuthenticated={setIsAuthenticated} token={token} setToken={setToken} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>   
        </CartProvider>
      </Router>
   
  );
};

export default App;
