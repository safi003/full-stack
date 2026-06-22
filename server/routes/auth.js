import express from "express";
// Importation des contrôleurs (logique métier séparée dans controllers/)
import { register, login } from "../controllers/authController.js";

// Création du routeur Express
const router = express.Router();

// Route POST /api/auth/register - Inscription d'un nouvel utilisateur
router.post("/register", register);

// Route POST /api/auth/login - Connexion d'un utilisateur existant
router.post("/login", login);

// Exportation du routeur pour l'utiliser dans server.js
export default router;
