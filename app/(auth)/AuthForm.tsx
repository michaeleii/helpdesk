"use client";

import { useState } from "react";

type AuthFormProps = {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => Promise<void>;
};

export default function AuthForm({ handleSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form onSubmit={(e) => handleSubmit(e, email, password)}>
      <label htmlFor="email">
        <span>Email:</span>
      </label>
      <input
        name="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
      <label htmlFor="password">
        <span>Password:</span>
      </label>
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />
      <button className="btn-primary">Submit</button>
    </form>
  );
}
