import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { ApiError } from "next/dist/server/api-utils";
import Head from "next/head";
import Link from "next/link";
import Roller from "~/components/Roller";
import { api } from "~/utils/api";

export default function Home() {
  const user = useUser();

  const ctx = api.useContext();

  const { data: users, isLoading } = api.example.getAll.useQuery();

  const { mutate, isLoading: isPosting } = api.example.addUser.useMutation({
    onSuccess: () => {
      void ctx.example.getAll.invalidate();
    },
  });

  function addUser() {
    mutate();
  }

  return (
    <>
      <Head>
        <title>TPerry's Dice Roller</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {!user.isSignedIn && <SignInButton />}
        {user.isSignedIn && <SignOutButton />}
        <div>
          {isLoading || isPosting
            ? "Loading"
            : users?.map((value, index) => (
                <div key={index}>{value.userId}</div>
              ))}
        </div>
        <Roller />
      </main>
    </>
  );
}
