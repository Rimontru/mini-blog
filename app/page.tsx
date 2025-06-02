import Link from 'next/link';
import { Post } from '@/lib/definitions';
import { prisma } from '@/lib/prisma';
import Header from '@/app/ui/Header';

export default async function Home() {
	const posts: Post[] = await prisma.post.findMany({
		include: {
			author: true,
			comments: {
				include: {
					author: true,
				},
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className="w-full h-11/12 border-b border-gray-200 p-20 flex flex-col gap-9">
				{posts &&
					posts.map((post) => (
						<Link
							key={post.id}
							href={`/blog/${post.id}`}
							className="w-full h-1/3 border border-gray-200 flex flex-col items-center justify-center rounded-2xl hover:shadow-neutral-800 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
						>
							<h1 className="text-2xl font-bold">{post.title}</h1>
							<p className="text-sm text-gray-500">{post.author.name}</p>
						</Link>
					))}
			</div>
		</div>
	);
}
