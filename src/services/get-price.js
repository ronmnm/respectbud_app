import { functions } from "./firebase"
import { firestore } from "./firebase"
import firebase from "firebase/app"
import openrouteservice from "openrouteservice-js"

const openrouteserviceKey = "5b3ce3597851110001cf6248a9876145e10e43139207d591e4ab1c9d"

var Matrix = new openrouteservice.Matrix({
  api_key: openrouteserviceKey,
})

export async function getPrice(address, materialType, weight, paymentMethod, selectedCoordinates) {
  const suppliersArray = [
    {
      name: 'Юровка',
      address: address,
      coordinates: { ...selectedCoordinates },
      showLngLatInGoogle: `https://www.google.com/search?q=${selectedCoordinates.lat}%2C+${selectedCoordinates.lng}`,
      materials: {
        'Песок овражный': {
          nal: '',
          bn: '',
        },
        'Песок речной': {
          nal: '',
          bn: '',
        },
        'Щебень 2-5': {
          nal: '',
          bn: '',
        },
        'Щебень 5-10': {
          nal: '',
          bn: '',
        },
        'Щебень 5-20': {
          nal: '330',
          bn: '330',
        },
        'Щебень 10-20': {
          nal: '',
          bn: '',
        },
        'Щебень 20-40': {
          nal: '290',
          bn: '290',
        },
        'Щебень 40-70': {
          nal: '',
          bn: '',
        },
        'ЩПС 0-40': {
          nal: '',
          bn: '',
        },
        'ЩПС 0-70': {
          nal: '',
          bn: '',
        },
        'Отсев': {
          nal: '',
          bn: '',
        },
        'Керамзит 5-10': {
          nal: '',
          bn: '',
        },
        'Керамзит 10-20': {
          nal: '',
          bn: '',
        },
        'Супесь': {
          nal: '',
          bn: '',
        },
        'Суглинок': {
          nal: '',
          bn: '',
        },
      },
    },
  ];
  
  await firestore.collection("suppliers").doc("06_Юровка").set(suppliersArray[0])
}

/**
 * Function returns delivery costs for particular truck depending on weight
 * @param distances is array of distances, each elements is also array
 * @param weight amount of tons
 */
export function calculateDeliveryCost(distances, weight) {
  if (weight <= 7) {
    return _getCostFor_7_10_20(distances, 35, 500, "Зил")
  } else if (8 <= weight && weight <= 10) {
    return _getCostFor_7_10_20(distances, 35, 600, "Камаз")
  } else if (11 <= weight && weight <= 20) {
    return _getCostFor_7_10_20(distances, 55, 700, "Маз")
  } else if (21 <= weight && weight <= 30) {
    return _getCostFor30(distances, "30 Tонник")
  } else if (weight >= 30) {
    return getCostFor40(distances, "40 Tонник")
  }

  function _adjustDistance(distance) {
    if (distance <= 10) return +distance + 3
    if (distance <= 20) return +distance + 4
    if (distance <= 30) return +distance + 5
    if (distance > 30) return +distance + 6
  }
  function _getCostFor_7_10_20(distances, koef1, koef2, truck) {
    return distances.map(kmArray => {
      let distance = _adjustDistance(Math.round(kmArray[0]))
      let x = ((distance * 2) / 100) * koef1 * 15 + 200
      let deliveryPrice = Math.floor(x * 0.18 + x + koef2 + 200)
      return { distance, initialDistance: kmArray[0], deliveryPrice, truck }
    })
  }
  function _getCostFor30(distances, truck) {
    return distances.map(kmArray => {
      let distance = _adjustDistance(Math.round(kmArray[0]))
      let deliveryPrice
      if (1 <= distance && distance <= 5) {
        deliveryPrice = 900
      } else if (6 <= distance && distance <= 10) {
        deliveryPrice = 1100
      } else if (11 <= distance && distance <= 15) {
        deliveryPrice = distance * 96
      } else if (16 <= distance && distance <= 20) {
        deliveryPrice = distance * 93
      } else if (21 <= distance && distance <= 30) {
        deliveryPrice = distance * 76.5
      } else if (31 <= distance && distance <= 40) {
        deliveryPrice = distance * 66
      } else if (41 <= distance && distance <= 65) {
        deliveryPrice = distance * 60
      } else if (distance >= 66) {
        deliveryPrice = distance * 58.5
      }

      deliveryPrice += 200
      return { distance, initialDistance: kmArray[0], deliveryPrice, truck }
    })
  }

  function _goThroughPricesGrid40(distance) {
    if (1 <= distance && distance <= 15) {
      return distance * 116
    } else if (16 <= distance && distance <= 20) {
      return distance * 100
    } else if (21 <= distance && distance <= 25) {
      return distance * 82
    } else if (26 <= distance && distance <= 30) {
      return distance * 72
    } else if (31 <= distance && distance <= 35) {
      return distance * 62
    } else if (36 <= distance && distance <= 40) {
      return distance * 58
    } else if (41 <= distance && distance <= 50) {
      return distance * 56
    } else if (51 <= distance && distance <= 100) {
      return distance * 54
    } else if (distance > 100) {
      return distance * 52
    }
  }
  function getCostFor40(distances, truck) {
    return distances.map(kmArray => {
      let distance = _adjustDistance(Math.round(kmArray[0]))
      let deliveryPrice = _goThroughPricesGrid40(distance)
      deliveryPrice += 200
      return { distance, initialDistance: kmArray[0], deliveryPrice, truck }
    })
  }
}

