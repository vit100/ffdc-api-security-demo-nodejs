const jwt = require('jsonwebtoken');


extractRequestData =(req)=>{
  return {
    url: req.url,
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
