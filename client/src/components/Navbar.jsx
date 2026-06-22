import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-background">
      <Link to="/" className="text-xl font-bold">
        MyApp
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/cart" className="relative">
          <Button variant="outline">
            Cart
            {totalItems > 0 && (
              <span className="ml-1 bg-black text-white text-xs rounded-full px-2 py-0.5">
                {totalItems}
              </span>
            )}
          </Button>
        </Link>
        <Link to="/register">
          <Button variant="outline">Register</Button>
        </Link>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </nav>
  );
}
