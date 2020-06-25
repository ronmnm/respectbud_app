const { functions, db } = require("../firebase")
const admin = require("firebase-admin")

/**
 * Функция меняет два значения в базе, если пользователь выберет 30т
 */
module.exports = functions.region("europe-west1").https.onCall(async (data, context) => {
  let { phone, time, price } = data
  let data30t
  try {
    data30t = (await db.collection("customers").doc(phone.substr(3)).collection("orders").doc(time).get()).data()
  } catch (err) {
    console.log(err)
  }

  console.log('data30t',data30t);
  try {
    await db.collection("customers").doc(phone.substr(3)).collection("orders").doc(time).update({
      "result.priceForCustomer": price,
      "result.weight": 30,
      "result.deliveryPrice": data30t.resultsFor30t.deliveryPrice,
      "result.distance": data30t.resultsFor30t.distance,
      "result.initialDistance": data30t.resultsFor30t.initialDistance,
      "result.materialPrice": data30t.resultsFor30t.materialPrice,
      "result.materialPrice1t": data30t.resultsFor30t.materialPrice1t,
      "result.supplierName": data30t.resultsFor30t.supplierName,
      "result.truck": "hz",
    })
  } catch (err) {
    console.log(err)
  }

  console.log("changed")
})
