const express = require('express')
const timeout = require('connect-timeout')

const notificationRoutes = require('./notification.routes')
const sseRoutes = require('./sse.routes')

const router = express.Router()

router.use('/notifications/v1', timeout('5s'), notificationRoutes)
router.use('/notifications/SSE', sseRoutes)

module.exports = router
