import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { z } from "zod";
import { env } from "~/env.mjs";

const MailConfig = z.object({
  host: z.string(),
  port: z.number().int(),
  auth: z.object({
    user: z.string(),
    pass: z.string(),
  }),
});

const Config = MailConfig.parse({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

type MailConfig = z.infer<typeof MailConfig>;

const sendMail = async (
  sender: string,
  receiver: string,
  subject: string,
  body: string
) => {
  // TODO: Send Mail
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const Transporter = nodemailer.createTransport(Config);
  const Message = {
    from: sender,
    to: receiver,
    bcc: ["service@computer-extra.de", "johannes.kirchner@computer-extra.de"],
    subject: subject,
    html: body,
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const Result: SMTPTransport.SentMessageInfo = await Transporter.sendMail(
    Message
  );
  if (Result.response.includes("Ok")) {
    return "Gesendet";
  } else {
    return "Fehler: " + Result.response;
  }
};

export default sendMail;
