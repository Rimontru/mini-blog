'use server';

import { getCurrentUser, clearLoginCookie } from './auth';
import { redirect } from 'next/navigation';

export async function getUser() {
	const user = await getCurrentUser();
	if (!user) return null;
	return user;
}

export async function logout() {
	await clearLoginCookie();
	redirect('/');
}
