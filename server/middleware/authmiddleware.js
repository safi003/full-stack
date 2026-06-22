// Importation de jsonwebtoken pour vérifier les tokens
import jwt from "jsonwebtoken";

// Middleware de protection des routes authentifiées
// Vérifie que le token JWT est présent et valide
const auth = (req, res, next) => {
  try {
    // Récupération du token depuis l'en-tête Authorization
    // Format attendu : "Bearer <token>"
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Accès refusé, token manquant" });
    }

    // Vérification et décodage du token avec la clé secrète
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Ajout des données décodées à la requête pour les routes suivantes
    req.user = decoded;
    // Passage au middleware/route suivant
    next();
  } catch (err) {
    // Token invalide ou expiré
    return res.status(403).json({ message: "Token invalide ou expiré" });
  }
};

export default auth;
