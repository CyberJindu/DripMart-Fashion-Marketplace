import { createContext, useContext, useEffect, useState } from "react";
import { createOrder, fetchOrders } from "../api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  // Fetch orders for logged-in user
  useEffect(() => {
    async function loadOrders() {
      if (!user) return;
      try {
        const role = user.role || "customer"; // fallback if role missing
        const data = await fetchOrders(user._id, role);
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    }
    loadOrders();
  }, [user]);

  // Add item to cart
  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  // Remove single item from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  // Clear cart after checkout
  const clearCart = () => setCart([]);

  // Checkout: create new order(s) in backend
  const checkout = async () => {
    if (!user || cart.length === 0) return;

    // Backend only needs items
    const items = cart.map((item) => ({
      productId: item._id,
      quantity: 1,
    }));

    try {
      const createdOrders = await createOrder(items); // returns an array
      setOrders((prev) => [...prev, ...createdOrders]);
      clearCart();
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, checkout, orders }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
