import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { DiceRoller } from "@prisma/client";
import { ApiError } from "next/dist/server/api-utils";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Roller from "~/components/Roller";
import type { diceGroupType, rollerType } from "~/components/typeDefs";
import { api } from "~/utils/api";

export default function Home() {
  const user = useUser();

  const ctx = api.useContext();

  const [rollerList, setRollerList] = useState<rollerType[]>([dummyRoller()]);

  const users = api.example.loadUserData.useQuery();

  function handleRollerChange(rollerIndex: number) {
    return (value: rollerType) => {
      const newRollerList = [...rollerList];
      newRollerList[rollerIndex] = { ...value };
      setRollerList(newRollerList);
    };
  }

  function addRoller() {
    const newRollerList = [...rollerList];
    newRollerList.push(dummyRoller());
    setRollerList(newRollerList);
  }

  function removeRoller(index: number) {
    const newRollerList = [...rollerList];
    newRollerList.splice(index, 1);
    setRollerList(newRollerList);
  }

  function dummyDiceGroup(dice: number, sides: number): diceGroupType {
    return {
      dice: dice,
      sides: sides,
      option: "none",
      X: 1,
      isPositive: true,
    };
  }

  function dummyRoller(): rollerType {
    return {
      label: "default",
      diceGroup: [dummyDiceGroup(1, 20), dummyDiceGroup(1, 4)],
    };
  }

  return (
    <>
      <Head>
        <title>Perry&apos;s Dice Roller</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-2">
        <div className="absolute right-0 top-0">
          {!user.isSignedIn && <SignInButton />}
          {user.isSignedIn && <SignOutButton />}
        </div>
        {rollerList.map((value, index) => (
          <div
            key={index}
            className="relative justify-between border border-black"
          >
            <button
              className="absolute right-0 top-0 m-2"
              onClick={(e) => removeRoller(index)}
            >
              X
            </button>
            <br></br>
            <Roller
              roller={value}
              handleRollerChange={handleRollerChange(index)}
            ></Roller>
          </div>
        ))}
        {rollerList.length < 10 && (
          <button className="m-2" onClick={addRoller}>
            +
          </button>
        )}
      </main>
    </>
  );
}
