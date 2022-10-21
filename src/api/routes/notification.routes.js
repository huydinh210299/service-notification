const { Router } = require('express')

const { notificationController: controller } = require('../controllers')
const { notificationValidation: validation } = require('../validation')
const addPayload = require('../middlewares/handlePayload')
// const { verifyToken } = require('../middlewares')

const router = Router()

router
  .route('/')
  .get(
    validation.getNotificationsValidate,
    addPayload,
    controller.getUserNotifications
  )

router
  .route('/')
  .post(validation.createNotificationValidate, controller.createNotification)

router
  .route('/:notificationId')
  .put(
    validation.updateNotificationValidate,
    controller.updateUsersNotification
  )

router.route('/:notificationId').get(controller.getNotification)

module.exports = router
