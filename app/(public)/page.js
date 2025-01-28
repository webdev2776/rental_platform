"use client";

import SignInButton from "@/components/SignInButton";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <p>
          {session.user.name} <br />
          <Link href="/api/auth/signout">Sign Out</Link>
        </p>
      ) : (
        <SignInButton />
      )}
    </div>
  );
}
