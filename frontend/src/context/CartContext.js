import { createContext, useState, useContext, useEffect } from "react";
const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const addToCart = (product, size, qty=1) => {
    setCart((prev) => {
      const found = prev.find(p=>p._id===product._id && p.size===size);
      if(found){
        return prev.map(p=> p._id===product._id && p.size===size ? {...p, quantity: p.quantity + qty} : p);
      }
      return [...prev, { ...product, size, quantity: qty }];
    });
  };
  const updateQty = (id, size, qty) => {
    setCart((prev) =>
      prev.map((item) => (item._id === id && item.size===size ? { ...item, quantity: qty } : item))
    );
  };
  const removeItem = (id, size) => {
    setCart((prev) => prev.filter((item) => !(item._id === id && item.size===size)));
  };
  const clearCart = () => setCart([]);
  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
