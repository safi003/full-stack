const API_URL = `${import.meta.env.VITE_API_URL}/api/cart`;

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const getCart = async () => {
  const res = await fetch(API_URL, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
};

export const addToCartApi = async (product) => {
  const res = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to add to cart");
  return res.json();
};

export const updateQuantityApi = async (productId, quantity) => {
  const res = await fetch(`${API_URL}/update`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ productId, quantity }),
  });
  if (!res.ok) throw new Error("Failed to update quantity");
  return res.json();
};

export const removeFromCartApi = async (productId) => {
  const res = await fetch(`${API_URL}/remove/${productId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to remove from cart");
  return res.json();
};

export const clearCartApi = async () => {
  const res = await fetch(`${API_URL}/clear`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to clear cart");
  return res.json();
};
