require("dotenv").config()
const nodemailer = require("nodemailer")


module.exports = function (phone, time, data, option) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  })

  let orderMailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `Order from  ${phone};   ${time}`,
    html: `
      <div><b>Имя клиента:</b> ${data.name}</div>
      <div><b>Номер телеофна:</b> ${data.phone}</div>
      <div><b>Товар:</b> ${data.result.material}</div>
      <div><b>Вес:</b> ${data.weight} т</div>
      <div><b>Адрес доставки:</b> ${data.address}</div>
      <div><b>Форма оплаты:</b> ${data.result.paymentMethod}</div>
      <div><b>Цена для клиента:</b> ${data.result.priceForCustomer} грн</div>
      <div><b>Выбранный поставщик:</b> ${data.result.supplierName}</div>
      <div><b>Расстояние:</b> ${data.result.distance} км</div>
      <div><b>Цена доставки:</b> ${data.result.deliveryPrice} грн</div>
      <div><b>Самосвал:</b> ${data.result.truck}</div>
      <div><b>Цена с места 1т:</b> ${data.result.materialPrice1t} грн</div>

      <div style='margin-top: 20px'><i>Детали заказа</i></div>
      <div><b>Дата доставки:</b> ${data.deliveryDateHuman}</div>
      <div><b>Время доставки:</b> ${data.deliveryTime}</div>
      <div><b>Телефон на выгрузке:</b> ${data.phoneOnUnloading}</div>
      <div><b>Коментарий к заказу:</b> ${data.orderComment}</div>
    `,
  }
  let calcMailOptions = {
    from: process.env.EMAIL,
    to: danilko.com,
    subject: `${(phone, data.name)} Расчет стоимости`,
    html: `
      <div><b>Имя клиента:</b> ${data.name}</div>
      <div><b>Номер телеофна:</b> ${data.phone}</div>
      <div><b>Товар:</b> ${data.result.material}</div>
      <div><b>Вес:</b> ${data.weight} т</div>
      <div><b>Адрес доставки:</b> ${data.address}</div>
      <div><b>Форма оплаты:</b> ${data.result.paymentMethod}</div>
    `,
  }

  let mailOptions
  if(option === 'notify'){
    mailOptions = calcMailOptions
  } else {
    mailOptions = orderMailOptions
  }
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log("email sent")
    }
  })
}
