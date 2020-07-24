const uuid = require('uuid')
const Jimp = require('jimp')
const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime()
  console.log(event)

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      text: event,
      referrer: event.headers.Referer,
      tag: (event.queryParams && event.queryParams.tag) || 'no-tags',
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  }

  dynamoDb.put(params, (error) => {
    if (error) {
      console.error(error)
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: {'Content-Type': 'text/plain'},
        body: 'Unable to put record.',
      })
    }

    new Jimp(1, 1, (err, image) => {
      if (err) {
        console.error(err)
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: {'Content-Type': 'text/plain'},
          body: 'Unable to generate image.',
        })
      }
      const response = {
        statusCode: 200,
        headers: {'Content-Type': 'image/bmp'},
        body: image.bitmap.data,
        isBase64Encoded: true,
      }
      callback(null, response)
    })
  })
}
