import { existsSync } from "fs";
import { appendFile, mkdir, readFile, unlink } from "fs/promises";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const command = "PowerShell.exe -Command (Copy-Item -Path ";
const origin = "'V:\\Compex Signaturen\\Signatures\\";
const dest =
  "' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";

export const SignatureRouter = createTRPCRouter({
  download: publicProcedure
    .input(
      z.object({
        name: z.string(),
        mail: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      const dir = "/upload/";
      const file = dir + "install.bat";
      if (!existsSync(dir)) {
        await mkdir(dir);
      }
      if (existsSync(file)) {
        await unlink(file);
      }

      const lines = [
        `${command}${origin}${input.name} (${input.mail})-Dateien${dest}`,
        `${command}${origin}${input.name} (${input.mail}).htm${dest}`,
        `${command}${origin}${input.name} (${input.mail}).rft${dest}`,
        `${command}${origin}${input.name} (${input.mail}).txt${dest}`,
      ];

      for (const line of lines) {
        await appendFile(file, line);
      }
      const data = await readFile(file);
      const dataString = data.toString("base64");
      return dataString;
    }),
});
