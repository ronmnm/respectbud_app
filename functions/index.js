const functions = require('firebase-functions');

exports.randomNmb = functions.https.onRequest((request, response) => {
  const number = Math.round(Math.random() * 100)
  response.send(number.toString())
})
