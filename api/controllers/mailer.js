const nodemailer = require("nodemailer");

// Create a transporter using Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ebisagirma41@gmail.com",
    pass: "mmslehqxrhipxsic",
  },
});

const sendEmail = async (receiverEmail, code) => {
  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: " MyMarket Mobile App 📧 <ebisagirma41@gmail.com>",
      to: `${receiverEmail}`,
      subject: "MyMarket User password reset 🔑",
      text: `This is your confirmation code ${code} on MyMarket Mobile App \n don't share your credential with other people.`,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
  return true
};

module.exports = sendEmail;
