import { functions } from './firebase';
import { firestore } from './firebase';
import openrouteservice from 'openrouteservice-js';

const openrouteserviceKey = '5b3ce3597851110001cf6248a9876145e10e43139207d591e4ab1c9d';

var Matrix = new openrouteservice.Matrix({
  api_key: openrouteserviceKey,
});

// await firestore.collection('suppliers').doc('03_Рута Г').set(suppliersArray[0]);
// export async function getPrice2(address, materialType, weight, paymentMethod, selectedCoordinates) {}

/**
 * Function returns delivery costs for particular truck depending on weight
 * @param distances is array of distances, each elements is also array
 * @param weight amount of tons
 */
export function calculateDeliveryCost(distances, weight) {
  if (weight <= 7) {
    return _getCostFor_7_10_20(distances, 35, 500, 'Зил');
  } else if (8 <= weight && weight <= 10) {
    return _getCostFor_7_10_20(distances, 35, 600, 'Камаз');
  } else if (11 <= weight && weight <= 20) {
    return _getCostFor_7_10_20(distances, 55, 700, 'Маз');
  } else if (21 <= weight && weight <= 30) {
    return _getCostFor30(distances, '30 Tонник');
  } else if (weight >= 30) {
    return _getCostFor40(distances, '40 Tонник');
  }

  function _adjustDistance(distance) {
    if (distance <= 10) return +distance + 3;
    if (distance <= 20) return +distance + 4;
    if (distance <= 30) return +distance + 5;
    if (distance > 30) return +distance + 6;
  }
  function _getCostFor_7_10_20(distances, koef1, koef2, truck) {
    return distances.map(kmArray => {
      let distance = _adjustDistance(Math.round(kmArray[0]));
      let x = ((distance * 2) / 100) * koef1 * 15 + 200;
      let deliveryPrice = Math.floor(x * 0.18 + x + koef2 + 200);
      return { distance, initialDistance: kmArray[0], deliveryPrice, truck };
    });
  }
  function _getCostFor30(distances, truck) {
    return distances.map(kmArray => {
      let distance = _adjustDistance(Math.round(kmArray[0]));
      let deliveryPrice;
      if (1 <= distance && distance <= 5) {
        deliveryPrice = 900;
      } else if (6 <= distance && distance <= 10) {
        deliveryPrice = 1100;
      } else if (11 <= distance && distance <= 15) {
        deliveryPrice = distance * 96;
      } else if (16 <= distance && distance <= 20) {
        deliveryPrice = distance * 93;
      } else if (21 <= distance && distance <= 30) {
        deliveryPrice = distance * 76.5;
      } else if (31 <= distance && distance <= 40) {
        deliveryPrice = distance * 66;
      } else if (41 <= distance && distance <= 65) {
        deliveryPrice = distance * 60;
      } else if (distance >= 66) {
        deliveryPrice = distance * 58.5;
      }

      deliveryPrice += 200;
      return { distance, initialDistance: kmArray[0], deliveryPrice, truck };
    });
  }
  function _getCostFor40(distances, truck) {
    return distances.map(kmArray => {
      let distance = _adjustDistance(Math.round(kmArray[0]));
      let deliveryPrice;
      if (1 <= distance && distance <= 15) {
        deliveryPrice = distance * 116;
      } else if (16 <= distance && distance <= 20) {
        deliveryPrice = distance * 100;
      } else if (21 <= distance && distance <= 25) {
        deliveryPrice = distance * 82;
      } else if (26 <= distance && distance <= 30) {
        deliveryPrice = distance * 72;
      } else if (31 <= distance && distance <= 35) {
        deliveryPrice = distance * 62;
      } else if (36 <= distance && distance <= 40) {
        deliveryPrice = distance * 58;
      } else if (41 <= distance && distance <= 50) {
        deliveryPrice = distance * 56;
      } else if (51 <= distance && distance <= 100) {
        deliveryPrice = distance * 54;
      } else if (distance > 100) {
        deliveryPrice = distance * 52;
      }

      deliveryPrice += 200;
      return { distance, initialDistance: kmArray[0], deliveryPrice, truck };
    });
  }
}

