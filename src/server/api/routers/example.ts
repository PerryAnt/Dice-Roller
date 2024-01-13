import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { zDicegroup, zRoller } from "src/components/typeDefs"

export const exampleRouter = createTRPCRouter({
    saveUserData: publicProcedure.input(z.array(zRoller)).mutation(async ({ctx, input }) => {
        let indexInUser  = (await ctx.prisma.diceRoller.findMany({where: {userId: "0"}})).length
        for (const roller of input){
            await ctx.prisma.diceRoller.create({
                    data: {
                        label: roller.label, 
                        userId: "0", 
                        indexInUser: indexInUser, 
                        DiceGroup: {
                            create: roller.diceGroup.map((value, index) =>{ return {...value, indexInRoller: index }})
                          }
                    }
                })
            indexInUser++
        }

        }),

    loadUserData: publicProcedure.query(async ({ ctx }) => {
        const user = await ctx.prisma.user.findUnique({
            where: {
                userId: "0"
            },
            include: {
                DiceRoller: {
                    include: {
                        DiceGroup: true
                    }
                }
            }
        })
        return user;
    }),

});