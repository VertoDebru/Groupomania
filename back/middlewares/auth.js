const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log('--- enter middleware auth ---');
    if(!req.headers.authorization) {
      throw 'Token manquant!';
    }

    const token = req.headers.authorization.split(' ')[1].split('"')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable!';
    } else {
      console.log('--- exit middleware auth ---');
      next();
    }
  } catch {
    res.status(401).json({ error: 'Requête non authentifiée!' });
  }
};
