// Étape 1: Importation des modules nécessaires
// express : framework web pour créer le serveur
// mongoose : ODM pour MongoDB
// cors : permet les requêtes cross-origin
// dotenv : charge les variables d'environnement depuis .env
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Importation des routes (créées dans le dossier routes/)
import authRoutes from "./routes/auth.js";

// Étape 2: Configuration des variables d'environnement
dotenv.config();

// Étape 3: Initialisation de l'application Express
const app = express();

// Étape 4: Middleware globaux
// cors() - autorise uniquement les requêtes depuis le CLIENT_URL (déploiement séparé)
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
}));
// express.json() - permet de parser le body des requêtes en JSON
app.use(express.json());

// Étape 5: Route de test à la racine "/"
// Retourne un message confirmant que le serveur fonctionne
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Étape 6: Montage des routes
// Toutes les routes d'authentification seront préfixées par /api/auth
app.use("/api/auth", authRoutes);

// Étape 7: Connexion à MongoDB via Mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch(err => console.log(err));

// Étape 8: Définition du port d'écoute
// Utilise le port défini dans .env, sinon 5000 par défaut
const PORT = process.env.PORT || 5000;

// Étape 9: Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
