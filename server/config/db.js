// Importation de mongoose pour la connexion à MongoDB
import mongoose from "mongoose";

// Fonction de connexion à la base de données MongoDB
const connectDB = async () => {
  try {
    // Connexion avec l'URI stockée dans le fichier .env
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connecté: ${conn.connection.host}`);
  } catch (err) {
    // Affichage de l'erreur et arrêt du processus en cas d'échec
    console.error(`Erreur de connexion MongoDB: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
