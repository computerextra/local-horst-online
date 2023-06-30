import nodemailer from "nodemailer";
import { z } from "zod";
import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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

export const MailRouter = createTRPCRouter({
  sendPaypalMail: publicProcedure
    .input(
      z.object({ id: z.string(), username: z.string(), Schulden: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      const Mitarbeiter = await ctx.prisma.mitarbeiter.findUnique({
        where: {
          id: input.id,
        },
      });
      if (Mitarbeiter == null) return "Error: Kein Mitarbeiter gefunden.";
      if (Mitarbeiter.Mail == null || Mitarbeiter.Mail.length < 1)
        return "Error: Mitarbeiter hat keine Mailadresse.";

      const PaypalLink = `https://paypal.me/${input.username}/${input.Schulden}`;
      const QRCode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${PaypalLink}`;
      const body = `<h1>Hallo ${Mitarbeiter.Name}</h1><p>Bitte bezahle ${input.Schulden}€ über Paypal.</p><p>Link: ${PaypalLink}</p><p>Oder ganz Einfach mit dem Smartphone. Dafür einfach den QR-Code scannen</p><p><img src="${QRCode}"></p>`;

      const Transporter = nodemailer.createTransport(Config);
      const Message = {
        from: "service@computer-extra.de",
        to: Mitarbeiter.Mail,
        subject: "Abrechnung Paypal",
        html: body,
      };
      const Res = await Transporter.sendMail(Message);
      if (Res.response.includes("Ok")) {
        return "Sent";
      } else {
        return "Error:" + Res.response;
      }
    }),
});
