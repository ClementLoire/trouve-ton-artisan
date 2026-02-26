const errorHandler = (err, req, res, next) => {
  console.error('╔═══════════════════════════════════════╗');
  console.error('║           ERREUR SERVEUR              ║');
  console.error('╚═══════════════════════════════════════╝');
  console.error('Date:', new Date().toISOString());
  console.error('URL:', req.method, req.path);
  console.error('Erreur:', err.message);

  if (process.env.NODE_ENV === 'development') {
    console.error('Stack:', err.stack);
  }
  console.error('');

  const statusCode = err.statusCode || 500;

  const message = err.message || 'Erreur interne du serveur';

  const errorResponse = {
    success: false,
    message: message,
    error: {
      status: statusCode,
      timestamp: new Date().toISOString()
    }
  };
  if (process.env.NODE_ENV === 'development') {
    errorResponse.error.stack = err.stack;
    errorResponse.error.details = err;
  }

  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;