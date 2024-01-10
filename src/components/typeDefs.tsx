import { z } from "zod";

export type Dicegroup = {
  dice: number;
  sides: number;
  option: string;
  X: number;
  isPositive: boolean;
};

export const zDicegroup = z.object({
  dice: z.number(),
  sides: z.number(),
  option: z.string(),
  X: z.number(),
  isPositive: z.boolean(),
});

export const zRoller = z.object({
  label: z.string(),
  diceGroups: z.array(zDicegroup),
});
