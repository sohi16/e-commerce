import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductList from './ProductList';
import CartIcon from './CartIcon';
import { useCart } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  position: relative; /* Set position to relative */
`;

const Heading = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: absolute; /* Set position to absolute */
  top: 20px; /* Position from top */
  right: 20px; /* Position from right */

  &:hover {
    background-color: #0056b3;
  }
`;

const CartItems = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  /* Additional cart styles */
  border: 1px solid #ccc;
  border-radius:5px;
  background-color: #f9f9f9;
  padding: 10px;
  margin:10px 10px 10px 0px;
  max-width: 1000px;
  ul {
    /* additional styles */
    list-style-type: none;
    padding: 0;
  }

  li {
    /* additional styles */
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  img {
    /* additional styles */
    width: 50px;
    height: 50px;
    margin-right: 10px;
    object-fit: cover;
  }
`;
const CartIconWrapper = styled.div`
  position: absolute;
  top: 115px;
  right: 30px;
  cursor: pointer;
`;

const Home = ({ setIsAuthenticated, token, setToken }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount, cartItems, calculateTotal } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const getProductCount = (productId) => {
    // Calculate the count of a specific product in the cart
    const productCount = cartItems.reduce((count, item) => {
      return item.id === productId ? count + 1 : count;
    }, 0);
    return productCount;
  };
  const uniqueCartItems = [...new Map(cartItems.map((item) => [item.id, item])).values()];
  return (
    <HomeContainer>{token && (
      <>
        <Heading>E-commerce Application</Heading>

        <CartIconWrapper>
          {/* CartIcon here */}
          <CartIcon onClick={toggleCart} />
        </CartIconWrapper>

        <CartItems isOpen={isCartOpen}>
          <h3>No. of items in cart: {cartCount}   </h3>
          <h3> Total Amount: ${calculateTotal()}</h3>
          <h3>Cart Items:</h3>
          <ul>
            {uniqueCartItems.map((item, index) => (
              <li key={index}>
                <img src={item.thumbnail} alt={item.title} />
                {item.title} - ${item.price} <br />
                Quantity: {getProductCount(item.id)}
              </li>
            ))}
          </ul>

        </CartItems>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        <ProductList />
      </>)}
    </HomeContainer>
  );
};

export default Home;
