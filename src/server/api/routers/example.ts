import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
    addUser: publicProcedure.mutation(async ({ ctx }) => {
        return await ctx.prisma.user.create({data: {}});
      }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany();
  }),
});
