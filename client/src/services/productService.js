export const getProducts = async () => {
  const response = await fetch(
    "https://dummyjson.com/products"
  );

  if (!response.ok) {
    throw new Error("Erreur API");
  }

  return response.json();
};