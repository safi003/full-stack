import { Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./services/productService";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";

function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Erreur de chargement</div>;
  }

  return (
    <div className="p-6">
      <div>
        <h1>Products - Docs</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition">
            <CardContent className="p-4">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="mt-3 font-semibold text-lg">{product.title}</h2>
              <p className="text-sm text-gray-500">
                {product.description.slice(0, 60)}...
              </p>
              <div className="mt-3 flex justify-between items-center">
                <span className="font-bold text-green-600">
                  ${product.price}
                </span>
                <button className="bg-black text-white px-3 py-1 rounded-md text-sm">
                  Add
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
