import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { existsSync, readFileSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export const EinkaufBilderRouter = createTRPCRouter({
  upload: publicProcedure
    .input(
      z.object({
        file: z.string(),
        filetype: z.string(),
        mitarbeiterId: z.string(),
        imageNo: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      // Check if Upload folder exists
      const UploadPath = path.join(__dirname, "../../../../../public/Upload");
      if (!existsSync(UploadPath)) {
        // upload image
        await mkdir(UploadPath);
      }

      // save image to folder, create name and save name to database
      // const extension = path.extname(f.name);
      const fileName =
        input.mitarbeiterId + "_" + input.imageNo + "." + input.filetype;
      const filePath = path.join(UploadPath, fileName);
      await writeFile(filePath, readFileSync(input.file, "base64"));
      return fileName;
    }),
});
