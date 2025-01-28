"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/register"); // Redirect to register if the user is not authenticated
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>; // Show a loading state while session is being fetched
  }

  return <div>DashboardPage</div>;
};

export default DashboardPage;
