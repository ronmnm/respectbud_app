/**
 * Function returns delivery costs for particular truck depending on weight
 * @param distances is array of distances
 * @param weight amount of tons
 */
module.exports.calculateDeliveryCost = function (distances, weight) {
  if (weight <= 7) {
    return _getCostZil(distances, "Зил")
  } else if (8 <= weight && weight <= 10) {
    // return _getCostFor_7_10_20(distances, 35, 600, "Камаз")
    return _getCostKamaz(distances, "Камаз")
  } else if (11 <= weight && weight <= 20) {
    // eсли вес >= 20 то + карьеры по песку
    return _getCostMaz(distances, "Маз")
  } else if (21 <= weight && weight <= 30) {
    // eсли вес >= 30 то + карьеры по щебню - 200 маржа
    return _getCost30(distances, "30 Tонник")
  } else if (weight >= 31) {
    return getCost40(distances, "40 Tонник")
  }

  function _adjustDistance(distance) {
    if (distance <= 20) return +distance + 1
    if (distance <= 30) return +distance + 3
    if (distance <= 50) return +distance + 5
    if (distance >= 51) return +distance + 6
  }

  /**
   * Стомость доставки для Зила ( вес <= 7 )
   *
   */
  function _getCostZil(distances, truck) {
    return distances.map(kmArray => {
      let distance = _adjustDistance(Math.round(kmArray[0]))
      let deliveryPrice

      // Тарифы для Зила
      if (1 <= distance && distance <= 5) {
        deliveryPrice = 600
      } else if (6 <= distance && distance <= 10) {
        deliveryPrice = 800
      } else if (11 <= distance && distance <= 15) {
        deliveryPrice = 950
      } else if (16 <= distance && distance <= 20) {
        deliveryPrice = distance * 60
      } else if (distance >= 21) {
        deliveryPrice = ((distance * 2) / 100) * 35 * 18 * 1.18 + 1000
      }

      return { distance, initialDistance: kmArray[0], deliveryPrice, truck }
    })
  }

  /**
   * Стомость доставки для Камаза (8 <= вес <= 10)
   *
   */
  function _getCostKamaz(distances, truck) {
    return distances.map(kmArray => {
      let distance = _adjustDistance(Math.round(kmArray[0]))
      let deliveryPrice

      // Тарифы для Камаза
      if (1 <= distance && distance <= 5) {
        deliveryPrice = 650
      } else if (6 <= distance && distance <= 10) {
        deliveryPrice = 850
      } else if (11 <= distance && distance <= 15) {
        deliveryPrice = 950
      } else if (16 <= distance && distance <= 20) {
        deliveryPrice = distance * 65
      } else if (distance >= 21) {
        deliveryPrice = ((distance * 2) / 100) * 35 * 18 * 1.18 + 1100
      }

      return { distance, initialDistance: kmArray[0], deliveryPrice, truck }
    })
  }

  /**
   * Стомость доставки для Маза (11 <= вес <= 20)
   *
   */
  function _getCostMaz(distances, truck) {
    let mazPricesArray = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      1059,
      1140,
      1228,
      1311,
      1400,
      1495,
      1571,
      1666,
      1748,
      1824,
      1907,
      1976,
      2060,
      2141,
      2223,
      2305,
      2381,
      2457,
      2527,
      2609,
      2685,
      2768,
      2831,
      2920,
      3000,
      3085,
      3167,
      3237,
      3319,
      3395,
      3477,
      3559,
      3630,
      3700,
      3775,
      3850,
      3900,
      3980,
      4050,
      4117,
      4180,
      4231,
      4282,
      4332,
      4383,
      4434,
      4484,
      4535,
      4593,
      4643,
      4694,
      4744,
      4795,
      4846,
      4896,
      4960,
      5010,
      5061,
      5112,
      5162,
      5219,
      5264,
      5320,
      5371,
      5422,
      5472,
      5536,
      5586,
      5637,
      5675,
      5720,
      5770,
      5802,
      5852,
      5890,
      5941,
      5979,
      6030,
      6062,
      6112,
      6156,
      6205,
      6245,
      6283,
      6328,
      6378,
      6417,
      6461,
      6511,
      6560,
    ]

    return distances.map(kmArray => {
      let distance = _adjustDistance(Math.round(kmArray[0]))
      let deliveryPrice

      // Тарифы для Mаза
      if (1 <= distance && distance <= 5) {
        deliveryPrice = 700
      } else if (5 <= distance && distance <= 10) {
        deliveryPrice = 900
      } else if (distance >= 11) {
        deliveryPrice = mazPricesArray[distance]
      }
      // } else if (distance >= 51) {
      //   deliveryPrice = 5000
      // }

      return { distance, initialDistance: kmArray[0], deliveryPrice, truck }
    })
  }

  /**
   * Стомость доставки для 30-ти тонника (21 <= вес <= 30)
   *
   */
  function _getCost30(distances, truck) {
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
        deliveryPrice = distance * 91.5
      } else if (21 <= distance && distance <= 30) {
        deliveryPrice = distance * 76.2
      } else if (31 <= distance && distance <= 50) {
        deliveryPrice = distance * 66.3
      } else if (51 <= distance && distance <= 60) {
        deliveryPrice = distance * 61.2
      } else if (distance >= 61) {
        deliveryPrice = distance * 57.9
      }

      // deliveryPrice += 200 // + 200 грн
      return { distance, initialDistance: kmArray[0], deliveryPrice, truck }
    })
  }

  /**
   * Стомость доставки для 40-ти тонника (31 <= вес <= 40)
   *
   */
  function getCost40(distances, truck) {
    return distances.map(kmArray => {
      let distance = _adjustDistance(Math.round(kmArray[0]))

      let deliveryPrice
      if (1 <= distance && distance <= 15) {
        deliveryPrice = distance * 116
      } else if (16 <= distance && distance <= 20) {
        deliveryPrice = distance * 100
      } else if (21 <= distance && distance <= 25) {
        deliveryPrice = distance * 82
      } else if (26 <= distance && distance <= 30) {
        deliveryPrice = distance * 72
      } else if (31 <= distance && distance <= 35) {
        deliveryPrice = distance * 62
      } else if (36 <= distance && distance <= 40) {
        deliveryPrice = distance * 58
      } else if (41 <= distance && distance <= 50) {
        deliveryPrice = distance * 56
      } else if (51 <= distance && distance <= 100) {
        deliveryPrice = distance * 54
      } else if (distance > 100) {
        deliveryPrice = distance * 52
      }

      deliveryPrice += 200 // + 200 грн

      return { distance, initialDistance: kmArray[0], deliveryPrice, truck }
    })
  }
}

// function _getCostFor_7_10_20(distances, koef1, koef2, truck) {
//   return distances.map(kmArray => {
//     let distance = _adjustDistance(Math.round(kmArray[0]))
//     let x = ((distance * 2) / 100) * koef1 * 15 + 200
//     let deliveryPrice = Math.floor(x * 0.18 + x + koef2 + 200)
//     return { distance, initialDistance: kmArray[0], deliveryPrice, truck }
//   })
// }
