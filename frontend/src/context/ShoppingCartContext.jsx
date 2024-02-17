import { useRef, useState, useContext, createContext } from 'react';

const CartContext = createContext();

export function ModalProvider({ children }) {
  const cartRef = useRef();
  const [items, setItems] = useState([]);

  const contextValue = {
    items,
    setItems
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={cartRef} />
    </>
  );
}

export const useCartContext = () => useContext(CartContext);
