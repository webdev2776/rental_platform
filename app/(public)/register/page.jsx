"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";

const RegisterPage = () => {
  const { data: session } = useSession();

  if (session) redirect("/dashboard");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") ?? "/";

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl });
    } catch (error) {
      console.error("Google Sign-in failed:", error);
      // Handle sign-in error (e.g., show a message to the user)
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl,
      });
    } catch (error) {
      console.error("Sign-in failed:", error);
      // Handle sign-in error (e.g., show a message to the user)
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-sm mx-auto">
      <h1 className="text-2xl font-semibold">Sign In</h1>

      {/* Sign In with Credentials */}
      <form onSubmit={handleSignIn} className="flex flex-col gap-3">
        <label htmlFor="email" className="flex flex-col gap-1">
          Email
          <input
            type="email"
            name="email"
            id="email"
            className="p-2 border rounded"
            required
          />
        </label>
        <label htmlFor="password" className="flex flex-col gap-1">
          Password
          <input
            type="password"
            name="password"
            id="password"
            className="p-2 border rounded"
            required
          />
        </label>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign In
        </button>
      </form>

      {/* Sign In with Google */}
      <div className="flex flex-col gap-2">
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
