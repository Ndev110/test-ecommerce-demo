require('dotenv').config();
const validateApiKeyMiddleware = function (req, res, next) {
const jwt = require('jsonwebtoken');    
  var apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(400).json({ message: 'Your x-api-key header is missing.' });
  }

  jwt.verify(apiKey, process.env.API_SECRET, function(err, decoded) {
    if (err) {
      return res.status(401).json({ message: 'Invalid API key.' });
    }
  });

  next();
};

module.exports = {
 validateApiKeyMiddleware
};
