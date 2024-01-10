import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { ApiError } from "next/dist/server/api-utils";
import Head from "next/head";
import Link from "next/link";
import Roller from "~/components/Roller";
import type { Dicegroup } from "~/components/typeDefs";
import { api } from "~/utils/api";

export default function Home() {
  const user = useUser();

  const ctx = api.useContext();

  //   const { data: users, isLoading } = api.example.getAllUsers.useQuery();

  //   const { data: dicegroups, isLoading: diceGroupIsLoading } =
  //     api.example.getAllDiceGroups.useQuery();

  //   const { data: count, isLoading: countIsLoading } =
  //     api.example.countDatabaseRows.useQuery();

  const { mutate: addUser, isLoading: isPosting } =
    api.example.addUser.useMutation({
      onSuccess: () => {
        void ctx.example.getAllUsers.invalidate();
        void ctx.example.countDatabaseRows.invalidate();
      },
    });

  const { mutate: addRoller, isLoading: diceGroupIsPosting } =
    api.example.addRoller.useMutation({
      onSuccess: () => {
        void ctx.example.getAllDiceRollers.invalidate();
        void ctx.example.getAllDiceGroups.invalidate();
        void ctx.example.countDatabaseRows.invalidate();
      },
    });

  const dummyDicegroup = {
    dice: 1,
    sides: 2,
    option: "none",
    X: 0,
    isPositive: true,
  };

  return (
    <>
      <Head>
        <title>Perry&apos;s Dice Roller</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {!user.isSignedIn && <SignInButton />}
        {user.isSignedIn && <SignOutButton />}
        <div>
          {/* {diceGroupIsLoading || diceGroupIsPosting
            ? "Loading"
            : dicegroups?.map((value, index) => (
                <div key={index}>{JSON.stringify(value, null, 2)}</div>
              ))} */}
          {/* {countIsLoading ? "loading" : count} */}
        </div>
        <button
          type="button"
          className="btn btn-blue m-2"
          onClick={(e) =>
            console.log(
              addRoller({
                label: "new roller",
                diceGroups: [dummyDicegroup, dummyDicegroup],
              })
            )
          }
        >
          Add Dicegroup
        </button>
        <Roller />
      </main>
    </>
  );
}
