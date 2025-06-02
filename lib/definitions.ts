export type User = {
	id: number;
	name: string;
	email: string;
	password: string;
};

export type LoginFormData = Pick<User, 'email' | 'password'>;

export type ErrorState = {
	error: string;
	field: string;
};

export type RegisterFormData = Pick<User, 'name' | 'email' | 'password'>;

export type Post = {
	id: number;
	title: string;
	content: string;
	slug: string;
	authorId: number;
	author: User;
	comments: Comment[];
	createdAt: Date;
};

export type Comment = {
	id: number;
	content: string;
	postId: number;
	authorId: number;
	author: User;
	createdAt: Date;
};

export type NewComment = Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>;
