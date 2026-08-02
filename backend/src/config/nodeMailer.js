import nodeMailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const verify = async () => {
  try {
    await transporter.verify();
    console.log("nodeMailer is ready to send emails");
  } catch (error) {
    console.error("Verification failed:", error);
  }
};

verify();

export default transporter;
