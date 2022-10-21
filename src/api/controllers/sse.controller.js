const { ee } = require('./notification.controller')
const decodeToken = require('../utils/decodeToken')
const { EE } = require('../constants')

const pushNotification = (req, res) => {
  const accessToken = req.cookies.accessToken || ''
  const { uid } = decodeToken(accessToken)

  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
    Connection: 'keep-alive'
  })

  ee.on(
    EE.NOTIFICATION_EVENT_LISTENER,
    (notification = {}, createdUserNotification = []) => {
      console.log(createdUserNotification, notification)
      const isNotified = createdUserNotification.filter(
        e => e.userId.toString() === uid
      )
      if (isNotified.length) {
        res.write(`data: ${JSON.stringify(notification)}\n\n`)
        // send message instantly
        res.flush()
      }
    }
  )

  res.on('close', () => {
    console.log('Client closed connection')
    res.end()
  })
}

module.exports = { pushNotification }
