import { z } from "zod";

export type diceGroupType = {
  dice: number;
  sides: number;
  option: string;
  X: number;
  isPositive: boolean;
  doubleOnCrit: boolean;
};

export type rollerType = {
  label: string;
  diceGroup: diceGroupType[];
};

export const zDicegroup = z.object({
  dice: z.number(),
  sides: z.number(),
  option: z.string(),
  X: z.number(),
  isPositive: z.boolean(),
  doubleOnCrit: z.boolean(),
});

export const zRoller = z.object({
  label: z.string(),
  diceGroup: z.array(zDicegroup),
});
