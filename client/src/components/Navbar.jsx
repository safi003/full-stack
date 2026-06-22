import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-background">
      {/* Logo / Lien vers l'accueil */}
      <Link to="/" className="text-xl font-bold">
        MyApp
      </Link>

      {/* Liens de navigation */}
      <div className="flex items-center gap-4">
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
