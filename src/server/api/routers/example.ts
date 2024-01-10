import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { zDicegroup, zRoller } from "src/components/typeDefs"

export const exampleRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
        return {
            greeting: `Hello ${input.text}`,
        };
    }),

    addUser: publicProcedure.mutation(async ({ ctx }) => {
        return await ctx.prisma.user.create({data: {userId: "0"}});
    }),

    addDiceGroup: publicProcedure.input(zDicegroup).mutation(async ({ ctx, input }) => {
        return await ctx.prisma.diceGroup.create({data: {...input, diceRollerId:"0", indexInRoller:0}});
    }),

    getAllUsers: publicProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.user.findMany();
    }),

    getAllDiceRollers: publicProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.diceRoller.findMany();
    }),

    getAllDiceGroups: publicProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.diceGroup.findMany();
    }),

    countDatabaseRows:  publicProcedure.query(async ({ ctx }) => {
        let count = (await ctx.prisma.diceGroup.findMany()).length;
        count += (await ctx.prisma.diceRoller.findMany()).length;
        count += (await ctx.prisma.user.findMany()).length;
        return count;
    }),

    addRoller: publicProcedure.input(zRoller).mutation(async ({ ctx, input }) => {
        const indexInUser = (await ctx.prisma.diceRoller.findMany({where: {userId: "0"}})).length
        const roller = await ctx.prisma.diceRoller.create({data: {label: input.label, userId: "0", indexInUser: indexInUser}})
        
        let indexInRoller = 0;
        for(const group of input.diceGroups){
            await ctx.prisma.diceGroup.create({data: {...group, indexInRoller: indexInRoller, diceRollerId: roller.rollerId}});
            indexInRoller++;
        }

        return
    }),

});
