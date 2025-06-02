import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Post, User } from '@/lib/definitions';
import Header from '@/app/ui/Header';
import { getCurrentUser } from '@/lib/auth';
import CommentSection from '@/app/ui/comments/CommentSection';

export default async function PostPage({ params }: { params: { slug: string } }) {
	const user: User | null = await getCurrentUser();
	const { slug } = await params;
	const postId = Number(slug);

	const post: Post | null = await prisma.post.findUnique({
		where: { id: postId },
		include: {
			author: true,
			comments: {
				include: { author: true },
				orderBy: { createdAt: 'desc' },
			},
		},
	});

	if (!post) return notFound();

	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className="w-full h-11/12 border-b border-gray-200 p-20 flex flex-col gap-9">
				<h1 className="text-3xl font-bold mb-4">{post.title}</h1>
				<p className="mb-6 whitespace-pre-wrap">{post.content}</p>

				<hr className="my-6" />
				<CommentSection
					post={post}
					user={user}
				/>
			</div>
		</div>
	);
}
