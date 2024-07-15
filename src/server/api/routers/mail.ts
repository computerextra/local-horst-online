import type { Decimal } from "@prisma/client/runtime/library";
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

const diff = (a: Decimal | null, b: Decimal | null): string => {
  if (a == null || b == null) return "0";
  // @ts-expect-error Prisma Decimal ist noch nicht so wirklich nutzbar.
  const diff = a - b;
  return diff.toFixed(2);
};

const diffProzent = (a: Decimal | null, b: Decimal | null): string => {
  if (a == null || b == null) return "0";
  // @ts-expect-error Prisma Decimal ist noch nicht so wirklich nutzbar.
  const percent = (diff(a, b) / a) * 100;
  return percent < 0
    ? (percent * -1).toFixed(2) + "% Teurer"
    : percent.toFixed(2) + "% Billiger";
};

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
        html: `<html xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office"
        xmlns:w="urn:schemas-microsoft-com:office:word"
        xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"
        xmlns="http://www.w3.org/TR/REC-html40">

        <head>
        <meta http-equiv=Content-Type content="text/html; charset=windows-1252">
        <meta name=ProgId content=Word.Document>
        <meta name=Generator content="Microsoft Word 15">
        <meta name=Originator content="Microsoft Word 15">
        <link rel=File-List href="Info-Dateien/filelist.xml">
        <!--[if gte mso 9]><xml>
         <o:DocumentProperties>
          <o:Author>Verkauf (Computer Extra KG)</o:Author>
          <o:Template>Normal</o:Template>
          <o:LastAuthor>Julian Thurian (Computer Extra)</o:LastAuthor>
          <o:Revision>2</o:Revision>
          <o:Created>2024-04-30T10:22:00Z</o:Created>
          <o:LastSaved>2024-04-30T10:22:00Z</o:LastSaved>
          <o:Pages>1</o:Pages>
          <o:Words>146</o:Words>
          <o:Characters>1269</o:Characters>
          <o:Lines>10</o:Lines>
          <o:Paragraphs>2</o:Paragraphs>
          <o:CharactersWithSpaces>1413</o:CharactersWithSpaces>
          <o:Version>16.00</o:Version>
         </o:DocumentProperties>
         <o:OfficeDocumentSettings>
          <o:AllowPNG/>
         </o:OfficeDocumentSettings>
        </xml><![endif]-->
        <link rel=themeData href="Info-Dateien/themedata.thmx">
        <link rel=colorSchemeMapping href="Info-Dateien/colorschememapping.xml">
        <!--[if gte mso 9]><xml>
         <w:WordDocument>
          <w:SpellingState>Clean</w:SpellingState>
          <w:GrammarState>Clean</w:GrammarState>
          <w:TrackMoves/>
          <w:TrackFormatting/>
          <w:HyphenationZone>21</w:HyphenationZone>
          <w:ValidateAgainstSchemas/>
          <w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid>
          <w:IgnoreMixedContent>false</w:IgnoreMixedContent>
          <w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText>
          <w:DoNotPromoteQF/>
          <w:LidThemeOther>DE</w:LidThemeOther>
          <w:LidThemeAsian>X-NONE</w:LidThemeAsian>
          <w:LidThemeComplexScript>X-NONE</w:LidThemeComplexScript>
          <w:Compatibility>
           <w:BreakWrappedTables/>
           <w:UseWord2010TableStyleRules/>
           <w:SplitPgBreakAndParaMark/>
          </w:Compatibility>
          <m:mathPr>
           <m:mathFont m:val="Cambria Math"/>
           <m:brkBin m:val="before"/>
           <m:brkBinSub m:val="&#45;-"/>
           <m:smallFrac m:val="off"/>
           <m:dispDef/>
           <m:lMargin m:val="0"/>
           <m:rMargin m:val="0"/>
           <m:defJc m:val="centerGroup"/>
           <m:wrapIndent m:val="1440"/>
           <m:intLim m:val="subSup"/>
           <m:naryLim m:val="undOvr"/>
          </m:mathPr></w:WordDocument>
        </xml><![endif]--><!--[if gte mso 9]><xml>
         <w:LatentStyles DefLockedState="false" DefUnhideWhenUsed="false"
          DefSemiHidden="false" DefQFormat="false" DefPriority="99"
          LatentStyleCount="376">
          <w:LsdException Locked="false" Priority="0" QFormat="true" Name="Normal"/>
          <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 1"/>
          <w:LsdException Locked="false" Priority="9" SemiHidden="true"
           UnhideWhenUsed="true" QFormat="true" Name="heading 2"/>
          <w:LsdException Locked="false" Priority="9" SemiHidden="true"
           UnhideWhenUsed="true" QFormat="true" Name="heading 3"/>
          <w:LsdException Locked="false" Priority="9" SemiHidden="true"
           UnhideWhenUsed="true" QFormat="true" Name="heading 4"/>
          <w:LsdException Locked="false" Priority="9" SemiHidden="true"
           UnhideWhenUsed="true" QFormat="true" Name="heading 5"/>
          <w:LsdException Locked="false" Priority="9" SemiHidden="true"
           UnhideWhenUsed="true" QFormat="true" Name="heading 6"/>
          <w:LsdException Locked="false" Priority="9" SemiHidden="true"
           UnhideWhenUsed="true" QFormat="true" Name="heading 7"/>
          <w:LsdException Locked="false" Priority="9" SemiHidden="true"
           UnhideWhenUsed="true" QFormat="true" Name="heading 8"/>
          <w:LsdException Locked="false" Priority="9" SemiHidden="true"
           UnhideWhenUsed="true" QFormat="true" Name="heading 9"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="index 1"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="index 2"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="index 3"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="index 4"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="index 5"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="index 6"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="index 7"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="index 8"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="index 9"/>
          <w:LsdException Locked="false" Priority="39" SemiHidden="true"
           UnhideWhenUsed="true" Name="toc 1"/>
          <w:LsdException Locked="false" Priority="39" SemiHidden="true"
           UnhideWhenUsed="true" Name="toc 2"/>
          <w:LsdException Locked="false" Priority="39" SemiHidden="true"
           UnhideWhenUsed="true" Name="toc 3"/>
          <w:LsdException Locked="false" Priority="39" SemiHidden="true"
           UnhideWhenUsed="true" Name="toc 4"/>
          <w:LsdException Locked="false" Priority="39" SemiHidden="true"
           UnhideWhenUsed="true" Name="toc 5"/>
          <w:LsdException Locked="false" Priority="39" SemiHidden="true"
           UnhideWhenUsed="true" Name="toc 6"/>
          <w:LsdException Locked="false" Priority="39" SemiHidden="true"
           UnhideWhenUsed="true" Name="toc 7"/>
          <w:LsdException Locked="false" Priority="39" SemiHidden="true"
           UnhideWhenUsed="true" Name="toc 8"/>
          <w:LsdException Locked="false" Priority="39" SemiHidden="true"
           UnhideWhenUsed="true" Name="toc 9"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Normal Indent"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="footnote text"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="annotation text"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="header"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="footer"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="index heading"/>
          <w:LsdException Locked="false" Priority="35" SemiHidden="true"
           UnhideWhenUsed="true" QFormat="true" Name="caption"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="table of figures"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="envelope address"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="envelope return"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="footnote reference"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="annotation reference"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="line number"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="page number"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="endnote reference"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="endnote text"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="table of authorities"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="macro"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="toa heading"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="List"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="List Bullet"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="List Number"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="List 2"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="List 3"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="List 4"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="List 5"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="List Bullet 2"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="List Bullet 3"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="List Bullet 4"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="List Bullet 5"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="List Number 2"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="List Number 3"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="List Number 4"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="List Number 5"/>
          <w:LsdException Locked="false" Priority="10" QFormat="true" Name="Title"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Closing"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Signature"/>
          <w:LsdException Locked="false" Priority="1" SemiHidden="true"
           UnhideWhenUsed="true" Name="Default Paragraph Font"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Body Text"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Body Text Indent"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="List Continue"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="List Continue 2"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="List Continue 3"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="List Continue 4"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="List Continue 5"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Message Header"/>
          <w:LsdException Locked="false" Priority="11" QFormat="true" Name="Subtitle"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Salutation"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Date"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Body Text First Indent"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Body Text First Indent 2"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Note Heading"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Body Text 2"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Body Text 3"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Body Text Indent 2"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Body Text Indent 3"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Block Text"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Hyperlink"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="FollowedHyperlink"/>
          <w:LsdException Locked="false" Priority="22" QFormat="true" Name="Strong"/>
          <w:LsdException Locked="false" Priority="20" QFormat="true" Name="Emphasis"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Document Map"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Plain Text"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="E-mail Signature"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="HTML Top of Form"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="HTML Bottom of Form"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Normal (Web)"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="HTML Acronym"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="HTML Address"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="HTML Cite"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="HTML Code"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="HTML Definition"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="HTML Keyboard"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="HTML Preformatted"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="HTML Sample"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="HTML Typewriter"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="HTML Variable"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="annotation subject"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="No List"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Outline List 1"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Outline List 2"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Outline List 3"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Balloon Text"/>
          <w:LsdException Locked="false" Priority="39" Name="Table Grid"/>
          <w:LsdException Locked="false" SemiHidden="true" Name="Placeholder Text"/>
          <w:LsdException Locked="false" Priority="1" QFormat="true" Name="No Spacing"/>
          <w:LsdException Locked="false" Priority="60" Name="Light Shading"/>
          <w:LsdException Locked="false" Priority="61" Name="Light List"/>
          <w:LsdException Locked="false" Priority="62" Name="Light Grid"/>
          <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1"/>
          <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2"/>
          <w:LsdException Locked="false" Priority="65" Name="Medium List 1"/>
          <w:LsdException Locked="false" Priority="66" Name="Medium List 2"/>
          <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1"/>
          <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2"/>
          <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3"/>
          <w:LsdException Locked="false" Priority="70" Name="Dark List"/>
          <w:LsdException Locked="false" Priority="71" Name="Colorful Shading"/>
          <w:LsdException Locked="false" Priority="72" Name="Colorful List"/>
          <w:LsdException Locked="false" Priority="73" Name="Colorful Grid"/>
          <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 1"/>
          <w:LsdException Locked="false" Priority="61" Name="Light List Accent 1"/>
          <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 1"/>
          <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 1"/>
          <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 1"/>
          <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 1"/>
          <w:LsdException Locked="false" SemiHidden="true" Name="Revision"/>
          <w:LsdException Locked="false" Priority="34" QFormat="true"
           Name="List Paragraph"/>
          <w:LsdException Locked="false" Priority="29" QFormat="true" Name="Quote"/>
          <w:LsdException Locked="false" Priority="30" QFormat="true"
           Name="Intense Quote"/>
          <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 1"/>
          <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 1"/>
          <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 1"/>
          <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 1"/>
          <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 1"/>
          <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 1"/>
          <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 1"/>
          <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 1"/>
          <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 2"/>
          <w:LsdException Locked="false" Priority="61" Name="Light List Accent 2"/>
          <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 2"/>
          <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 2"/>
          <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 2"/>
          <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 2"/>
          <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 2"/>
          <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 2"/>
          <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 2"/>
          <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 2"/>
          <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 2"/>
          <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 2"/>
          <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 2"/>
          <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 2"/>
          <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 3"/>
          <w:LsdException Locked="false" Priority="61" Name="Light List Accent 3"/>
          <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 3"/>
          <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 3"/>
          <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 3"/>
          <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 3"/>
          <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 3"/>
          <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 3"/>
          <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 3"/>
          <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 3"/>
          <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 3"/>
          <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 3"/>
          <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 3"/>
          <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 3"/>
          <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 4"/>
          <w:LsdException Locked="false" Priority="61" Name="Light List Accent 4"/>
          <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 4"/>
          <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 4"/>
          <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 4"/>
          <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 4"/>
          <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 4"/>
          <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 4"/>
          <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 4"/>
          <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 4"/>
          <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 4"/>
          <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 4"/>
          <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 4"/>
          <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 4"/>
          <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 5"/>
          <w:LsdException Locked="false" Priority="61" Name="Light List Accent 5"/>
          <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 5"/>
          <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 5"/>
          <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 5"/>
          <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 5"/>
          <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 5"/>
          <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 5"/>
          <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 5"/>
          <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 5"/>
          <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 5"/>
          <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 5"/>
          <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 5"/>
          <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 5"/>
          <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 6"/>
          <w:LsdException Locked="false" Priority="61" Name="Light List Accent 6"/>
          <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 6"/>
          <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 6"/>
          <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 6"/>
          <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 6"/>
          <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 6"/>
          <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 6"/>
          <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 6"/>
          <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 6"/>
          <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 6"/>
          <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 6"/>
          <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 6"/>
          <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 6"/>
          <w:LsdException Locked="false" Priority="19" QFormat="true"
           Name="Subtle Emphasis"/>
          <w:LsdException Locked="false" Priority="21" QFormat="true"
           Name="Intense Emphasis"/>
          <w:LsdException Locked="false" Priority="31" QFormat="true"
           Name="Subtle Reference"/>
          <w:LsdException Locked="false" Priority="32" QFormat="true"
           Name="Intense Reference"/>
          <w:LsdException Locked="false" Priority="33" QFormat="true" Name="Book Title"/>
          <w:LsdException Locked="false" Priority="37" SemiHidden="true"
           UnhideWhenUsed="true" Name="Bibliography"/>
          <w:LsdException Locked="false" Priority="39" SemiHidden="true"
           UnhideWhenUsed="true" QFormat="true" Name="TOC Heading"/>
          <w:LsdException Locked="false" Priority="41" Name="Plain Table 1"/>
          <w:LsdException Locked="false" Priority="42" Name="Plain Table 2"/>
          <w:LsdException Locked="false" Priority="43" Name="Plain Table 3"/>
          <w:LsdException Locked="false" Priority="44" Name="Plain Table 4"/>
          <w:LsdException Locked="false" Priority="45" Name="Plain Table 5"/>
          <w:LsdException Locked="false" Priority="40" Name="Grid Table Light"/>
          <w:LsdException Locked="false" Priority="46" Name="Grid Table 1 Light"/>
          <w:LsdException Locked="false" Priority="47" Name="Grid Table 2"/>
          <w:LsdException Locked="false" Priority="48" Name="Grid Table 3"/>
          <w:LsdException Locked="false" Priority="49" Name="Grid Table 4"/>
          <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark"/>
          <w:LsdException Locked="false" Priority="51" Name="Grid Table 6 Colorful"/>
          <w:LsdException Locked="false" Priority="52" Name="Grid Table 7 Colorful"/>
          <w:LsdException Locked="false" Priority="46"
           Name="Grid Table 1 Light Accent 1"/>
          <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 1"/>
          <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 1"/>
          <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 1"/>
          <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 1"/>
          <w:LsdException Locked="false" Priority="51"
           Name="Grid Table 6 Colorful Accent 1"/>
          <w:LsdException Locked="false" Priority="52"
           Name="Grid Table 7 Colorful Accent 1"/>
          <w:LsdException Locked="false" Priority="46"
           Name="Grid Table 1 Light Accent 2"/>
          <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 2"/>
          <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 2"/>
          <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 2"/>
          <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 2"/>
          <w:LsdException Locked="false" Priority="51"
           Name="Grid Table 6 Colorful Accent 2"/>
          <w:LsdException Locked="false" Priority="52"
           Name="Grid Table 7 Colorful Accent 2"/>
          <w:LsdException Locked="false" Priority="46"
           Name="Grid Table 1 Light Accent 3"/>
          <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 3"/>
          <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 3"/>
          <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 3"/>
          <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 3"/>
          <w:LsdException Locked="false" Priority="51"
           Name="Grid Table 6 Colorful Accent 3"/>
          <w:LsdException Locked="false" Priority="52"
           Name="Grid Table 7 Colorful Accent 3"/>
          <w:LsdException Locked="false" Priority="46"
           Name="Grid Table 1 Light Accent 4"/>
          <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 4"/>
          <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 4"/>
          <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 4"/>
          <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 4"/>
          <w:LsdException Locked="false" Priority="51"
           Name="Grid Table 6 Colorful Accent 4"/>
          <w:LsdException Locked="false" Priority="52"
           Name="Grid Table 7 Colorful Accent 4"/>
          <w:LsdException Locked="false" Priority="46"
           Name="Grid Table 1 Light Accent 5"/>
          <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 5"/>
          <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 5"/>
          <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 5"/>
          <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 5"/>
          <w:LsdException Locked="false" Priority="51"
           Name="Grid Table 6 Colorful Accent 5"/>
          <w:LsdException Locked="false" Priority="52"
           Name="Grid Table 7 Colorful Accent 5"/>
          <w:LsdException Locked="false" Priority="46"
           Name="Grid Table 1 Light Accent 6"/>
          <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 6"/>
          <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 6"/>
          <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 6"/>
          <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 6"/>
          <w:LsdException Locked="false" Priority="51"
           Name="Grid Table 6 Colorful Accent 6"/>
          <w:LsdException Locked="false" Priority="52"
           Name="Grid Table 7 Colorful Accent 6"/>
          <w:LsdException Locked="false" Priority="46" Name="List Table 1 Light"/>
          <w:LsdException Locked="false" Priority="47" Name="List Table 2"/>
          <w:LsdException Locked="false" Priority="48" Name="List Table 3"/>
          <w:LsdException Locked="false" Priority="49" Name="List Table 4"/>
          <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark"/>
          <w:LsdException Locked="false" Priority="51" Name="List Table 6 Colorful"/>
          <w:LsdException Locked="false" Priority="52" Name="List Table 7 Colorful"/>
          <w:LsdException Locked="false" Priority="46"
           Name="List Table 1 Light Accent 1"/>
          <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 1"/>
          <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 1"/>
          <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 1"/>
          <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 1"/>
          <w:LsdException Locked="false" Priority="51"
           Name="List Table 6 Colorful Accent 1"/>
          <w:LsdException Locked="false" Priority="52"
           Name="List Table 7 Colorful Accent 1"/>
          <w:LsdException Locked="false" Priority="46"
           Name="List Table 1 Light Accent 2"/>
          <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 2"/>
          <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 2"/>
          <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 2"/>
          <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 2"/>
          <w:LsdException Locked="false" Priority="51"
           Name="List Table 6 Colorful Accent 2"/>
          <w:LsdException Locked="false" Priority="52"
           Name="List Table 7 Colorful Accent 2"/>
          <w:LsdException Locked="false" Priority="46"
           Name="List Table 1 Light Accent 3"/>
          <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 3"/>
          <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 3"/>
          <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 3"/>
          <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 3"/>
          <w:LsdException Locked="false" Priority="51"
           Name="List Table 6 Colorful Accent 3"/>
          <w:LsdException Locked="false" Priority="52"
           Name="List Table 7 Colorful Accent 3"/>
          <w:LsdException Locked="false" Priority="46"
           Name="List Table 1 Light Accent 4"/>
          <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 4"/>
          <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 4"/>
          <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 4"/>
          <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 4"/>
          <w:LsdException Locked="false" Priority="51"
           Name="List Table 6 Colorful Accent 4"/>
          <w:LsdException Locked="false" Priority="52"
           Name="List Table 7 Colorful Accent 4"/>
          <w:LsdException Locked="false" Priority="46"
           Name="List Table 1 Light Accent 5"/>
          <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 5"/>
          <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 5"/>
          <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 5"/>
          <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 5"/>
          <w:LsdException Locked="false" Priority="51"
           Name="List Table 6 Colorful Accent 5"/>
          <w:LsdException Locked="false" Priority="52"
           Name="List Table 7 Colorful Accent 5"/>
          <w:LsdException Locked="false" Priority="46"
           Name="List Table 1 Light Accent 6"/>
          <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 6"/>
          <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 6"/>
          <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 6"/>
          <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 6"/>
          <w:LsdException Locked="false" Priority="51"
           Name="List Table 6 Colorful Accent 6"/>
          <w:LsdException Locked="false" Priority="52"
           Name="List Table 7 Colorful Accent 6"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Mention"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Smart Hyperlink"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Hashtag"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Unresolved Mention"/>
          <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
           Name="Smart Link"/>
         </w:LatentStyles>
        </xml><![endif]-->
        <style>
        <!--
         /* Font Definitions */
         @font-face
          {font-family:"Cambria Math";
          panose-1:2 4 5 3 5 4 6 3 2 4;
          mso-font-charset:0;
          mso-generic-font-family:roman;
          mso-font-pitch:variable;
          mso-font-signature:-536869121 1107305727 33554432 0 415 0;}
        @font-face
          {font-family:Calibri;
          panose-1:2 15 5 2 2 2 4 3 2 4;
          mso-font-charset:0;
          mso-generic-font-family:swiss;
          mso-font-pitch:variable;
          mso-font-signature:-469750017 -1073732485 9 0 511 0;}
        @font-face
          {font-family:Aptos;
          mso-font-charset:0;
          mso-generic-font-family:swiss;
          mso-font-pitch:variable;
          mso-font-signature:536871559 3 0 0 415 0;}
         /* Style Definitions */
         p.MsoNormal, li.MsoNormal, div.MsoNormal
          {mso-style-unhide:no;
          mso-style-qformat:yes;
          mso-style-parent:"";
          margin:0cm;
          mso-pagination:widow-orphan;
          font-size:12.0pt;
          font-family:"Times New Roman",serif;
          mso-fareast-font-family:"Times New Roman";
          mso-fareast-theme-font:minor-fareast;}
        a:link, span.MsoHyperlink
          {mso-style-priority:99;
          font-family:"Times New Roman",serif;
          mso-bidi-font-family:"Times New Roman";
          color:#0563C1;
          mso-themecolor:hyperlink;
          text-decoration:underline;
          text-underline:single;}
        a:visited, span.MsoHyperlinkFollowed
          {mso-style-noshow:yes;
          mso-style-priority:99;
          font-family:"Times New Roman",serif;
          mso-bidi-font-family:"Times New Roman";
          color:#954F72;
          mso-themecolor:followedhyperlink;
          text-decoration:underline;
          text-underline:single;}
        p.msonormal0, li.msonormal0, div.msonormal0
          {mso-style-name:msonormal;
          mso-style-unhide:no;
          mso-margin-top-alt:auto;
          margin-right:0cm;
          mso-margin-bottom-alt:auto;
          margin-left:0cm;
          mso-pagination:widow-orphan;
          font-size:12.0pt;
          font-family:"Times New Roman",serif;
          mso-fareast-font-family:"Times New Roman";
          mso-fareast-theme-font:minor-fareast;}
        span.SpellE
          {mso-style-name:"";
          mso-spl-e:yes;}
        .MsoChpDefault
          {mso-style-type:export-only;
          mso-default-props:yes;
          font-size:10.0pt;
          mso-ansi-font-size:10.0pt;
          mso-bidi-font-size:10.0pt;
          mso-font-kerning:0pt;
          mso-ligatures:none;}
        .MsoPapDefault
          {mso-style-type:export-only;}
        @page WordSection1
          {size:595.3pt 841.9pt;
          margin:70.85pt 70.85pt 2.0cm 70.85pt;
          mso-header-margin:35.4pt;
          mso-footer-margin:35.4pt;
          mso-paper-source:0;}
        div.WordSection1
          {page:WordSection1;}
        -->
        </style>
        <!--[if gte mso 10]>
        <style>
         /* Style Definitions */
         table.MsoNormalTable
          {mso-style-name:"Normale Tabelle";
          mso-tstyle-rowband-size:0;
          mso-tstyle-colband-size:0;
          mso-style-noshow:yes;
          mso-style-priority:99;
          mso-style-parent:"";
          mso-padding-alt:0cm 5.4pt 0cm 5.4pt;
          mso-para-margin:0cm;
          mso-pagination:widow-orphan;
          font-size:10.0pt;
          font-family:"Times New Roman",serif;}
        </style>
        <![endif]--><!--[if gte mso 9]><xml>
         <o:shapedefaults v:ext="edit" spidmax="1026"/>
        </xml><![endif]--><!--[if gte mso 9]><xml>
         <o:shapelayout v:ext="edit">
          <o:idmap v:ext="edit" data="1"/>
         </o:shapelayout></xml><![endif]-->
        </head>

        <body lang=DE link="#0563C1" vlink="#954F72" style='tab-interval:35.4pt;
        word-wrap:break-word'>

        <div class=WordSection1>

        <p class=MsoNormal><span style='font-size:11.0pt;mso-bidi-font-size:12.0pt;
        font-family:"Calibri",sans-serif;mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:
        minor-latin;mso-bidi-font-family:Aptos'>Sehr geehrte Kundin, sehr geehrter
        Kunde,<o:p></o:p></span></p>

        <p class=MsoNormal><span style='font-size:11.0pt;mso-bidi-font-size:12.0pt;
        font-family:"Calibri",sans-serif;mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:
        minor-latin;mso-bidi-font-family:Aptos'><o:p>&nbsp;</o:p></span></p>

        <p class=MsoNormal><span style='font-size:11.0pt;mso-bidi-font-size:12.0pt;
        font-family:"Calibri",sans-serif;mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:
        minor-latin;mso-bidi-font-family:Aptos'>hiermit teilen wir Ihnen mit, dass Ihre
        Bestellung bei uns eingetroffen ist und aktuell unseren Wareneingang
        durchläuft.<o:p></o:p></span></p>

        <p class=MsoNormal><span style='font-size:11.0pt;mso-bidi-font-size:12.0pt;
        font-family:"Calibri",sans-serif;mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:
        minor-latin;mso-bidi-font-family:Aptos'><o:p>&nbsp;</o:p></span></p>

        <p class=MsoNormal><span style='font-size:11.0pt;mso-bidi-font-size:12.0pt;
        font-family:"Calibri",sans-serif;mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:
        minor-latin;mso-bidi-font-family:Aptos'>Sie können Ihre bestellte Ware ab dem
        nächsten Werktag 9 Uhr abholen.<o:p></o:p></span></p>

        <p class=MsoNormal><span style='font-size:11.0pt;mso-bidi-font-size:12.0pt;
        font-family:"Calibri",sans-serif;mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:
        minor-latin;mso-bidi-font-family:Aptos'><o:p>&nbsp;</o:p></span></p>

        <p class=MsoNormal><span style='font-size:11.0pt;mso-bidi-font-size:12.0pt;
        font-family:"Calibri",sans-serif;mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:
        minor-latin;mso-bidi-font-family:Aptos'>Unsere Öffnungszeiten:<o:p></o:p></span></p>

        <p class=MsoNormal><span style='font-size:11.0pt;mso-bidi-font-size:12.0pt;
        font-family:"Calibri",sans-serif;mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:
        minor-latin;mso-bidi-font-family:Aptos'>Montag - Freitag: 9:00 - 18:00<o:p></o:p></span></p>

        <p class=MsoNormal><o:p>&nbsp;</o:p></p>

        <table class=MsoNormalTable border=0 cellpadding=0 width=461 style='width:345.75pt;
         mso-cellspacing:1.5pt;mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt'>
         <thead>
          <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>
           <td style='padding:.75pt .75pt .75pt .75pt'>
           <p class=MsoNormal><span style='font-size:11.0pt;font-family:"Calibri",sans-serif;
           mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;
           mso-bidi-font-family:Aptos;color:black;mso-themecolor:text1'>Mit
           freundlichen Grüßen <o:p></o:p></span></p>
           </td>
           <td style='padding:.75pt .75pt .75pt .75pt'></td>
          </tr>
         </thead>
         <tr style='mso-yfti-irow:1;mso-yfti-lastrow:yes'>
          <td style='border:none;border-right:solid #B7B7B7 1.0pt;mso-border-right-alt:
          solid #B7B7B7 .75pt;padding:.75pt .75pt .75pt .75pt'>
          <table class=MsoNormalTable border=0 cellpadding=0 width=250
           style='width:187.5pt;mso-cellspacing:1.5pt;mso-yfti-tbllook:1184;mso-padding-alt:
           0cm 5.4pt 0cm 5.4pt'>
           <thead>
            <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>
             <td style='padding:.75pt .75pt .75pt .75pt'>
             <p class=MsoNormal><span style='font-size:16.0pt;font-family:"Calibri",sans-serif;
             mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;
             mso-bidi-font-family:Aptos;color:#0C509F'>Ihr Computer Extra Team<o:p></o:p></span></p>
             </td>
             <td style='padding:.75pt .75pt .75pt .75pt'></td>
            </tr>
           </thead>
           <tr style='mso-yfti-irow:1;mso-yfti-lastrow:yes'>
            <td style='padding:.75pt .75pt .75pt .75pt'>
            <p class=MsoNormal><span style='font-size:9.0pt;font-family:"Calibri",sans-serif;
            mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;
            mso-bidi-font-family:Aptos'><o:p>&nbsp;</o:p></span></p>
            </td>
            <td style='padding:.75pt .75pt .75pt .75pt'></td>
           </tr>
          </table>
          <p class=MsoNormal><span style='font-family:"Calibri",sans-serif;mso-ascii-theme-font:
          minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Aptos;
          display:none;mso-hide:all'><o:p>&nbsp;</o:p></span></p>
          <table class=MsoNormalTable border=0 cellpadding=0 width=300
           style='width:225.0pt;mso-cellspacing:1.5pt;mso-yfti-tbllook:1184;mso-padding-alt:
           0cm 5.4pt 0cm 5.4pt'>
           <thead>
            <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>
             <td style='padding:.75pt .75pt .75pt .75pt'></td>
             <td style='padding:.75pt .75pt .75pt .75pt'></td>
            </tr>
           </thead>
           <tr style='mso-yfti-irow:1'>
            <td style='padding:.75pt .75pt .75pt .75pt'>
            <p class=MsoNormal><span style='font-size:10.0pt;font-family:"Calibri",sans-serif;
            mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;
            mso-bidi-font-family:Aptos;color:#B7B7B7'>Telefon<o:p></o:p></span></p>
            </td>
            <td style='padding:.75pt .75pt .75pt .75pt'>
            <p class=MsoNormal><span style='font-size:10.0pt;font-family:"Calibri",sans-serif;
            mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;
            mso-bidi-font-family:Aptos;color:#0C509F'><a href="tel:0561601440"><span
            style='mso-bidi-font-family:Aptos;color:#0C509F'>0561 60 144 0</span></a><o:p></o:p></span></p>
            </td>
           </tr>
           <tr style='mso-yfti-irow:2'>
            <td style='padding:.75pt .75pt .75pt .75pt'>
            <p class=MsoNormal><span style='font-size:10.0pt;font-family:"Calibri",sans-serif;
            mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;
            mso-bidi-font-family:Aptos;color:#B7B7B7'>Fax<o:p></o:p></span></p>
            </td>
            <td style='padding:.75pt .75pt .75pt .75pt'>
            <p class=MsoNormal><span style='font-size:10.0pt;font-family:"Calibri",sans-serif;
            mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;
            mso-bidi-font-family:Aptos;color:#0C509F'>0561 60 144 199<o:p></o:p></span></p>
            </td>
           </tr>
           <tr style='mso-yfti-irow:3'>
            <td style='padding:.75pt .75pt .75pt .75pt'>
            <p class=MsoNormal><span style='font-size:10.0pt;font-family:"Calibri",sans-serif;
            mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;
            mso-bidi-font-family:Aptos;color:#B7B7B7'>E-Mail<o:p></o:p></span></p>
            </td>
            <td style='padding:.75pt .75pt .75pt .75pt'>
            <p class=MsoNormal><span style='font-size:10.0pt;font-family:"Calibri",sans-serif;
            mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;
            mso-bidi-font-family:Aptos;color:#0C509F'><a
            href="mailto:info@computer-extra.de"><span style='mso-bidi-font-family:
            Aptos;color:#0C509F'>info@computer-extra.de</span></a><o:p></o:p></span></p>
            </td>
           </tr>
           <tr style='mso-yfti-irow:4'>
            <td style='padding:.75pt .75pt .75pt .75pt'>
            <p class=MsoNormal><span style='font-size:10.0pt;font-family:"Calibri",sans-serif;
            mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;
            mso-bidi-font-family:Aptos;color:#B7B7B7'>Webseite<o:p></o:p></span></p>
            </td>
            <td style='padding:.75pt .75pt .75pt .75pt'>
            <p class=MsoNormal><span style='font-family:"Calibri",sans-serif;
            mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;
            mso-bidi-font-family:Aptos;color:#0C509F'><a><span style='font-size:10.0pt;
            mso-bidi-font-family:Aptos;color:#0C509F'>www.computer-extra.de</span></a></span><span
            style='font-size:10.0pt;font-family:"Calibri",sans-serif;mso-ascii-theme-font:
            minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Aptos;
            color:#0C509F'><o:p></o:p></span></p>
            </td>
           </tr>
           <tr style='mso-yfti-irow:5;mso-yfti-lastrow:yes'>
            <td style='padding:.75pt .75pt .75pt .75pt'></td>
            <td style='padding:.75pt .75pt .75pt .75pt'></td>
           </tr>
          </table>
          <p class=MsoNormal><span style='font-size:10.0pt;font-family:"Calibri",sans-serif;
          mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:
          Aptos'><o:p></o:p></span></p>
          </td>
          <td style='padding:.75pt .75pt .75pt .75pt'>
          <table class=MsoNormalTable border=0 cellpadding=0 width=150
           style='width:112.5pt;mso-cellspacing:1.5pt;mso-yfti-tbllook:1184;mso-padding-alt:
           0cm 5.4pt 0cm 5.4pt'>
           <thead>
            <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>
             <td style='padding:.75pt .75pt .75pt .75pt'>
             <p class=MsoNormal><span style='font-size:14.0pt;font-family:"Calibri",sans-serif;
             mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;
             mso-bidi-font-family:Aptos;color:#2F5496;mso-themecolor:accent1;
             mso-themeshade:191;mso-no-proof:yes'>Computer Extra GmbH</span><span
             style='font-size:10.0pt;font-family:"Calibri",sans-serif;mso-ascii-theme-font:
             minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Aptos;
             color:#2F5496;mso-themecolor:accent1;mso-themeshade:191'><o:p></o:p></span></p>
             </td>
            </tr>
           </thead>
           <tr style='mso-yfti-irow:1'>
            <td style='padding:.75pt .75pt .75pt .75pt'></td>
           </tr>
           <tr style='mso-yfti-irow:2'>
            <td style='padding:.75pt .75pt .75pt .75pt'></td>
           </tr>
           <tr style='mso-yfti-irow:3'>
            <td style='padding:.75pt .75pt .75pt .75pt'>
            <p class=MsoNormal><span class=SpellE><span style='font-size:9.0pt;
            font-family:"Calibri",sans-serif;mso-ascii-theme-font:minor-latin;
            mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Aptos'>Harleshäuser</span></span><span
            style='font-size:9.0pt;font-family:"Calibri",sans-serif;mso-ascii-theme-font:
            minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Aptos'>
            Str. 8<o:p></o:p></span></p>
            </td>
           </tr>
           <tr style='mso-yfti-irow:4;mso-yfti-lastrow:yes'>
            <td style='padding:.75pt .75pt .75pt .75pt'>
            <p class=MsoNormal><span style='font-size:9.0pt;font-family:"Calibri",sans-serif;
            mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;
            mso-bidi-font-family:Aptos'>34130 Kassel<o:p></o:p></span></p>
            <p class=MsoNormal><span style='font-size:9.0pt;font-family:"Calibri",sans-serif;
            mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;
            mso-bidi-font-family:Aptos'><o:p>&nbsp;</o:p></span></p>
            <p class=MsoNormal><span style='font-size:9.0pt;font-family:"Calibri",sans-serif;
            mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;
            mso-bidi-font-family:Aptos'><o:p>&nbsp;</o:p></span></p>
            <p class=MsoNormal><span style='font-size:9.0pt;font-family:"Calibri",sans-serif;
            mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;
            mso-bidi-font-family:Aptos'><o:p>&nbsp;</o:p></span></p>
            </td>
           </tr>
          </table>
          </td>
         </tr>
        </table>

        <p class=MsoNormal><span style='font-size:8.0pt;font-family:"Calibri",sans-serif;
        mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:
        Aptos;color:#A5A5A5;mso-themecolor:accent3;mso-no-proof:yes'>Sitz der
        Gesellschaft: 34130 Kassel<br>
        Geschäftsführer: Christian Krauss - Handelsregister: Kassel, HRB 19697<o:p></o:p></span></p>

        <p class=MsoNormal><span style='font-size:8.0pt;font-family:"Calibri",sans-serif;
        mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:
        Aptos;color:#A5A5A5;mso-themecolor:accent3;mso-no-proof:yes'>USt.-IdNr.:
        DE357590630 - </span><span style='font-size:8.0pt;font-family:"Calibri",sans-serif;
        mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:
        Aptos;color:#0C509F;mso-no-proof:yes'><a><span style='mso-bidi-font-family:
        Aptos;color:#0C509F'>Datenschutzinformationen</span></a></span><span
        style='font-size:8.0pt;font-family:"Calibri",sans-serif;mso-ascii-theme-font:
        minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Aptos;
        color:#A5A5A5;mso-themecolor:accent3;mso-no-proof:yes'> - </span><span
        style='font-size:8.0pt;font-family:"Calibri",sans-serif;mso-ascii-theme-font:
        minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Aptos;
        color:#0C509F;mso-no-proof:yes'><a><span style='mso-bidi-font-family:Aptos;
        color:#0C509F'>AGB</span></a></span><span style='font-size:8.0pt;font-family:
        "Calibri",sans-serif;mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:
        minor-latin;mso-bidi-font-family:Aptos;color:#A5A5A5;mso-themecolor:accent3;
        mso-no-proof:yes'> - </span><span style='font-size:8.0pt;font-family:"Calibri",sans-serif;
        mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:
        Aptos;color:#0C509F;mso-no-proof:yes'><a><span style='mso-bidi-font-family:
        Aptos;color:#0C509F'>Impressum</span></a></span><span style='font-size:8.0pt;
        font-family:"Calibri",sans-serif;mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:
        minor-latin;mso-bidi-font-family:Aptos;color:#A5A5A5;mso-themecolor:accent3;
        mso-no-proof:yes'><br style='mso-special-character:line-break'>
        <![if !supportLineBreakNewLine]><br style='mso-special-character:line-break'>
        <![endif]><o:p></o:p></span></p>

        <p class=MsoNormal><span style='font-size:8.0pt;font-family:"Calibri",sans-serif;
        mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:
        Aptos;color:#FF5D5D;mso-no-proof:yes'>Der Inhalt dieser E-Mail und sämtliche
        Anhänge sind vertraulich und ausschließlich für den bezeichneten Empfänger
        bestimmt. <o:p></o:p></span></p>

        <p class=MsoNormal><span style='font-size:8.0pt;font-family:"Calibri",sans-serif;
        mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:
        Aptos;color:#FF5D5D;mso-no-proof:yes'>Sollten Sie nicht der bezeichnete
        Empfänger sein, bitten wir Sie, umgehend den Absender zu benachrichtigen und
        diese E-Mail zu löschen. <o:p></o:p></span></p>

        <p class=MsoNormal><span style='font-size:8.0pt;font-family:"Calibri",sans-serif;
        mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:
        Aptos;color:#FF5D5D;mso-no-proof:yes'>Jede Form der unautorisierten
        Veröffentlichung, Vervielfältigung und Weitergabe des Inhalts dieser E-Mail
        oder auch das Ergreifen von <o:p></o:p></span></p>

        <p class=MsoNormal><span style='font-size:8.0pt;font-family:"Calibri",sans-serif;
        mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:
        Aptos;color:#FF5D5D;mso-no-proof:yes'>Maßnahmen als Reaktion darauf sind
        unzulässig.</span><span style='font-family:"Calibri",sans-serif;mso-ascii-theme-font:
        minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Aptos'><o:p></o:p></span></p>

        </div>

        </body>

        </html>
        `,
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
    const NeueArtikel = await ctx.horst.warenlieferung.findMany({
      where: {
        angelegt: {
          gte: new Date(heute),
          lt: new Date(morgen),
        },
      },
    });
    const GelieferteArtikel = await ctx.horst.warenlieferung.findMany({
      where: {
        geliefert: {
          gte: new Date(heute),
          lt: new Date(morgen),
        },
      },
    });
    const NeuePreise = await ctx.horst.warenlieferung.findMany({
      where: {
        Preis: {
          gte: new Date(heute),
          lt: new Date(morgen),
        },
      },
    });

    let body = "";
    if (NeueArtikel.length > 0) body += "<h2>Neue Artikel:</h2>";
    NeueArtikel.forEach((elem) => {
      if (elem.Artikelnummer != null && elem.Name != null)
        body += `<b>${elem.Artikelnummer}</b>: ${elem.Name}<br>`;
    });

    if (NeueArtikel.length > 0 && GelieferteArtikel.length > 0) body += "<hr>";

    if (GelieferteArtikel.length > 0) body += "<h2>Gelieferte Artikel:</h2>";
    GelieferteArtikel.forEach((elem) => {
      if (elem.Artikelnummer != null && elem.Name != null)
        body += `<b>${elem.Artikelnummer}</b>: ${elem.Name}<br>`;
    });

    if (
      NeueArtikel.length > 0 &&
      GelieferteArtikel.length <= 0 &&
      NeuePreise.length > 0
    )
      body += "<hr>";
    if (GelieferteArtikel.length > 0 && NeuePreise.length > 0) body += "<hr>";

    if (NeuePreise.length > 0) body += "<h2>Preisänderungen</h2>";
    NeuePreise.forEach((elem) => {
      if (
        elem.Preis &&
        new Date(elem.Preis).toDateString() == new Date().toDateString() &&
        new Date(elem.angelegt).toDateString() !=
          new Date(elem.Preis).toDateString() &&
        elem.AlterPreis &&
        elem.NeuerPreis &&
        elem.AlterPreis != elem.NeuerPreis &&
        elem.AlterPreis.toFixed(2) != elem.NeuerPreis.toFixed(2)
      ) {
        body += `<b>${elem.Artikelnummer}</b>: ${
          elem.Name
        } - Alt: ${elem.AlterPreis.toFixed(
          2
        )}€ => Neu: ${elem.NeuerPreis.toFixed(2)}€ (${diff(
          elem.AlterPreis,
          elem.NeuerPreis
        )}€ differenz = ${diffProzent(
          elem.AlterPreis,
          elem.NeuerPreis
        )}) <br />`;
      }
    });

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
