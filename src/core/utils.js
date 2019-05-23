const jwt = require('jsonwebtoken');

extractRequestData =(req)=>{
  return {
    dateTime: Date.now(),
    url: req.url,
    method: req.method,
    params: req.params,
    headers: req.headers,
    body: req.body,
    token: req.token,
    parsedJWT: jwt.decode(req.token)
  }
}

module.exports = {
  extractRequestData
}
