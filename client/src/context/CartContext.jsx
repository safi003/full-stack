import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  getCart as getCartApi,
  addToCartApi,
  updateQuantityApi,
  removeFromCartApi,
  clearCartApi,
} from "@/services/cartService";

const CartContext = createContext();

function isLoggedIn() {
  return !!localStorage.getItem("token");
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCart = useCallback(async () => {
    if (!isLoggedIn()) {
      try {
        const saved = localStorage.getItem("cart");
        setCart(saved ? JSON.parse(saved) : []);
      } catch {
        setCart([]);
      }
      setLoading(false);
      return;
    }
    try {
      const data = await getCartApi();
      const normalized = data.items.map((item) => ({
        id: item.productId,
        title: item.title,
        price: item.price,
        thumbnail: item.thumbnail,
        quantity: item.quantity,
      }));
      setCart(normalized);
    } catch {
      setCart([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  useEffect(() => {
    if (!isLoggedIn()) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = async (product) => {
    const item = {
      id: product.id ?? product.productId,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    };

    if (!isLoggedIn()) {
      setCart((prev) => {
        const existing = prev.find((p) => p.id === item.id);
        if (existing) {
          return prev.map((p) =>
            p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
          );
        }
        return [...prev, { ...item, quantity: 1 }];
      });
      return;
    }

    try {
      const data = await addToCartApi({
        productId: item.id,
        title: item.title,
        price: item.price,
        thumbnail: item.thumbnail,
      });
      const normalized = data.items.map((p) => ({
        id: p.productId,
        title: p.title,
        price: p.price,
        thumbnail: p.thumbnail,
        quantity: p.quantity,
      }));
      setCart(normalized);
    } catch {
      // fallback local
    }
  };

  const removeFromCart = async (id) => {
    if (!isLoggedIn()) {
      setCart((prev) => prev.filter((p) => p.id !== id));
      return;
    }
    try {
      const data = await removeFromCartApi(id);
      const normalized = data.items.map((p) => ({
        id: p.productId,
        title: p.title,
        price: p.price,
        thumbnail: p.thumbnail,
        quantity: p.quantity,
      }));
      setCart(normalized);
    } catch {
      // fallback
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    if (!isLoggedIn()) {
      setCart((prev) =>
        prev.map((p) => (p.id === id ? { ...p, quantity } : p))
      );
      return;
    }

    try {
      const data = await updateQuantityApi(id, quantity);
      const normalized = data.items.map((p) => ({
        id: p.productId,
        title: p.title,
        price: p.price,
        thumbnail: p.thumbnail,
        quantity: p.quantity,
      }));
      setCart(normalized);
    } catch {
      // fallback
    }
  };

  const clearCart = async () => {
    if (!isLoggedIn()) {
      setCart([]);
      return;
    }
    try {
      await clearCartApi();
      setCart([]);
    } catch {
      // fallback
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
