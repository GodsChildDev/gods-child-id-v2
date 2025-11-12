"use server";

// import { promises as fs } from 'fs';
import twilio from "twilio";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { MailtrapClient } from "mailtrap";
import { clerkClient } from '@clerk/nextjs/server';
import { emailLogs } from "@/db/schema";
import { db } from "@/db/index";
import { and, eq } from "drizzle-orm";
import { format } from "date-fns";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const mailtrapToken = process.env.MAILTRAP_TOKEN || '';
const client = twilio(accountSid, authToken);

const mtClient = new MailtrapClient({ token: mailtrapToken, accountId: 2330541 });
const clClient = await clerkClient(); 
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
} as SMTPTransport.Options);
// const bulkTransporter = nodemailer.createTransport({
//   host: process.env.BULK_SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   }
// } as SMTPTransport.Options);

export async function sendEmail(email: string, subject: string, message: string) {
  const sender = {
    address: email,
    name: "God's Child ID User",
  };
  const recipients = [
    "support@godschildid.com"
  ];

  await transporter.sendMail({
    from: sender,
    to: recipients,
    subject: subject,
    text: message
  }).then(console.log, console.error);
}

export async function sendFlyerEmail(email: string, url: string) {
  const sender = {
    address: "support@godschildid.com",
    name: "God's Child ID",
  };
  const recipients = [
    email
  ];

  await transporter.sendMail({
    from: sender,
    to: recipients,
    subject: "Flyer Submission",
    text: `${email} has requested transmission of this God's Child ID flyer to you: ${url}`
  }).then(console.log, console.error);
}

export async function sendWelcomeEmail(email: string) {
  mtClient.send({
    from: { name: "God's Child ID", email: "support@godschildid.com" },
    to: [{ email: email }],
    template_uuid: "8d0776bd-01ac-4943-912e-cb9b852f0d00",
    template_variables: {
      "name": email,
      "company_info_name": "God's Child ID"
    }
  })
    .then(console.log)
    .catch(console.error);
}

export async function sendReminderEmail() {
  const x = await listUsersWithPagination(),
    condensedList = x.map(y => y.emailAddresses
      .filter((z: any) => z.verification.status === 'verified') // eslint-disable-line @typescript-eslint/no-explicit-any
      .map((z: any) => z.emailAddress)).join().split(',') // eslint-disable-line @typescript-eslint/no-explicit-any
      .map(element => {return { email: element }});
  console.log(condensedList);
  mtClient.send({
    from: { name: "God's Child ID", email: "support@godschildid.com" },
    to: [],
    bcc: condensedList,
    template_uuid: "1a284f9d-afba-43c2-8cc0-eb01ba6deb99",
    template_variables: {
      "company_info_name": "God's Child ID"
    }
  })
  .then(console.log)
  .catch(console.error);
  // const sender = {
  //   address: "support@godschildid.com",
  //   name: "God's Child ID",
  // };

  // await bulkTransporter.sendMail({
  //   from: sender,
  //   bcc: condensedList,
  //   template_uuid: "1a284f9d-afba-43c2-8cc0-eb01ba6deb99",
  //   template_variables: {
  //     "company_info_name": "God's Child ID"
  //   }
  // }).then(console.log, console.error);
}

async function listUsersWithPagination() {
  let t = 1, r = 0, offset = 0;
  const d = [];
  while (r < t) {
    const { data, totalCount } = await clClient.users.getUserList({
      limit: 500,
      offset: offset,
      orderBy: '-created_at'
    });
    console.log(`Retrieved ${data.length} users out of ${totalCount}`);
    d.push(...data);
    offset += 500;
    t = totalCount;
    r += data.length;
  }
  return d;
}

export async function sendtext(message: string, phone: string) {
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
  const today = new Date();
  let emailDate = new Date();
  let emailMonth = 0;
  const month = today.getMonth();
  const day = today.getDate(); 

  if (month >= 11) {
    emailMonth = 11;
  } else if (month >= 7) {
    emailMonth = 7;
  } else if (month >= 3) {
    emailMonth = 3;
  }  else if (month >= 0) {
    emailMonth = 0;
  }

  emailDate.setDate(1);
  emailDate.setMonth(emailMonth);
  const formattedDate = format(emailDate, "yyyy-MM-dd");
  const isMonthEmailSentB = await isMonthEmailSent(formattedDate);
  if (!isMonthEmailSentB) {
    console.log('Email not sent');
    await sendReminderEmail();
    await saveMonthEmailLog(formattedDate);
  }

  // check date
  // if within 2 weeks update campaign schedule
  // and add table entry
  // if date missed, send email campaign
}

export async function isMonthEmailSent (emailDate: string) {
  const [log] = await db.select().from(emailLogs).where(and (
    eq(emailLogs.emailDate, emailDate),
    eq(emailLogs.emailType, 'reminder')));
  return log != null;
}

export const saveMonthEmailLog = async (emailDate: string) => {
  const [log] = await db.insert(emailLogs).values({
    emailDate: emailDate,
    isComplete: 'true',
    emailType: 'reminder'
  }).returning();

  return {
    id: log.id
  }

}

//https://github.com/mailtrap/mailtrap-nodejs/blob/HEAD/examples/sending/template.ts
