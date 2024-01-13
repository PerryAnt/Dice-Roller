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

  return (
    <>
      <Head>
        <title>Perry&apos;s Dice Roller</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {!user.isSignedIn && <SignInButton />}
        {user.isSignedIn && <SignOutButton />}
        <Roller />
      </main>
    </>
  );
}
