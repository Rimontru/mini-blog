import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { logout } from "./actions";

export default async function Dashboard() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return (
    <div className="flex flex-col h-screen">
      <div className="w-full h-1/12 border-b border-gray-200 flex items-center justify-between">
        <div className="w-1/3 h-full flex items-center justify-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="w-1/3 h-full flex items-center justify-center">
          <p className="text-gray-500">{user.name}</p>
        </div>
        <div className="w-1/3 h-full flex items-center justify-center">
          <form action={logout}>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
