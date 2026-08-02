import transporter from "../config/nodeMailer.js";

const name = "Super Productive User";
const rewardName = "Super Productive Reward";
const rewardProvider = "Super Productive";
const rewardLink = "https://super-productive.vercel.app/";
const rewardCode = "123456";
const pin = "1234";
const orderId = "123456";
const expiryDate = "2023-12-31";

export const sendMail = async (req, res) => {
  try {
    const { to } = req.body;
    const mailOptions = {
      from: `"Super Productive" <${process.env.USER}>`,
      to,
      subject: "🎉 Your Reward is Ready!",
      html: `
            <!DOCTYPE html>
            <html>
            <head>
            <meta charset="UTF-8" />
            <title>Reward Redeemed</title>
            </head>

            <body style="margin:0;background:#f4f4f4;font-family:Arial,sans-serif;">

            <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
            <td align="center">

            <table width="600" cellpadding="0" cellspacing="0"
            style="background:#ffffff;border-radius:12px;overflow:hidden;margin:40px 0;">

            <tr>
            <td style="background:#4F46E5;padding:30px;text-align:center;color:white;">
            <h1 style="margin:0;">🎉 Super Productive</h1>
            <p style="margin-top:10px;">
            Your reward has been redeemed successfully!
            </p>
            </td>
            </tr>

            <tr>
            <td style="padding:35px;">

            <h2>Hello ${name},</h2>

            <p>
            Thank you for being part of <b>Super Productive</b>.
            Your reward is now ready.
            </p>

            <hr>

            <h3>Reward Details</h3>

            <table width="100%" cellpadding="8">

            <tr>
            <td><b>Reward</b></td>
            <td>${rewardName}</td>
            </tr>

            <tr>
            <td><b>Provider</b></td>
            <td>${rewardProvider}</td>
            </tr>

            <tr>
            <td><b>Reward Code</b></td>
            <td><b>${rewardCode}</b></td>
            </tr>

            <tr>
            <td><b>PIN</b></td>
            <td>${pin}</td>
            </tr>

            <tr>
            <td><b>Order ID</b></td>
            <td>${orderId}</td>
            </tr>

            <tr>
            <td><b>Expires On</b></td>
            <td>${expiryDate}</td>
            </tr>

            </table>

            <hr>

            <h3>How to Redeem</h3>

            <ol>
            <li>Visit the provider's website.</li>
            <li>Select your product or service.</li>
            <li>Enter the reward code and PIN during checkout.</li>
            <li>Enjoy your reward 🎉</li>
            </ol>

            <p>
            If you have any questions, simply reply to this email or contact our support team.
            </p>

            <p>
            Happy redeeming!
            </p>

            <p>
            <b>— Team Super Productive</b>
            </p>

            </td>
            </tr>

            <tr>
            <td
            style="background:#f8f8f8;padding:25px;font-size:12px;color:#666;text-align:center;">

            This reward was redeemed from your Super Productive account.

            Please keep your reward code secure.

            © ${new Date().getFullYear()} Super Productive

            </td>
            </tr>

            </table>

            </td>
            </tr>
            </table>

            </body>
            </html>
            `,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error in sendMail:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
