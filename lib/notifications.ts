"use server";

// import { promises as fs } from 'fs';
import twilio from "twilio";
import nodemailer from "nodemailer";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function sendEmail(email, url) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  });

    const sender = {
      address: "support@godschildid.com",
      name: "God's Child Id",
    };
    const recipients = [
      email
    ];

    await transporter.sendMail({
      from: sender,
      to: recipients,
      subject: "Flyer Submission",
      text: `${email} has requested transmission of this God's Child Id flyer to you: ${url}`,
      category: "Flyer Submission",
    }).then(console.log, console.error);
}


export async function sendtext(message, phone) {
  if (phone?.length > 0) {
    try {
      const text = await client.messages.create({
        body: message,
        from: '+19842309387',
        to: phone
      });
      console.log(text);
      return text.sid;
    } catch (error) {
      console.log(error);
    }
  }
}

export async function checkReminderEmails() {
  // check date
  // if within 2 weeks update campaign schedule
  // and add table entry
  // if date missed, send email campaign
}

//https://github.com/mailtrap/mailtrap-nodejs/blob/HEAD/examples/sending/template.ts
