const { Router } = require('express')

const { sseController: controller } = require('../controllers')

const router = Router()

router.route('/streaming').get(controller.pushNotification)

module.exports = router
