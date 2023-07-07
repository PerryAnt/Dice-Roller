import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const user = useUser();

  return (
    <>
      <Head>
        <title>T3 App Test</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {!user.isSignedIn && <SignInButton />}
        {!user.isSignedIn && <SignUpButton />}
        {user.isSignedIn && <SignOutButton />}
      </main>
    </>
  );
}
