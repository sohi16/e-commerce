import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
    };

    const cartCount = cartItems.length;

    const calculateTotal = () => {
        // Replace this logic with your actual calculation for the total amount
        const total = cartItems.reduce((acc, item) => acc + item.price, 0);
        return total.toFixed(2); // Adjust to match your currency format
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, cartCount, calculateTotal }}>
            {children}
        </CartContext.Provider>
    );
};
