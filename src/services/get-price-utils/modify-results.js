

export default function modifyResults(results, weight, materialType, paymentMethod, address, suppliers) {
  // 6.1 формула расчета для щебня с карьера когда === 30 тонн
  const getShamraevskyPrice = distance => ((distance + 15) * 15 + 500) * 1.18 * 1.1 + 1100 + 500

  for (let i = 0; results.length > i; i++) {
    let materialPrice1t = suppliers[i].materials[materialType][paymentMethod]
    results[i].supplierName = suppliers[i].name
    results[i].materialPrice1t = materialPrice1t
    results[i].materialPrice = materialPrice1t * weight
    results[i].priceForCustomer = materialPrice1t * weight + results[i].deliveryPrice
    results[i].material = materialType
    results[i].paymentMethod = paymentMethod
    results[i].address = address
    results[i].weight2 = weight

    if (results[i].supplierName === "K.1_Шамраевский" && results[i].truck === '30 Tонник') {
      results[i].priceForCustomer = null
      results[i].price30t = getShamraevskyPrice(results[i].initialDistance) + materialPrice1t * 30
    }

    if (results[i].supplierName === "K.1_Шамраевский" && +weight === 30) {
      results[i].deliveryPrice = getShamraevskyPrice(results[i].initialDistance)
      results[i].priceForCustomer = materialPrice1t * weight + results[i].deliveryPrice
      results[i].price30t = null
    }
  }
  return results
}