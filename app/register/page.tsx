import { register } from "./actions";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        action={register}
        className="max-w-md mx-auto mt-10 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold">Sign up</h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="border border-gray-300 rounded-md p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Register
        </button>
      </form>
    </div>
  );
}
