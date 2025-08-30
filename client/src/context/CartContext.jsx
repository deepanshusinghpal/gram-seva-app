// client/src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const CartContext = createContext();

// Create a custom hook to use the cart context
export const useCart = () => {
    return useContext(CartContext);
};

// Create the Provider component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Load cart from local storage on initial load
        try {
            const localData = localStorage.getItem('cartItems');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            return [];
        }
    });

    useEffect(() => {
        // Save cart to local storage whenever it changes
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            // Check if product is already in cart
            const itemExists = prevItems.find(item => item.product_id === product.product_id);
            if (itemExists) {
                // If it exists, increase quantity
                return prevItems.map(item =>
                    item.product_id === product.product_id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // If not, add new product with quantity 1
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.product_id !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