/**
 * Function returns delivery costs for particular truck depending on weight
 * @param distances is array of distances, each elements is also array
 * @param weight amount of tons
 */
export async function getPrice2(address, materialType, weight, paymentMethod, coordinates, phone, time) {
  if (materialType === "Супесь") return 1300
  if (materialType === "Суглинок") return 1100
  // 1. Получаем массив поставщиков из базы
  const snapshot = await firestore.collection("suppliers").get()
  const allSuppliers = snapshot.docs.map(doc => doc.data())

  // 2. Фильтруем объект поставщиков по заданному товару и способу оплаты -> на выходе новый массив
  const suppliers = allSuppliers.filter(supplier => supplier.materials[materialType][paymentMethod] !== "")

  // Проверка есть ли запрашиваемый товар у кого либо из поставщиков
  if (suppliers.length === 0) return console.log("товара нет")

  // 3. Генерация массива с координатами поставщиков из обьекта suitableSuppliers
  let coordinatesArray = []
  for (let i = 0; i < suppliers.length; i++) {
    coordinatesArray.push([suppliers[i].coordinates.lng, suppliers[i].coordinates.lat])
  }

  // 4. Просчет расстояния от введенного адреса до каждого из подходящих поставщиков
  let distancesArray = await Matrix.calculate({
    locations: [[coordinates.lng, coordinates.lat], ...coordinatesArray],
    profile: "driving-hgv",
    format: "json",
    sources: [...Array(coordinatesArray.length + 1).keys()].splice(1),
    destinations: [0],
    metrics: ["distance"],
    units: "km",
  })

  // 5. Цена доставки для для всеx расстояний
  let deliveryCosts = calculateDeliveryCost(distancesArray.distances, +weight)

  // 6. Добавление доп информации
  for (let i = 0; distancesArray.distances.length > i; i++) {
    let materialPrice = suppliers[i].materials[materialType][paymentMethod]
    deliveryCosts[i].supplierName = suppliers[i].name
    deliveryCosts[i].materialPrice1t = materialPrice
    deliveryCosts[i].materialPrice = materialPrice * weight
    deliveryCosts[i].priceForCustomer = materialPrice * weight + deliveryCosts[i].deliveryPrice
    deliveryCosts[i].material = materialType
    deliveryCosts[i].paymentMethod = paymentMethod
  }
  console.log(deliveryCosts)

  let pricesForCustomer = [] // [9989, 9898, 8989]
  for (let i = 0; deliveryCosts.length > i; i++) {
    pricesForCustomer.push(deliveryCosts[i].priceForCustomer)
  }
  const pickedPrice = Math.min(...pricesForCustomer)
  const pickedResult = deliveryCosts.filter(item => item.priceForCustomer === pickedPrice)
  const pickedPriceRound = Math.ceil(pickedPrice / 10) * 10

  await firestore
    .collection("customers")
    .doc(phone.substr(3))
    .collection("orders")
    .doc(time)
    .set({ calculations: { ...deliveryCosts }, result: pickedResult[0] })

  return pickedPriceRound
}

// const getPrice = functions().httpsCallable('getPrice');
// const suppliers = (await getPrice({ materialType, weight, paymentMethod, selectedCoordinates }));

//   .then(json => {

//     // return json.routes[0].summary;
//   })
//   .catch(err => {
//     var str = 'An error occured: ' + err;
//     console.log(str);
//     throw new functions.https.HttpsError('Error getting document', err);
//   });

