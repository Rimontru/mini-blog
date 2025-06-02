import { cookies } from "next/headers";
import { prisma } from "./prisma";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  if (!userId) return null;
  return await prisma.user.findUnique({ where: { id: Number(userId) } });
}

export async function setLoginCookie(userId: number) {
  const cookieStore = await cookies();
  cookieStore.set("userId", userId.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearLoginCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("userId");
}
