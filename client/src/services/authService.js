// URL de base de l'API backend (variable d'environnement Vite)
const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

// Inscription d'un nouvel utilisateur
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message);
  }
  return response.json();
};

// Connexion d'un utilisateur
export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message);
  }
  return response.json();
};
