import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const KabelwandRouter = createTRPCRouter({
  getKabelwand: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.kabel.findMany({
      include: {
        Input: true,
        Output: true,
        Laenge: true,
        Farbe: true,
        Fach: true,
        Reihe: true,
        Regal: true,
      },
      orderBy: {
        Artikelnummer: "asc",
      },
    });
  }),
  getOneKabel: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.kabel.findUnique({
        where: {
          id: input,
        },
        include: {
          Input: true,
          Output: true,
          Laenge: true,
          Farbe: true,
          Fach: true,
          Reihe: true,
          Regal: true,
        },
      });
    }),
  createKabel: publicProcedure
    .input(
      z.object({
        Name: z.string(),
        Artikelnummer: z.string(),
        inputId: z.string(),
        outputId: z.string(),
        laengeId: z.string(),
        farbeId: z.string(),
        fachId: z.string(),
        reiheId: z.string(),
        regalId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.kabel.create({
        data: {
          ...input,
        },
      });
    }),
  updateKabel: publicProcedure
    .input(
      z.object({
        id: z.string(),
        Name: z.string(),
        Artikelnummer: z.string(),
        inputId: z.string(),
        outputId: z.string(),
        laengeId: z.string(),
        farbeId: z.string(),
        fachId: z.string(),
        reiheId: z.string(),
        regalId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.kabel.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
    }),
  deleteKabel: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.kabel.delete({
        where: {
          id: input,
        },
      });
    }),
  // Inputs
  getInputs: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.input.findMany({
      orderBy: {
        Name: "asc",
      },
    });
  }),
  getInput: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.prisma.input.findUnique({
      where: {
        id: input,
      },
    });
  }),
  createInput: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.input.create({
        data: {
          Name: input,
        },
      });
    }),
  updateInput: publicProcedure
    .input(
      z.object({
        id: z.string(),
        Name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.input.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
    }),
  deleteInput: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.input.delete({
        where: {
          id: input,
        },
      });
    }),
  // Outputs
  getOutputs: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.output.findMany({
      orderBy: {
        Name: "asc",
      },
    });
  }),
  getOutput: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.prisma.output.findUnique({
      where: {
        id: input,
      },
    });
  }),
  createOutput: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.output.create({
        data: {
          Name: input,
        },
      });
    }),
  updateOutput: publicProcedure
    .input(
      z.object({
        id: z.string(),
        Name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.output.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
    }),
  deleteOutput: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.output.delete({
        where: {
          id: input,
        },
      });
    }),
  // Längen
  getLengths: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.laenge.findMany({
      orderBy: {
        Name: "asc",
      },
    });
  }),
  getLength: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.prisma.laenge.findUnique({
      where: {
        id: input,
      },
    });
  }),
  createLength: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.laenge.create({
        data: {
          Name: input,
        },
      });
    }),
  updateLength: publicProcedure
    .input(
      z.object({
        id: z.string(),
        Name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.laenge.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
    }),
  deleteLength: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.laenge.delete({
        where: {
          id: input,
        },
      });
    }),
  // Farben
  getColors: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.farbe.findMany({
      orderBy: {
        Name: "asc",
      },
    });
  }),
  getColor: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.prisma.farbe.findUnique({
      where: {
        id: input,
      },
    });
  }),
  createColor: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.farbe.create({
        data: {
          Name: input,
        },
      });
    }),
  updateColor: publicProcedure
    .input(
      z.object({
        id: z.string(),
        Name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.farbe.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
    }),
  deleteColor: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.farbe.delete({
        where: {
          id: input,
        },
      });
    }),
  // Fächer
  getCompartments: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.fach.findMany({
      orderBy: {
        Name: "asc",
      },
    });
  }),
  getCompartment: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.fach.findUnique({
        where: {
          id: input,
        },
      });
    }),
  createCompartment: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.fach.create({
        data: {
          Name: input,
        },
      });
    }),
  updateCompartment: publicProcedure
    .input(
      z.object({
        id: z.string(),
        Name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.fach.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
    }),
  deleteCompartment: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.fach.delete({
        where: {
          id: input,
        },
      });
    }),
  // Reihen
  getRows: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.reihe.findMany({
      orderBy: {
        Name: "asc",
      },
    });
  }),
  getRow: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.prisma.reihe.findUnique({
      where: {
        id: input,
      },
    });
  }),
  createRow: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.reihe.create({
        data: {
          Name: input,
        },
      });
    }),
  updateRow: publicProcedure
    .input(
      z.object({
        id: z.string(),
        Name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.reihe.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
    }),
  deleteRow: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.reihe.delete({
        where: {
          id: input,
        },
      });
    }),
  // Regale
  getShelfs: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.regal.findMany({
      orderBy: {
        Name: "asc",
      },
    });
  }),
  getShelf: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.prisma.regal.findUnique({
      where: {
        id: input,
      },
    });
  }),
  createShelf: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.regal.create({
        data: {
          Name: input,
        },
      });
    }),
  updateShelf: publicProcedure
    .input(
      z.object({
        id: z.string(),
        Name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.regal.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
    }),
  deleteShelf: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.regal.delete({
        where: {
          id: input,
        },
      });
    }),
});
