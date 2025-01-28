import Link from "next/link";
import React from "react";

const SignInButton = () => {
  return (
    <Link href="/api/auth/signin">
      <button>Sign In</button>
    </Link>
  );
};

export default SignInButton;
