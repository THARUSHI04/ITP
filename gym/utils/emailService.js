const nodemailer = require('nodemailer');

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to other email services
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com', // Set your email
    pass: process.env.EMAIL_PASS || 'your-app-password' // Set your app password
  }
});

// Send order confirmation email
const sendOrderConfirmationEmail = async (userEmail, userName, orderDetails) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: userEmail,
      subject: 'Order Confirmation - CorePlus Gym Store',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Order Confirmation</h2>
          <p>Dear ${userName},</p>
          <p>Thank you for your order! Your order has been confirmed and will be processed soon.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0;">Order Details</h3>
            <p><strong>Order Number:</strong> ${orderDetails.order_number}</p>
            <p><strong>Order Date:</strong> ${new Date(orderDetails.createdAt).toLocaleDateString()}</p>
            <p><strong>Total Amount:</strong> LKR ${orderDetails.total_amount}</p>
            <p><strong>Payment Method:</strong> ${orderDetails.payment_method}</p>
            <p><strong>Shipping Address:</strong> ${orderDetails.shipping_address}</p>
            <p><strong>Contact Phone:</strong> ${orderDetails.contact_phone}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #2c3e50;">Order Items</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #e9ecef;">
                  <th style="padding: 10px; text-align: left; border: 1px solid #dee2e6;">Item</th>
                  <th style="padding: 10px; text-align: left; border: 1px solid #dee2e6;">Quantity</th>
                  <th style="padding: 10px; text-align: left; border: 1px solid #dee2e6;">Price</th>
                  <th style="padding: 10px; text-align: left; border: 1px solid #dee2e6;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${orderDetails.items.map(item => `
                  <tr>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${item.product.name || 'Product'}</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${item.quantity}</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">LKR ${item.price}</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">LKR ${item.subtotal}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <p>We will notify you once your order is shipped. If you have any questions, please contact us.</p>
          <p>Thank you for choosing CorePlus Gym Store!</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 14px;">
            <p>CorePlus Gym Store<br>
            Email: support@coreplus.com<br>
            Phone: +94 XX XXX XXXX</p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    throw error;
  }
};

// Send welcome email for new user registration
const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: userEmail,
      subject: 'Welcome to CorePlus Gym!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Welcome to CorePlus Gym!</h2>
          <p>Dear ${userName},</p>
          <p>Welcome to CorePlus Gym! We're excited to have you as part of our fitness community.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0;">What's Next?</h3>
            <ul style="color: #495057;">
              <li>Complete your profile setup</li>
              <li>Browse our fitness schedules and classes</li>
              <li>Explore our supplement store</li>
              <li>Connect with trainers and other members</li>
            </ul>
          </div>

          <div style="background-color: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h4 style="color: #1976d2; margin-top: 0;">Get Started</h4>
            <p style="margin-bottom: 10px;">Visit our website to:</p>
            <ul style="color: #1976d2; margin-bottom: 0;">
              <li>View available fitness classes</li>
              <li>Book personal training sessions</li>
              <li>Shop for supplements and equipment</li>
              <li>Track your fitness journey</li>
            </ul>
          </div>

          <p>If you have any questions or need assistance, don't hesitate to contact our support team.</p>
          <p>Welcome aboard and let's achieve your fitness goals together!</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 14px;">
            <p>CorePlus Gym<br>
            Email: support@coreplus.com<br>
            Phone: +94 XX XXX XXXX</p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};

module.exports = {
  sendOrderConfirmationEmail,
  sendWelcomeEmail
};
