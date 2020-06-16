require("dotenv").config()
const { functions, db } = require("./firebase")
const openrouteservice = require("openrouteservice-js")
const sendEmail = require("./src/send-mail")
const changeOrder = require("./src/changeOrderTo30t")

let Matrix = new openrouteservice.Matrix({
  api_key: process.env.OPEN_ROUTE_SERVICE_KEY,
})

exports.getPrice = functions.region("europe-west1").https.onCall((data, context) => {})
exports.changeOrder = changeOrder

exports.placeOrder = functions.region("europe-west1").https.onCall(async (data, context) => {
  let { deliveryDateHuman, deliveryTime, phoneOnUnloading, orderComment, time, phone, name, address, weight } = data
  try {
    await db.collection("customers").doc(phone.substr(3)).collection("orders").doc(time).update({
      deliveryDateHuman,
      deliveryTime,
      phoneOnUnloading,
      orderComment,
      phone,
      name,

      weight,
    })
  } catch (err) {
    console.log(err)
  }

  let rawData
  try {
    rawData = await (
      await db.collection("customers").doc(phone.substr(3)).collection("orders").doc(time).get()
    ).data()
    // console.log(rawData)
  } catch (err) {
    console.log(err)
  }
  // var docRef = db.collection("cities").doc("SF")

  // docRef
  //   .get()
  //   .then(function (doc) {
  //     if (doc.exists) {
  //       console.log("Document data:", doc.data())
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!")
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log("Error getting document:", error)
  //   })

  // Отравка данных о заказе на почту

  sendEmail(phone, time, rawData, null)
})

//// old varik
// exports.getPrice = functions.https.onCall(async (data, context) => {
//   const snapshot = await firestore.collection('suppliers').get();
//   // const res = snapshot.docs.map(doc => ({ data: doc.data() }));

//   const distance = Directions.calculate({
//     coordinates: [
//       [30.391574, 50.432252],
//       [30.367413, 50.437719],
//     ],
//     profile: 'driving-hgv',
//     format: 'json',
//     // sources: ['all'],
//     // destinations: ['all'],
//   })
//     .then(json => {
//       console.log(json.routes[0].summary);
//       return json.routes[0].summary;
//     })
//     .catch(err => {
//       var str = 'An error occured: ' + err;
//       console.log(str);
//       throw new functions.https.HttpsError('Error getting document', err);
//     });

//   return distance;
// const res = snapshot
//   .then(snapshot => {
//     return snapshot.docs.forEach(doc => {
//       doc.data();
//     });
//   })
//   .catch(err => {
//     throw new functions.https.HttpsError('Error getting document', err);
//   });

// console.log(snapshot);
// return { res, yo: data.name };

/////////

// suppliersArray.forEach(supplier => {
//   console.log(supplier['Отсев'].nal);
// });

// check 1: get array sorted by materialType and paymentMethod
// const array1 = suppliersArray.filter(item => item[materialType][paymentMethod] !== '');

// get name, address and price of suppliers that passed check 1
// const array2 = array1.map(item => ({
//   name: item.name,
//   address: item.address,
//   materialType: materialType,
//   materialPrice: item[materialType][paymentMethod],
// }));
// });

// https request
// exports.randomNmb = functions.https.onRequest((request, response) => {
//   const number = Math.round(Math.random() * 100);
//   response.send(number.toString());
// });

// // http callable function
// exports.sayHello = functions.https.onCall((data, context) => {
//   return `hello from back, ${data.name}`;
// });
