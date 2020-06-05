/**
 * Function returns delivery costs for particular truck depending on weight
 * @param distances is array of distances
 * @param weight amount of tons
 */
export function calculateDeliveryCost(distances, weight) {
  if (weight <= 7) {
    return _getCostFor7(distances, "Зил")
    // return _getCostFor_7_10_20(distances, 35, 500, "Зил")
  } else if (8 <= weight && weight <= 10) {
    return _getCostFor_7_10_20(distances, 35, 600, "Камаз")
  } else if (11 <= weight && weight <= 20) {
    // eсли вес >= 20 то + карьеры по песку
    return _getCostFor20(distances, "Маз")
    // return _getCostFor_7_10_20(distances, 55, 700, "Маз")
  } else if (21 <= weight && weight <= 30) {
    // eсли вес >= 30 то + карьеры по щебню - 200 маржа
    return _getCostFor30(distances, "30 Tонник")
  } else if (weight >= 30) {
    return getCostFor40(distances, "40 Tонник")
  }

  function _adjustDistance(distance) {
    if (distance <= 10) return +distance + 2
    if (distance <= 20) return +distance + 3
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

  function _getCostFor7(distances, truck) {
    return distances.map(kmArray => {
      let distance = _adjustDistance(Math.round(kmArray[0]))
      let deliveryPrice
      if (1 <= distance && distance <= 5) {
        deliveryPrice = 600
      } else if (6 <= distance && distance <= 10) {
        deliveryPrice = 800
      } else if (11 <= distance && distance <= 15) {
        deliveryPrice = distance * 78
      } else if (16 <= distance && distance <= 20) {
        deliveryPrice = distance * 60
      } else if (distance >= 21) {
        deliveryPrice = distance * 58
      }

      return { distance, initialDistance: kmArray[0], deliveryPrice, truck }
    })
  }

  function _getCostFor20(distances, truck) {
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
    ]

    return distances.map(kmArray => {
      let distance = _adjustDistance(Math.round(kmArray[0]))
      let deliveryPrice

      window.mazPricesArray = mazPricesArray
      if (1 <= distance && distance <= 5) {
        deliveryPrice = 700
      } else if (5 <= distance && distance <= 10) {
        deliveryPrice = 900
      } else if (11 <= distance && distance <= 50) {
        deliveryPrice = mazPricesArray[distance]
      } else if (distance >= 51) {
        deliveryPrice = 5000
      }

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
