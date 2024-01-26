import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import { useState } from "react";
import Roller from "~/components/Roller";
import type { diceGroupType, rollerType } from "~/components/typeDefs";
import { api } from "~/utils/api";

export default function Home() {
  const user = useUser();

  const [rollerList, setRollerList] = useState<rollerType[]>([dummyRoller()]);
  const [haveRollersChanged, setHaveRollersChanged] = useState<boolean>(false);

  const { refetch } = api.example.loadUserData.useQuery(undefined, {
    enabled: false,
  });

  const { mutate: saveData } = api.example.saveUserData.useMutation();

  function saveToDatabase() {
    if (!haveRollersChanged) return;

    saveData(rollerList);
    setHaveRollersChanged(false);
  }

  async function loadFromDatabase() {
    if (!haveRollersChanged) return;
    const newRollers = (await refetch()).data;
    if (newRollers) setRollerList(newRollers);
    setHaveRollersChanged(false);
  }

  function handleRollerChange(rollerIndex: number) {
    return (value: rollerType) => {
      const newRollerList = [...rollerList];
      newRollerList[rollerIndex] = { ...value };
      setRollerList(newRollerList);
      setHaveRollersChanged(true);
    };
  }

  function addRoller() {
    const newRollerList = [...rollerList];
    newRollerList.push(dummyRoller());
    setRollerList(newRollerList);
    setHaveRollersChanged(true);
  }

  function removeRoller(index: number) {
    const newRollerList = [...rollerList];
    newRollerList.splice(index, 1);
    setRollerList(newRollerList);
    setHaveRollersChanged(true);
  }

  function dummyDiceGroup(dice: number, sides: number): diceGroupType {
    return {
      dice: dice,
      sides: sides,
      option: "none",
      X: 1,
      isPositive: true,
      doubleOnCrit: false,
    };
  }

  function dummyRoller(): rollerType {
    return {
      label: "Attack with sword",
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
          <br></br>
          <button
            className=""
            onClick={() => {
              loadFromDatabase().catch(() => {
                console.log("load failed");
              });
            }}
          >
            Load
          </button>
          <br></br>
          <button className="" onClick={() => saveToDatabase()}>
            Save
          </button>
        </div>
        {rollerList.map((value, index) => (
          <div
            key={index}
            className="relative justify-between border border-black"
          >
            <button
              className="absolute right-0 top-0 m-2"
              onClick={() => removeRoller(index)}
            >
              X
            </button>
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
