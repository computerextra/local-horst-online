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
  sendInfoMail: publicProcedure
    .input(
      z.object({
        Empfänger: z.string(),
        Auftrag: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const Transporter = nodemailer.createTransport(Config);
      const Message = {
        from: "info@computer-extra.de",
        to: input.Empfänger,
        bcc: [
          "service@computer-extra.de",
          "johannes.kirchner@computer-extra.de",
        ],
        subject: `Ihre Bestellung AU${input.Auftrag}`,
        html: 'Sehr geehrte Kundin, sehr geehrter Kunde,<br><br>Ihre Bestellung ist soeben bei uns eingetroffen. Sie durchläuft aktuell unseren Wareneingang. Sie können Ihre bestellte Ware ab dem nächsten Werktag 9 Uhr bei uns abholen.<br><br>Unsere Öffnungszeiten:<br>Montag - Freitag 09:00 - 18:00 Uhr<br><br>Mit freundlichen Grüßen<br><b>Ihr Computer Extra Team</b><br><br><b>Computer Extra Ernst & Jacob KG</b><br>Harleshäuser Str. 8<br>34130 Kassel<br><br>tel. <a href="tel:0049561601440">0561/60144 - 0</a><br>fax 0561/60144 - 199<br>Mail: <a href="mailto:info@computer-extra.de">info@computer-extra.de</a><br>url: <a href="https://www.computer-extra.de">www.computer-extra.de</a><br><br>Besuchen Sie uns auch auf <a href="https://www.facebook.com/computerextra">Facebook</a> oder <a href="https://www.instagram.com/computerextra/">Instagram</a><br><font size="1">Amtsgericht Kassel | HRA: 10065<br>Komplementäre: Rainer Jacob, Ingo Ernst</font><br><br><b>Besuchen Sie uns!</b> Sie finden uns in der <b>Harleshäuser Str. 8 in Kassel.</b> Hier stehen wir Ihnen auf fast <b>600qm</b> für Ihre Fragen, Probleme und Wünsche zur Verfügung.<br><br><font color="#FF0000">Der Inhalt dieser E-Mail und sämtliche Anhänge sind vertraulich und ausschließlich für den bezeichneten Empfänger bestimmt. Sollten Sie nicht der bezeichnete Empfänger sein, bitten wir Sie, umgehend den Absender zu benachrichtigen und diese E-Mail zu löschen. Jede Form der unautorisierten Veröffentlichung, Vervielfältigung und Weitergabe des Inhalts dieser E-Mail oder auch das Ergreifen von Maßnahmen als Reaktion darauf sind unzulässig.</font>',
      };
      const Res = await Transporter.sendMail(Message);
      if (Res.response.includes("Ok")) {
        return "Sent";
      } else {
        return "Error:" + Res.response;
      }
    }),
});
