/**
 *
 * @param {*} param0
 */
module.exports.modifyResults = function ({
  results,
  weight,
  materialType,
  materialTitle,
  paymentMethod,
  address,
  suppliers,
  // distances,
}) {
  // 6.1 формула расчета для щебня с карьера когда
  const getShamraevskyPrice = distance => ((distance + 15) * 18 + 500) * 1.18 * 1.1 + 1100 + 1300
  const getGMPPrice = distance => ((distance + 10) * 18 + 400) * 1.18 * 1.1 + 1000 + 1300

  for (let i = 0; results.length > i; i++) {
    let materialPrice1t = suppliers[i].materials[materialType][paymentMethod]
    results[i].supplierName = suppliers[i].name
    results[i].materialPrice1t = materialPrice1t
    results[i].materialPrice = materialPrice1t * weight
    results[i].priceForCustomer = materialPrice1t * weight + results[i].deliveryPrice
    results[i].material = materialType
    results[i].paymentMethod = paymentMethod
    results[i].address = address
    results[i].weight = weight

    // добавляет поле price30tAllSuppliers - просчет на 30т только для площадок
    if (
      materialTitle === "Щебень" &&
      +weight >= 25 &&
      +weight < 30 &&
      results[i].supplierName !== "K.1_Шамраевский" &&
      results[i].supplierName !== "K.1_GMP+"
    ) {
      results[i].price30tAllSuppliers = materialPrice1t * 30 + results[i].deliveryPrice
    }

    // если есть карьер щебня
    if (results[i].supplierName === "K.1_Шамраевский" && +weight >= 25 && +weight < 30) {
      results[i].weight = 30
      results[i].materialPrice = 30 * materialPrice1t
      results[i].deliveryPrice = getShamraevskyPrice(results[i].initialDistance)
      results[i].priceForCustomer = null // затирает что бы не брать в основной расчет
      results[i].price30tAllSuppliers = getShamraevskyPrice(results[i].initialDistance) + materialPrice1t * 30 //
    }
    if (results[i].supplierName === "K.1_GMP+" && +weight >= 25 && +weight < 30) {
      results[i].weight = 30
      results[i].materialPrice = 30 * materialPrice1t
      results[i].deliveryPrice = getGMPPrice(results[i].initialDistance)
      results[i].priceForCustomer = null // затирает что бы не брать в основной расчет
      results[i].price30tAllSuppliers = getGMPPrice(results[i].initialDistance) + materialPrice1t * 30 // только для карьера щена за 30т
    }

    if (results[i].supplierName === "K.1_GMP+" && +weight === 30) {
      results[i].deliveryPrice = getGMPPrice(results[i].initialDistance)
      results[i].priceForCustomer = materialPrice1t * 30 + results[i].deliveryPrice
    }
    // если есть карьер щебня и вес === 30
    if (results[i].supplierName === "K.1_Шамраевский" && +weight === 30) {
      results[i].deliveryPrice = getShamraevskyPrice(results[i].initialDistance)
      results[i].priceForCustomer = materialPrice1t * 30 + results[i].deliveryPrice
    }
  }
  return results
}
