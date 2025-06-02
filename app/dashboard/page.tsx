import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Post, User } from '@/lib/definitions';
import { prisma } from '@/lib/prisma';
import Header from '@/app/ui/Header';

export default async function Dashboard() {
	const user: User | null = await getCurrentUser();
	if (!user) {
		redirect('/login');
	}

	const posts: Post[] = await prisma.post.findMany({
		where: {
			authorId: user.id,
		},
		include: {
			author: true,
			comments: {
				include: {
					author: true,
				},
			},
		},
	});

	return (
		<div className="flex flex-col h-screen">
			<Header />

			{/* <div className="w-full h-11/12 border-b border-gray-200 p-20 flex flex-col gap-9">
				<div className="w-full h-1/3 border border-gray-200 flex items-center justify-center rounded-2xl hover:shadow-neutral-800 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
					<h1 className="text-2xl font-bold">Posts</h1>
				</div>
			</div> */}
		</div>
	);
}
