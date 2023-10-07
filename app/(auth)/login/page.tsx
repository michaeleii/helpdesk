"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

import AuthForm from "../AuthForm";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formError, setFormError] = useState("");
  const router = useRouter();
  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => {
    e.preventDefault();
    setFormError("");
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    error ? setFormError(error.message) : router.push("/");
  };
  return (
    <main>
      <h2 className="text-center">Log in</h2>
      <AuthForm handleSubmit={handleLogin} />
      {formError && <p className="error">{formError}</p>}
      <p className="text-center my-5">or</p>
      <form
        className=""
        onSubmit={(e) => handleLogin(e, "michael@test.com", "michael123$")}
      >
        <button className="btn-primary mx-auto">Demo User</button>
      </form>
    </main>
  );
}
