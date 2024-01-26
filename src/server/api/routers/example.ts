import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { zRoller } from "src/components/typeDefs";
import type { diceGroupType, rollerType } from "src/components/typeDefs"


export const exampleRouter = createTRPCRouter({
    saveUserData: privateProcedure.input(z.array(zRoller)).mutation(async ({ctx, input }) => {
        const operations = []
        //create user if it does not already exist
        if(!await ctx.prisma.user.findUnique({where:{userId: ctx.userId}}))
            operations.push( ctx.prisma.user.create({data: {userId: ctx.userId},}))

        //delete existing diceRollers and diceGroups
        const existingRollers = await ctx.prisma.diceRoller.findMany({where:{userId: ctx.userId}})
        for(const roller of existingRollers){
            operations.push( ctx.prisma.diceGroup.deleteMany({where:{diceRollerId: roller.rollerId}}))
        }
        operations.push( ctx.prisma.diceRoller.deleteMany({where:{userId: ctx.userId}}))

        //create new diceRollers and diceGroups
        let indexInUser  = 0
        for (const roller of input){
            operations.push( 
                ctx.prisma.diceRoller.create({
                    data: {
                        label: roller.label, 
                        userId: ctx.userId, 
                        indexInUser: indexInUser, 
                        DiceGroup: {
                            create: roller.diceGroup.map((value, index) =>{ return {...value, indexInRoller: index }})
                          }
                    }
                })
                )
            indexInUser++
        }

        await ctx.prisma.$transaction(operations)
        }),

    loadUserData: privateProcedure.query(async ({ ctx }) => {
        const user = await ctx.prisma.user.findUnique({
            where: {
                userId: ctx.userId
            },
            include: {
                DiceRoller: {
                    orderBy: {indexInUser: 'asc'},
                    include: {
                        DiceGroup: {orderBy: {indexInRoller: 'asc'},},
                    }
                }
            }
        })
        const output = [] as rollerType[]
        if(user?.DiceRoller){
            for (const roller of user?.DiceRoller)
            {
                const newRoller = {label: roller.label, diceGroup: [] as diceGroupType[]}

                for (const diceGroup of roller.DiceGroup){
                    const {diceRollerId, indexInRoller, ...newDiceGroup} = diceGroup
                    newRoller.diceGroup.push(newDiceGroup)
                }
                output.push(newRoller)
                
            }
        }
        return output;
    }),

});