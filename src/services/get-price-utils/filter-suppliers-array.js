export function filterSuppliersArray(allSuppliers, materialTitle, weight, materialType, paymentMethod){
  // let shoto;
  if(materialTitle === 'Песок' && +weight >= 20){
    // если песок и >= 20т то удаляет только карьер со щебнем
    let withoutGranit = allSuppliers.filter(supplier => !supplier.isGranitKaryer)
    return withoutGranit.filter(supplier => supplier.materials[materialType][paymentMethod] !== "" && supplier.coordinates.lat)

  } else if(materialTitle === 'Щебень' && +weight >= 30) {
    // если щебень и >= 30т то удаляет только карьер с песком
    let withoutSand = allSuppliers.filter(supplier => !supplier.isSandKaryer)
    return withoutSand.filter(supplier => supplier.materials[materialType][paymentMethod] !== "" && supplier.coordinates.lat)

  } else {
    // удаляет карьеры с песком и щебнем
    let withoutKaryers = allSuppliers.filter(supplier => !supplier.isSandKaryer && !supplier.isGranitKaryer)
    return withoutKaryers.filter(supplier => supplier.materials[materialType][paymentMethod] !== "" && supplier.coordinates.lat)
  }
}