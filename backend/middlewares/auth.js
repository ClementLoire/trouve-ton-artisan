require('dotenv').config();

const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: 'Clé API manquante. Veuillez inclure x-api-key dans les headers.'
    });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({
      success: false,
      message: 'Clé API invalide. Accès refusé.'
    });
  }

  next();
};

module.exports = { validateApiKey };