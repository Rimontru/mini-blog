'use server';

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { User, ErrorState } from '@/lib/definitions';

export async function storeComment(
	prevState: ErrorState,
	formData: FormData
): Promise<ErrorState> {
	const content = formData.get('content') as string;
	const postId = Number(formData.get('postId'));

	const user: User | null = await getCurrentUser();
	if (!user) redirect('/login');

	if (!content) {
		return { error: 'Comment is required', field: 'content' };
	}

	await prisma.comment.create({
		data: {
			content,
			postId,
			authorId: user.id,
		},
	});

	const post = await prisma.post.findUnique({ where: { id: postId } });
	if (!post) {
		return { error: 'Post not found', field: 'postId' };
	}

	redirect(`/blog/${post.id}`);
}
