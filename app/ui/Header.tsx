import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { logout } from '@/lib/user';

export default async function Header() {
	const user = await getCurrentUser();

	return (
		<div className="w-full h-1/12 border-b border-gray-200 flex items-center justify-between">
			<div className="w-1/3 h-full flex items-center justify-center">
				<Link
					href="/"
					className="text-2xl font-bold"
				>
					Fakebook
				</Link>
			</div>
			{user && (
				<div className="w-1/3 h-full flex items-center justify-center">
					<Link
						href="/dashboard"
						className="text-gray-500"
					>
						Dear, {user.name}
					</Link>
				</div>
			)}
			{user && (
				<div className="w-1/3 h-full flex items-center justify-center">
					<form action={logout}>
						<button
							type="submit"
							className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px] cursor-pointer"
						>
							Logout
						</button>
					</form>
				</div>
			)}
			{!user && (
				<div className="w-1/3 h-full flex items-center justify-center">
					<div className="flex justify-center w-full gap-4">
						<Link
							className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
							href="/login"
						>
							Login
						</Link>
						<Link
							className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
							href="/register"
						>
							Register
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}
