import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import axios from "axios";

export const AppleRouter = createTRPCRouter({
  getAppleModel: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const model = input;
      try {
        const res = await axios.get<{ identifier: string }>(
          `https://api.ipsw.me/v4/model/${model}`
        );
        return res.data.identifier;
      } catch (_) {
        return "Fehlerhafte Eingabe!";
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

      // const res = await fetch(`https://api.ipsw.me/v4/model/${model}`)
      //   .then((response) => response.json())
      //   .then((data) => {
      //     // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      //     return data;
      //   });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      // if (res.identifier) {
      //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      //   return String(res.identifier);
      // } else {
      //   return "Fehlerhafte Eingabe";
      // }
    }),
});
