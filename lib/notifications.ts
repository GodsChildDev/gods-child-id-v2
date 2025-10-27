"use server";

import { promises as fs } from 'fs';
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function sendtext( message, phone ) {
  if (phone?.length > 0) {
    try {
      let text = await client.messages.create({
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
