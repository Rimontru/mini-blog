'use server';

import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { setLoginCookie } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ErrorState, LoginFormData, User } from '@/lib/definitions';

export async function login(
	prevState: ErrorState,
	formData: LoginFormData
): Promise<ErrorState> {
	const email = formData.email;
	const password = formData.password;

	if (!email) {
		return { error: 'Email is required', field: 'email' };
	}

	if (!password) {
		return { error: 'Password is required', field: 'password' };
	}

	const user: User | null = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (!user) {
		return { error: 'User not found', field: 'email' };
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		return { error: 'Invalid password', field: 'password' };
	}

	await setLoginCookie(user.id as number);
	redirect('/dashboard');
}
