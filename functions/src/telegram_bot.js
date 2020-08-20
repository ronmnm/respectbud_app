const { functions } = require("../firebase")
const { Telegraf } = require("telegraf")
const util = require("util")

let TOKEN = "1080237061:AAGdc7aIXpKZFlC2KhYXdVswJ1Hu_1Z52UI"
const bot = new Telegraf(TOKEN)

function sendNotification(html) {
  bot.telegram.sendMessage("389076460", html, { parse_mode: "HTML" })
  bot.telegram.sendMessage("411134984", html, { parse_mode: "HTML" }) // danil
}

module.exports.notifyBot = functions.region("europe-west1").https.onCall(async (data, context) => {
  let { phone, name, organization, material, weight, finalPrice, addr } = data.payload
  let ev = data.event

  if (ev === "DO_CALCULATION") {
    let html = `
&#128293; <b>${name} считает стоимость доставки...</b>
Телефон: <code>${phone}</code>
Организация: ${organization}
Товар: ${material}
Вес: ${weight}
Цена: ${finalPrice}
Адрес доставки: ${addr}
    `
    sendNotification(html)
  }

  if (ev === "CALC_AGAIN_BUTTON") {
    let html = `
&#8617; <b>Рассчитать заново</b>
Имя: ${name}
Телефон: <code>${phone}</code>
    `
    sendNotification(html)
  }
})

module.exports.leavePage = functions.region("europe-west1").https.onRequest((request, response) => {
  let data = JSON.parse(request.body)

  let html = `
  &#129300; <b>Вкладка закрыта или страница перезагружена после расчета</b>
  Имя: ${data.name}
  Телефон: <code>${data.phone}</code>
  `
  // Организация: ${data.organization}
  // Товар: ${data.material}
  // Вес: ${data.weight}
  // Цена: ${data.finalPrice}
  sendNotification(html)
  return bot.handleUpdate(request.body, response).then(rv => !rv && response.sendStatus(200))
})
