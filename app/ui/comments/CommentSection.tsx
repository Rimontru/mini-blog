'use client';

import Link from 'next/link';
import { Post, User } from '@/lib/definitions';
import { storeComment } from './actions';
import { useActionState, useEffect, useState } from 'react';
import clsx from 'clsx';

interface CommentSectionProps {
	post: Post;
	user: User | null;
}

export default function CommentSection({ post, user }: CommentSectionProps) {
	const [error, setError] = useState('');
	const [state, formAction] = useActionState(storeComment, {
		error: '',
		field: '',
	});

	useEffect(() => {
		if (state.error) {
			setError(state.error);
		}
	}, [state]);

	return (
		<>
			<h2 className="text-xl font-semibold mb-2">Comments</h2>

			{post.comments.length > 0 && (
				<div className="flex flex-col gap-2 w-full h-96 overflow-y-auto">
					{post.comments.map((comment) => (
						<div
							key={comment.id}
							className="border-b border-gray-200 p-4"
						>
							<p>{comment.content}</p>
						</div>
					))}
				</div>
			)}

			{!user && (
				<p className="text-gray-600 mb-6">
					<Link
						className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
						href="/login"
					>
						Login
					</Link>{' '}
					to comment.
				</p>
			)}

			{user && (
				<form
					action={formAction}
					className="flex flex-col gap-2"
				>
					<input
						type="hidden"
						name="postId"
						value={post.id}
					/>
					<textarea
						name="content"
						placeholder="Write your comment..."
						className={clsx(
							'w-full border p-2 mb-2 rounded-md',
							error && 'border-red-500'
						)}
					/>
					{error && <p className="text-red-500">{error}</p>}
					<button
						type="submit"
						className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
					>
						Post
					</button>
				</form>
			)}
		</>
	);
}
