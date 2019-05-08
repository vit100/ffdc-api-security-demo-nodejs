const expressJWT = require('express-jwt');
const jwksRsa = require('jwks-rsa');

module.exports = () => {
  return expressJWT({
    secret: jwksRsa.expressJwtSecret({
      jwksUri: process.env.JWKS,
      cache: true,
      rateLimit: true,
      algorithms: ['RS256']
    })
  }).unless({ path: ['/'] });
};
