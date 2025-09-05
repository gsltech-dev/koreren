// src/utils/mailer.js
import nodemailer from "nodemailer";
import { google } from "googleapis";

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

export async function sendMail({ subject, html, attachments = [] }) {
  const accessToken = await oAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken:
        typeof accessToken === "string" ? accessToken : accessToken?.token,
    },
  });

  return transporter.sendMail({
    from: `"문의 접수" <${process.env.GMAIL_USER}>`,
    to: process.env.MAIL_TO,
    subject,
    html,
    attachments,
  });
}
