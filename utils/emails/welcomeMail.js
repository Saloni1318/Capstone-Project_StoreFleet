// Import the necessary modules here
import nodemailer from "nodemailer";

export const sendWelcomeEmail = async (user) => {
  // Write your code here
  // 1. Create an email transporter.
  // SMTP (Simple Mail Transfer Protocol)
  const transporter = nodemailer.createTransport({
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.STORFLEET_SMPT_MAIL,
      pass: process.env.STORFLEET_SMPT_MAIL_PASSWORD,
    },
  });

  const HTML_TEMPLATE = (user) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>NodeMailer Email Template</title>
          <style>
          /* Add your custom CSS styles here */
                body {
                    font-family: Arial, sans-serif;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    text-align: center;
                }
                .logo {
                    max-width: 150px;
                }
                .content {
                    margin-top: 20px;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #20d49a;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                /* Mobile Responsive Styles */
                @media only screen and (max-width: 600px) {
                    .container {
                        padding: 10px;
                    }
                    .logo {
                        max-width: 100px;
                    }
                    .button {
                        display: block;
                        margin-top: 10px;
                    }
                }
          </style>
        </head>
        <body>
        <div class="container">
                <div class="header">
                    <img class="logo" src="cid:unique@civd" alt="Storefleet Logo">
                    <h1>Welcome to Storefleet</h1>
                </div>
                <div class="content">
                    <p>Hello, ${user.name}</p>
                    <p>Thank you for registering with Storefleet. We're exited to have you as a new member of our community.</p>
                    <a class="button">Get Started</a>
                </div>
            </div>
        </body>
      </html>
    `;
  };
  //2. Configure email content
  const mailOptions = {
    from: process.env.STORFLEET_SMPT_MAIL,
    to: user.email,
    subject: "Welcome to Storefleet",
    attachments: [
      {
        filename: "logo1-32230.png", // Your image file name
        path: `./images/logo1-32230.png`, // Path to the image file
        cid: "unique@civd", // Content ID for the image
      },
    ],
    html: HTML_TEMPLATE(user),
  };

  // 3. Send the email
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (err) {
    console.log("Email send failer with error: " + err);
  }
};