import nodemailer from "nodemailer";
import { z } from "zod";
import { env } from "~/env";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

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
  paypalMail: publicProcedure
    .input(
      z.object({
        paypalName: z.string(),
        receiverMail: z.string(),
        receiverName: z.string(),
        Schulden: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const PaypalLink = `https://paypal.me/${input.paypalName}/${input.Schulden}`;
      const QRCode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${PaypalLink}`;
      const body = `<h1>Hallo ${input.receiverName}</h1><p>Bitte bezahle ${input.Schulden}€ über Paypal.</p><p>Link: ${PaypalLink}</p><p>Oder ganz Einfach mit dem Smartphone. Dafür einfach den QR-Code scannen</p><p><img src="${QRCode}"></p>`;

      const Transporter = nodemailer.createTransport(Config);
      const Message = {
        from: "service@computer-extra.de",
        to: input.receiverMail,
        subject: "Abrechnung Paypal",
        html: body,
      };
      const res = await Transporter.sendMail(Message);
      if (res.response.includes("Ok")) {
        return true;
      } else {
        return false;
      }
    }),
  infoMail: protectedProcedure
    .input(
      z.object({
        receiver: z.string(),
        title: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const transporter = nodemailer.createTransport(Config);
      const message = {
        from: "info@computer-extra.de",
        to: input.receiver,
        bcc: [
          "service@computer-extra.de",
          "johannes.kirchner@computer-extra.de",
        ],
        subject: `Ihre Bestellung AU${input.title}`,
        html:
          "Sehr geehrte Kundin, sehr geehrter Kunde,<br><br>" +
          "Ihre Bestellung ist soeben bei uns eingetroffen. Sie " +
          "durchläuft aktuell unseren Wareneingang. Sie können Ihre " +
          "bestellte Ware ab dem nächsten Werktag 9 Uhr bei uns " +
          "abholen." +
          "<br><br>Unsere Öffnungszeiten:<br>" +
          "Montag - Freitag 09:00 - 18:00 Uhr<br><br>" +
          "Mit freundlichen Grüßen<br>" +
          "<b>Ihr Computer Extra Team</b><br><br>" +
          'Telefon <a href="tel:0561601440">0561 60 144 0</a> <br>' +
          "Fax 0561 60 144 199 <br>" +
          'E-Mail <a href="mailto:info@computer-extra.de">info@computer-extra.de</a> <br>' +
          'Website <a href="https://computer-extra.de">www.computer-extra.de</a> <br> <br>' +
          "<b>Computer Extra GmbH</b><br>" +
          "Harleshäuser Str. 8<br>" +
          "34130 Kassel<br><br>" +
          "Sitz der Gesellschaft: 34637 Schrecksbach <br>" +
          "Geschäftsführer: Christian Krauss - Handelsregister: Marburg, HRB 8151 <br>" +
          "USt.-IdNr.: DE357590630 <br>" +
          '<a href="https://computer-extra.de/Datenschutz">Datenschutzinformationen</a>' +
          " - " +
          '<a href="https://computer-extra.de/AGB">AGB</a>' +
          " - " +
          '<a href="https://computer-extra.de/Impressum">Impressum</a>' +
          '<br><br><font color="#FF0000">' +
          "Der Inhalt dieser E-Mail und sämtliche Anhänge sind " +
          "vertraulich und ausschließlich für den bezeichneten Empfänger " +
          "bestimmt. Sollten Sie nicht der bezeichnete Empfänger sein, " +
          "bitten wir Sie, umgehend den Absender zu benachrichtigen und " +
          "diese E-Mail zu löschen. Jede Form der unautorisierten " +
          "Veröffentlichung, Vervielfältigung und Weitergabe des Inhalts " +
          "dieser E-Mail oder auch das Ergreifen von Maßnahmen als " +
          "Reaktion darauf sind unzulässig.</font>",
      };
      const res = await transporter.sendMail(message);
      if (res.response.includes("Ok")) {
        return true;
      } else {
        return false;
      }
    }),
  WarenlieferungsMail: protectedProcedure.mutation(async ({ ctx }) => {
    const heute = new Date().toDateString();
    const morgen = new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toDateString();
    const Warenlieferung = await ctx.horst.warenlieferung.findMany({
      where: {
        OR: [
          {
            geliefert: {
              gte: new Date(heute),
              lt: new Date(morgen),
            },
          },
          {
            angelegt: {
              gte: new Date(heute),
              lt: new Date(morgen),
            },
          },
        ],
      },
    });
    if (Warenlieferung == null) return false;

    const Neu: typeof Warenlieferung = [];
    const Alt: typeof Warenlieferung = [];
    const Preis: typeof Warenlieferung = [];

    Warenlieferung.forEach((element) => {
      if (
        element.angelegt &&
        new Date(element.angelegt).toDateString() == heute
      )
        Neu.push(element);
      if (
        element.geliefert &&
        new Date(element.geliefert).toDateString() == heute &&
        element.angelegt &&
        new Date(element.angelegt).toDateString() != heute
      )
        Alt.push(element);
      if (
        element.Preis &&
        new Date(element.Preis).toDateString() == heute &&
        element.angelegt &&
        new Date(element.angelegt).toDateString() != heute
      )
        Preis.push(element);
    });
    let body = "";
    if (Neu.length > 0) {
      body += "<h2>Neue Artikel:</h2>";
      Neu.forEach((element) => {
        if (element.Artikelnummer != null && element.Name != null)
          body += `<b>${element.Artikelnummer}</b>: ${element.Name}<br>`;
      });
    }

    body += Neu.length > 0 && Alt.length > 0 ? "<hr>" : "";

    if (Alt.length > 0) {
      body += "<h2>Gelieferte Artikel:</h2>";
      Alt.forEach((element) => {
        if (element.Artikelnummer != null && element.Name != null)
          body += `<b>${element.Artikelnummer}</b>: ${element.Name}<br>`;
      });
    }

    body +=
      Neu.length > 0 && Alt.length > 0 && Preis.length > 0
        ? "<hr>"
        : Preis.length > 0 && Alt.length < 0 && Neu.length < 0
        ? "<hr>"
        : "";

    if (Preis.length > 0) {
      body += "<h2>Preisänderungen</h2>";
      Preis.forEach((element) => {
        if (
          element.Preis &&
          new Date(element.Preis).toDateString() == new Date().toDateString() &&
          new Date(element.angelegt).toDateString() !=
            new Date(element.Preis).toDateString() &&
          element.AlterPreis &&
          element.NeuerPreis &&
          element.AlterPreis != element.NeuerPreis &&
          element.AlterPreis.toPrecision(2) != element.NeuerPreis.toPrecision(2)
        )
          body += `<b>${element.Artikelnummer}</b>: ${
            element.Name
          } - Alt: ${element.AlterPreis.toPrecision(
            2
          )}€ => Neu: ${element.NeuerPreis.toPrecision(2)}€ <br />`;
      });
    }

    const transporter = nodemailer.createTransport(Config);
    const message = {
      from: "info@computer-extra.de",
      to: "service@computer-extra.de",
      subject: "Warenlieferung vom " + new Date().toLocaleDateString(),
      html: `<h1>Warenlieferung vom ${new Date().toLocaleDateString()}</h1><br><br>${body}`,
    };
    const res = await transporter.sendMail(message);
    if (res.response.includes("Ok")) return true;
    else return false;
  }),
});
