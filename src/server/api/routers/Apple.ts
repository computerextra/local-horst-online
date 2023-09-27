import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const AppleRouter = createTRPCRouter({
  getAppleModel: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const model = input;
      const res = await fetch(`https://api.ipsw.me/v4/model/${model}`);
      const json: { identifier: string } = await res.json();
      return json.identifier;
    }),
});
