const { functions, db } = require("../firebase")
const admin = require("firebase-admin")


/**
 * Функция меняет два значения в базе, если пользователь выберет 30т
 */
module.exports = functions.region("europe-west1").https.onCall(async (data, context) => {
  let { phone, time, price } = data

  try {

    await db.collection("customers").doc(phone.substr(3)).collection("orders").doc(time)
      .update({ "result.priceForCustomer": price, "result.weight": 30 })

  } catch (err) {
    console.log(err)
  }

  console.log("changed")
})
