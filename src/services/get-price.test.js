import { calculateDeliveryCost } from './get-price';

describe('Testing calculateDeliveryCost to return correct values', () => {
  let distances = [[4], [10], [56], [28]];

  let distanceIndex = 0;
  let expectedPrice = 1023;
  let weight = 30

  let result = calculateDeliveryCost(distances, weight);

  it(`for distance ${distances[distanceIndex]} km`, () => {
    console.log(result);
    expect(result[distanceIndex].deliveryPrice).toBe(expectedPrice);
  });
});
