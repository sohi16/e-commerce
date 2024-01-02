import React from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Import a cart icon from a library
import { useCart } from '../components/CartContext';
import styled from 'styled-components';



const CartItemCount = styled.span`
  background-color: blue;
  color: white;
  border-radius: 100%;
  font-weight:bold;
  padding: 4px;
  font-size: 14px;
  position: absolute;
  top: -6px;
  right: -6px;
`;

const CartIcon = ({ onClick }) => {
  const { cartCount } = useCart();

  return (
    <div onClick={onClick}>
      <FaShoppingCart size={32} />
      {cartCount > 0 && <CartItemCount>{cartCount}</CartItemCount>}
      </div>
  );
};

export default CartIcon;
