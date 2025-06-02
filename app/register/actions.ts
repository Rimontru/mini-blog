'use server';

import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { setLoginCookie } from '@/lib/auth';
import { ErrorState, RegisterFormData, User } from '@/lib/definitions';

export async function register(
	prevState: ErrorState,
	formData: RegisterFormData
): Promise<ErrorState> {
	const name = formData.name;
	const email = formData.email;
	const password = formData.password;
	const hashedPassword = await bcrypt.hash(password, 10);

	if (!name) {
		return { error: 'Name is required', field: 'name' };
	}

	if (!email) {
		return { error: 'Email is required', field: 'email' };
	}

	if (!password) {
		return { error: 'Password is required', field: 'password' };
	}

	if (password.length < 6) {
		return {
			error: 'Password must be at least 6 characters long',
			field: 'password',
		};
	}

	const user: User = await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});

	await setLoginCookie(user.id as number);
	redirect('/dashboard');
}
