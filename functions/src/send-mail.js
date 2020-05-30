require("dotenv").config()
const nodemailer = require("nodemailer")

module.exports = function (phone, time) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  })
  let text = "bla"
  let mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `Order from ${phone}; ${time}`,
    html: `
      <div>${text}</div>
      <div>${text} aha</div>
    `,
  }
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log("email sent")
    }
  })
}
