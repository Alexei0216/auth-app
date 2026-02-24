import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (game) => {
        setCart(prev => {
            const exists = prev.find(item => item.id === game.id);
            if (exists) return prev;
            return [...prev, game];
        });
    };

    const removeFromCart = (gameId) => {
        setCart(prev => prev.filter(item => item.id !== gameId));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);