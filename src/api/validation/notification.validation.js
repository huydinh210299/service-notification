const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const { customValidate, joiPagination } = require('../utils/validation')
const { MESSAGE_TYPE } = require('../constants')

const getNotifications = {
  query: Joi.object({
    status: Joi.boolean(),
    ...joiPagination
  })
}

const createUserNotification = {
  body: Joi.object({
    title: Joi.string().required(),
    message: Joi.string().required(),
    type: Joi.string()
      .valid(MESSAGE_TYPE.GENERAL, MESSAGE_TYPE.INDIVIDUAL)
      .required(),
    userIds: Joi.array()
      .items(
        Joi.string().guid({
          version: ['uuidv4']
        })
      )
      .required()
  })
}

const updateUserNotification = {
  body: Joi.object({
    status: Joi.number()
      .valid(0, 1)
      .required()
  })
}

module.exports = {
  getNotificationsValidate: customValidate(getNotifications),
  createNotificationValidate: customValidate(createUserNotification),
  updateNotificationValidate: customValidate(updateUserNotification)
}
