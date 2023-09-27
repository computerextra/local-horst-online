import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const AppleRouter = createTRPCRouter({
  getAppleModel: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const model = input;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const res = await fetch(`https://api.ipsw.me/v4/model/${model}`)
        .then((response) => response.json())
        .then((data) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return data;
        });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return res;
    }),
});
