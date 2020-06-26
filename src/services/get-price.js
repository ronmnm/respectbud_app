// import { functions } from "./firebase"
// import { firestore } from "./firebase"
import firebase from './firebase'
import openrouteservice from "openrouteservice-js"

// import { filterSuppliersArray } from "./get-price-utils/filter-suppliers-array"
// import { calculateDeliveryCost } from "./get-price-utils/calculate-delivery-costs"
// import modifyResults from "./get-price-utils/modify-results"

// const openrouteserviceKey = "5b3ce3597851110001cf6248a9876145e10e43139207d591e4ab1c9d"

// var Matrix = new openrouteservice.Matrix({
//   api_key: openrouteserviceKey,
// })

export async function getPrice(data) {
  const getPrice = firebase.app().functions('europe-west1').httpsCallable('getPrice')
  return getPrice({ ...data })
}
/*
export async function getPrice2(address, materialTitle, materialType, weight, paymentMethod, coordinates, phone, time) {
  let name = "K.1_Шамраевский"
  let lat = "" // 50
  let lng = ""

  const suppliersArray = [
    {
      name: name,
      isGranitKaryer: true,
      address: "",
      // { lat: e.latLng.lat(), lng: e.latLng.lng() }
      coordinates: { lat: lat, lng: lng },
      // coordinates: { ...selectedCoordinates },
      showLngLatInGoogle: `https://www.google.com/search?q=${lat}%2C+${lng}`,
      materials: {
        // "Песок овражный": {
        //   nal: "",
        //   bn: "",
        // },
        // "Песок речной": {
        //   nal: "",
        //   bn: "",
        // },
        "Щебень 2-5": {
          nal: "",
          bn: "",
        },
        "Щебень 5-10": {
          nal: "",
          bn: "",
        },
        "Щебень 5-20": {
          nal: "",
          bn: "",
        },
        "Щебень 10-20": {
          nal: "",
          bn: "",
        },
        "Щебень 20-40": {
          nal: "",
          bn: "",
        },
        "Щебень 40-70": {
          nal: "",
          bn: "",
        },
        "ЩПС 0-40": {
          nal: "",
          bn: "",
        },
        "ЩПС 0-70": {
          nal: "",
          bn: "",
        },
        Отсев: {
          nal: "",
          bn: "",
        },
        // "Керамзит 5-10": {
        //   nal: "",
        //   bn: "",
        // },
        // "Керамзит 10-20": {
        //   nal: "",
        //   bn: "",
        // },
        // Супесь: {
        //   nal: "",
        //   bn: "",
        // },
        // Суглинок: {
        //   nal: "",
        //   bn: "",
        // },
      },
    },
  ]

  await firestore.collection("suppliers").doc(name).set(suppliersArray[0])
}


export async function getPrice11(address, materialTitle, materialType, weight, paymentMethod, coordinates, phone, time) {
  if (materialType === "Супесь") return { pickedPriceRound: 1300 }
  if (materialType === "Суглинок") return { pickedPriceRound: 1100 }
  // 1. Получаем массив поставщиков из базы
  const snapshot = await firestore.collection("suppliers").get()
  const allSuppliers = snapshot.docs.map(doc => doc.data())

  // 2. Фильтруем объект поставщиков по заданному товару, весу и способу оплаты -> на выходе новый массив
  let suppliers = filterSuppliersArray(allSuppliers, materialTitle, weight, materialType, paymentMethod)
  console.log("Отфильтрованные поставщики:", suppliers)

  // Проверка есть ли запрашиваемый товар у кого либо из поставщиков
  if (suppliers.length === 0) return console.log("товара нет")

  // 3. Генерация массива с координатами поставщиков из обьекта suitableSuppliers
  let coordinatesArray = []
  for (let i = 0; i < suppliers.length; i++) {
    coordinatesArray.push([suppliers[i].coordinates.lng, suppliers[i].coordinates.lat])
  }
  console.log("Коодинаты поставщиков", coordinatesArray)

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
  let results = calculateDeliveryCost(distancesArray.distances, +weight)

  // 6. Добавление доп информации
  results = modifyResults({
    results,
    weight,
    materialType,
    materialTitle,
    paymentMethod,
    address,
    suppliers,
    distances: distancesArray.distances,
  })
  console.log("Результаты просчета", results)

  let pricesForCustomer = [] // [9989, 9898, 8989]
  let shamraevskyPrice = null
  let pricesForCustomer30t = []

  for (let i = 0; results.length > i; i++) {
    if (results[i].priceForCustomer !== null) {
      pricesForCustomer.push(results[i].priceForCustomer)
    }
    // взять все цены всех поставщиков для веса 30 и запихнуть в array
    if (results[i].price30tAllSuppliers) {
      pricesForCustomer30t.push(results[i].price30tAllSuppliers)
    }
    if (results[i].price30t) {
      pricesForCustomer30t.push(results[i].price30t)
      // shamraevskyPrice = results[i].price30t // Math.ceil(results[i].price30t / 10) * 10
      console.log('shamraevskyPrice', shamraevskyPrice)
    }
  }

  // if (shamraevskyPrice) {
  //   pricesForCustomer30t.push(shamraevskyPrice)
  // }
  console.log("pricesForCustomer30t", pricesForCustomer30t)

  let pickedPrice30t = null
  let pickedPrice30tRound = null
  if(pricesForCustomer30t.length > 0){
    pickedPrice30t = Math.min(...pricesForCustomer30t)
    pickedPrice30tRound = Math.ceil(pickedPrice30t / 10) * 10
  }

  console.log("Цены для клиента", pricesForCustomer)

  const pickedPrice = Math.min(...pricesForCustomer)

  const pickedResult = results.filter(item => item.priceForCustomer === pickedPrice)
  console.log("выбранные результат расчета", pickedResult)

  const pickedPriceRound = Math.ceil(pickedPrice / 10) * 10


  let pickedResult30 = null // результат расчета на 30т если есть
  if(pickedPrice30t){
    pickedResult30 = (results.filter(item => item.price30tAllSuppliers === pickedPrice30t))[0]
  }

  // set data to firestore
  await firestore
    .collection("customers")
    .doc(phone.substr(3))
    .collection("orders")
    .doc(time)
    .set({ calculations: { ...results }, result: pickedResult[0], resultsFor30t: pickedResult30 })

  return { pickedPriceRound, price30t: pickedPrice30tRound }
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
