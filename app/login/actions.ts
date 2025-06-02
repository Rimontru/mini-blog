"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { setLoginCookie } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LoginState } from "@/lib/definitions";

export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Faltan campos", field: "email" };
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return { error: "Usuario no encontrado", field: "email" };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return { error: "Contraseña inválida", field: "password" };
  }

  await setLoginCookie(user.id);
  redirect("/dashboard");
}
