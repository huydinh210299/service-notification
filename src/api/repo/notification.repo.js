const Notification = require('../models/notification.model')

const createNotification = async data => {
  const notification = new Notification(data)
  const createdNotification = await notification.save()
  return createdNotification
}

const getNotification = async notificationId => {
  const notification = await Notification.findOne({ _id: notificationId })
  return notification
}
module.exports = {
  createNotification,
  getNotification
}
