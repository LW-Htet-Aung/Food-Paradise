const nodemailer = require("nodemailer");
const ejs = require("ejs");

const sentEmail = async ({ fileName, data, from, to, subject }) => {
  try {
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: process.env.MAIL_TRAP_PORT,
      auth: {
        user: process.env.MAIL_TRAP_USER,
        pass: process.env.MAIL_TRAP_PASS,
      },
    });
    const dataString = await ejs.renderFile(
      "./views/" + fileName + ".ejs",
      data
    );
    const info = await transport.sendMail({
      from,
      to,
      subject,
      html: dataString,
    });
    console.log("Message sent", info.messageId);
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = sentEmail;
