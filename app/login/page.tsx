"use client";

import { login } from "./actions";
import { useEffect, useState, useActionState } from "react";

const initialState = {
  error: "",
  field: "",
};

export default function Login() {
  const [state, formAction] = useActionState(login, initialState);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (state.error) {
      if (state.field === "email") {
        setEmailError(state.error);
        setPasswordError("");
      } else if (state.field === "password") {
        setPasswordError(state.error);
        setEmailError("");
      }
    }
  }, [state]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        action={formAction}
        className="max-w-md mx-auto mt-10 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold">Login</h1>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            name="email"
            placeholder="Email"
            className={`border rounded-md p-2 ${
              emailError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {emailError && (
            <span className="text-red-500 text-sm">{emailError}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`border rounded-md p-2 ${
              passwordError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {passwordError && (
            <span className="text-red-500 text-sm">{passwordError}</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
