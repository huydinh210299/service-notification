const jwt = require('jsonwebtoken')

const { tokenSettings } = require('../../config/vars')

const addPayload = (req, res, next) => {
  const accessToken = req.headers['x-access-token']
  const payload = jwt.verify(accessToken, tokenSettings.secretKey)
  req.payload = payload
  next()
}

module.exports = addPayload
