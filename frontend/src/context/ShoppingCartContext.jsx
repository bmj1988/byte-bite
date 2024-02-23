import { useState, useContext, createContext } from 'react';

const CartContext = createContext();

export function useCartContext() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [menuItemId, setMenuItemId] = useState(null);
  const [cart, setCart] = useState(null)
  const [itemQuantity, setItemQuantity] = useState(1)
  const [price, setPrice] = useState(null)
  const [restaurantId, setRestaurantId] = useState(null);
  const [stAddress, setStAddress] = useState('Enter your address')
  const [deliveryTime, setDeliveryTime] = useState('Now')
  const [locality, setLocality] = useState('')
  const [city, setCity] = useState('')

  const contextValue = {
    menuItemId,
    setMenuItemId,
    cart,
    setCart,
    itemQuantity,
    setItemQuantity,
    price,
    setPrice,
    restaurantId,
    setRestaurantId,
    stAddress,
    setStAddress,
    locality,
    setLocality,
    city,
    setCity,
    deliveryTime,
    setDeliveryTime
  };

  return (
      <CartContext.Provider value={contextValue}>
        {children}
      </CartContext.Provider>
  );
}
