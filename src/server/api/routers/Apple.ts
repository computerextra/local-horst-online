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
    }),
  getLatestFirmware: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const identifier = input;
      try {
        const res = await axios.get<{ firmwares: { url: string, version: string }[] }>(
          `https://api.ipsw.me/v4/device/${identifier}`
        );
        const fw = {
          url: res.data?.firmwares[0]?.url,
          version: res.data?.firmwares[0]?.version,
        };
        return fw;
      } catch (_) {
        return "Fehlerhafte Eingabe"
      }
    })
});
