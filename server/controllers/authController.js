// Importation des modules nécessaires
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

// Contrôleur pour l'inscription d'un nouvel utilisateur
export const register = async (req, res) => {
  try {
    // Récupération des données envoyées par le client
    const { name, email, password } = req.body;

   
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User exists" });

    // Hachage du mot de passe avant stockage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du nouvel utilisateur dans la base de données
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Contrôleur pour la connexion d'un utilisateur
export const login = async (req, res) => {
  try {
    // Récupération des données envoyées par le client
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Comparaison du mot de passe fourni avec celui stocké
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    // Génération d'un token JWT valable 1 jour
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Réponse avec le token et les informations utilisateur
    res.json({ token, user });
  } catch (err) {
    // Gestion des erreurs
    res.status(500).json(err);
  }
};