/**
 * Function returns delivery costs for particular truck depending on weight
 * @param distances is array of distances, each elements is also array
 * @param weight amount of tons
 */
export async function getPrice(address, materialType, weight, paymentMethod, coordinates, phone) {
  if (materialType === 'Супесь') return console.log('1300грн');
  if (materialType === 'Суглинок') return console.log('1100грн');
  // 1. Получаем массив поставщиков из базы
  const snapshot = await firestore.collection('suppliers').get();
  const allSuppliers = snapshot.docs.map(doc => doc.data());

  // 2. Фильтруем объект поставщиков по заданному товару и способу оплаты -> на выходе новый массив
  const suppliers = allSuppliers.filter(supplier => supplier.materials[materialType][paymentMethod] !== '');

  // Проверка есть ли запрашиваемый товар у кого либо из поставщиков
  if (suppliers.length === 0) return console.log('товара нет');

  // 3. Генерация массива с координатами поставщиков из обьекта suitableSuppliers
  let coordinatesArray = [];
  for (let i = 0; i < suppliers.length; i++) {
    coordinatesArray.push([suppliers[i].coordinates.lng, suppliers[i].coordinates.lat]);
  }

  // 4. Просчет расстояния от введенного адреса до каждого из подходящих поставщиков
  let distancesArray = await Matrix.calculate({
    locations: [[coordinates.lng, coordinates.lat], ...coordinatesArray],
    profile: 'driving-hgv',
    format: 'json',
    sources: [...Array(coordinatesArray.length + 1).keys()].splice(1),
    destinations: [0],
    metrics: ['distance'],
    units: 'km',
  });

  // 5. Цена доставки для для всеx расстояний
  let deliveryCosts = calculateDeliveryCost(distancesArray.distances, +weight)
  
  for (let i = 0; distancesArray.distances.length > i; i++) {
    let materialPrice = suppliers[i].materials[materialType][paymentMethod]
    deliveryCosts[i].supplierName = suppliers[i].name
    deliveryCosts[i].materialPrice1t = materialPrice
    deliveryCosts[i].materialPrice = materialPrice * weight;
    deliveryCosts[i].priceForCustomer = materialPrice * weight + deliveryCosts[i].deliveryPrice;
  }
  let pricesForCustomer = []
  for(let i = 0; deliveryCosts.length > i; i++){
    pricesForCustomer.push(deliveryCosts[i].priceForCustomer)
  }
  deliveryCosts.finalPrices = pricesForCustomer

  const order = {
    z_orders: [{bla: 1}]
  }

  const id = await firestore.collection('customers').doc(phone.substr(3)).update(order)
  console.log(id);

  return deliveryCosts
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

// const suppliersArray = [
//   {
//     name: 'Рута Г',
//     address: address,
//     coordinates: { ...selectedCoordinates },
//     showLngLatInGoogle: `https://www.google.com/search?q=${selectedCoordinates.lat}%2C+${selectedCoordinates.lng}`,
//     materials: {
//       'Песок овражный': {
//         nal: '145',
//         bn: '145',
//       },
//       'Песок речной': {
//         nal: '155',
//         bn: '155',
//       },
//       'Щебень 2-5': {
//         nal: '',
//         bn: '',
//       },
//       'Щебень 5-10': {
//         nal: '360',
//         bn: '360',
//       },
//       'Щебень 5-20': {
//         nal: '350',
//         bn: '350',
//       },
//       'Щебень 10-20': {
//         nal: '',
//         bn: '',
//       },
//       'Щебень 20-40': {
//         nal: '320',
//         bn: '320',
//       },
//       'Щебень 40-70': {
//         nal: '350',
//         bn: '350',
//       },
//       'ЩПС 0-40': {
//         nal: '285',
//         bn: '285',
//       },
//       'ЩПС 0-70': {
//         nal: '285',
//         bn: '285',
//       },
//       Отсев: {
//         nal: '200',
//         bn: '200',
//       },
//       'Керамзит 5-10': {
//         nal: '',
//         bn: '',
//       },
//       'Керамзит 10-20': {
//         nal: '',
//         bn: '',
//       },
//     },
//   },
// ];
