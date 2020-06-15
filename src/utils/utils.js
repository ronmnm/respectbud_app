export function checkWeight(materialWeight) {
  return (+materialWeight > 30 && +materialWeight % 10 !== 0) || +materialWeight > 40
}
