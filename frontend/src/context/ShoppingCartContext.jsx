import { useState, useContext, createContext } from 'react';

const CartContext = createContext();

export function useCartContext() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [menuItemId, setMenuItemId] = useState(null);
  const [cart, setCart] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState(null)


  const contextValue = {
    menuItemId,
    setMenuItemId,
    cart,
    setCart,
    quantity,
    setQuantity,
    price,
    setPrice
  };

  return (
      <CartContext.Provider value={contextValue}>
        {children}
      </CartContext.Provider>
  );
}
