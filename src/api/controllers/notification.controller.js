const httpStatus = require('http-status')
const EventEmitter = require('events')

const getApiResponse = require('../utils/response')
const { notificationRepo, userNotificationRepo } = require('../repo')
const { EE } = require('../constants')

const ee = new EventEmitter()

const getUserNotifications = async (req, res, next) => {
  const { uid } = req.payload
  const filter = { ...req.query, userId: uid }
  try {
    const { data, total } = await userNotificationRepo.getUserNotifications(
      filter
    )
    return res.status(httpStatus.OK).json(
      getApiResponse({
        data,
        total
      })
    )
  } catch (error) {
    next(error)
  }
}

const createNotification = async (req, res, next) => {
  const { userIds, ...notificationData } = req.body

  try {
    const createdNotification = await notificationRepo.createNotification(
      notificationData
    )
    const createdUserNotification = await userNotificationRepo.createUserNotification(
      userIds,
      createdNotification._id
    )
    ee.emit(
      EE.NOTIFICATION_EVENT_LISTENER,
      createdNotification,
      createdUserNotification
    )
    return res.status(httpStatus.OK).json(
      getApiResponse({
        data: createdNotification
      })
    )
  } catch (error) {
    next(error)
  }
}

const updateUsersNotification = async (req, res, next) => {
  const {
    params: { notificationId },
    body: updateData
  } = req
  try {
    const updatedNotification = await userNotificationRepo.updateUserNotification(
      notificationId,
      updateData
    )
    return res.status(httpStatus.OK).json(
      getApiResponse({
        data: updatedNotification
      })
    )
  } catch (error) {
    next(error)
  }
}

const getNotification = async (req, res, next) => {
  console.log(req.url)
  const { notificationId } = req.params
  try {
    const notification = await notificationRepo.getNotification(notificationId)
    return res.status(httpStatus.OK).json(
      getApiResponse({
        data: notification
      })
    )
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUserNotifications,
  createNotification,
  updateUsersNotification,
  getNotification,
  ee
}
