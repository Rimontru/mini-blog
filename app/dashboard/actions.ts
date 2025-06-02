"use server";

import { redirect } from "next/navigation";
import { clearLoginCookie } from "@/lib/auth";

export async function logout() {
  await clearLoginCookie();
  redirect("/");
}
