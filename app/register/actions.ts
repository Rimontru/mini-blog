"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { setLoginCookie } from "@/lib/auth";

export async function register(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const hashedPassword = await bcrypt.hash(password, 10);

  if (!name || !email || !password) throw new Error("Missing required fields");

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  await setLoginCookie(user.id);
  redirect("/dashboard");
}
