import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";
import Roller from "~/components/Roller";
import { api } from "~/utils/api";

export default function Home() {
  const user = useUser();

  return (
    <>
      <Head>
        <title>T3 App Test</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {!user.isSignedIn && <SignInButton />}
        {user.isSignedIn && <SignOutButton />}
        <Roller />
      </main>
    </>
  );
}
