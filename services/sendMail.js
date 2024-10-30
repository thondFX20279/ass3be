import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "gmail",
  auth: { user: "thondfx20279@funix.edu.vn", pass: "vsxt xjvs metf thaj" },
});
const sendOrderConfirmation = async (user, items, order) => {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: user.email,
    subject: "Order Confirmation",
    html: `
      <h1>Order Confirmation</h1>
      <p>Thank you, ${user.fullName}, for your order!</p>
      <p>Order placed on: ${new Date().toLocaleString()}</p>
      <h3>Order Details:</h3>
      <ul>
        ${items
          .map(
            (item) => `
          <li>${item.productId.name} x${item.quantity} - ${item.productId.price} VND</li>
        `
          )
          .join("")}
      </ul>
      <h3>Total Price: ${order.totalPrice} VND</h3>
      <p>Thanks for your order</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error sending email:", error);
  }
};
export default sendOrderConfirmation;
