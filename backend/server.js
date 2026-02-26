require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sequelize = require('./config/database');
const errorHandler = require('./middlewares/errorHandler');
const { validateApiKey } = require('./middlewares/auth');

const categoryRoutes = require('./routes/categories');
const artisanRoutes = require('./routes/artisans');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-api-key']
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Trop de requêtes, veuillez réessayer plus tard'
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use(limiter);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', validateApiKey);

app.get('/health', (req, res) => {
  res.json({ 
    success: true,
    message: 'API Trouve ton artisan opérationnelle',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

app.use('/api/categories', categoryRoutes);
app.use('/api/artisans', artisanRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée',
    path: req.path
  });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données réussie');
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Modèles synchronisés');
    }
    
    app.listen(PORT, () => {
      console.log('╔════════════════════════════════════════╗');
      console.log('║   API TROUVE TON ARTISAN DÉMARRÉE     ║');
      console.log('╚════════════════════════════════════════╝');
      console.log(`🚀 Serveur : http://localhost:${PORT}`);
      console.log(`🌍 Environnement : ${process.env.NODE_ENV}`);
      console.log(`📡 CORS autorisé : ${process.env.CORS_ORIGIN}`);
      console.log('');
      console.log('Routes disponibles :');
      console.log(`  GET  /health`);
      console.log(`  GET  /api/categories`);
      console.log(`  GET  /api/categories/:id`);
      console.log(`  GET  /api/artisans`);
      console.log(`  GET  /api/artisans/top`);
      console.log(`  GET  /api/artisans/:id`);
      console.log(`  POST /api/artisans/:id/contact`);
      console.log('');
      console.log('Appuyez sur Ctrl+C pour arrêter');
    });
  } catch (error) {
    console.error('❌ Erreur au démarrage du serveur:', error);
    process.exit(1);
  }
};

process.on('unhandledRejection', (error) => {
  console.error('❌ Erreur non gérée:', error);
  process.exit(1);
});

startServer();

module.exports = app;