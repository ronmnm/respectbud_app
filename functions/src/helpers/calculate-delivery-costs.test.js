import { calculateDeliveryCost } from "./calculate-delivery-costs"
var fs = require('fs');


describe("Testing calculateDeliveryCost to return correct values", () => {
  // let distances = [[1], [2], [3], [4]];
  let distances = []
  for (let i = 0; i < 70; i++) {
    distances.push([i])
  }

  let weight = "x"

  // let result = calculateDeliveryCost(distances, 1)
  it(`for weight ${weight}`, () => {
    let res2 = {}
    for (let weight = 1; weight <= 50; weight++) {
        let res3 = {}
        for(let i = 0; i < distances.length; i++){
          let func = calculateDeliveryCost(distances, weight)[i]
          res3[i+2 + ' км'] = `${func.truck}:${func.deliveryPrice} грн`
        }
        res2[weight + " тонн"] = res3
    }

    console.log(JSON.stringify(res2))
    fs.writeFile("test.txt", JSON.stringify(res2), function(err) {
      if (err) {
          console.log(err);
      }
  });
    // expect(result[distanceIndex].deliveryPrice).toBe(expectedPrice);
  })
})
