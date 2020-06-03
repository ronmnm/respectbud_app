require("dotenv").config()
const nodemailer = require("nodemailer")

module.exports = function (phone, time, rawData) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  })

  let mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `Order from  ${phone};   ${time}`,
    html: `
      <div><b>Имя клиента:</b> ${rawData.name}</div>
      <div><b>Номер телеофна:</b> ${rawData.phone}</div>
      <div><b>Товар:</b> ${rawData.result.material}</div>
      <div><b>Вес:</b> ${rawData.weight} т</div>
      <div><b>Адрес доставки:</b> ${rawData.address}</div>
      <div><b>Форма оплаты:</b> ${rawData.result.paymentMethod}</div>
      <div><b>Цена для клиента:</b> ${rawData.result.priceForCustomer} грн</div>
      <div><b>Выбранный поставщик:</b> ${rawData.result.supplierName}</div>
      <div><b>Расстояние:</b> ${rawData.result.distance} км</div>
      <div><b>Цена доставки:</b> ${rawData.result.deliveryPrice} грн</div>
      <div><b>Самосвал:</b> ${rawData.result.truck}</div>
      <div><b>Цена с места 1т:</b> ${rawData.result.materialPrice1t} грн</div>

      <div style='margin-top: 20px'><i>Детали заказа</i></div>
      <div><b>Дата доставки:</b> ${rawData.deliveryDateHuman}</div>
      <div><b>Время доставки:</b> ${rawData.deliveryTime}</div>
      <div><b>Телефон на выгрузке:</b> ${rawData.phoneOnUnloading}</div>
      <div><b>Коментарий к заказу:</b> ${rawData.orderComment}</div>
    `
  }
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log("email sent")
    }
  })
}
