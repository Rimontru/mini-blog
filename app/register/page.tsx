'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { register } from './actions';
import { ErrorState, RegisterFormData } from '@/lib/definitions';
import { useEffect, useState, useActionState } from 'react';

const initialState: ErrorState = {
	error: '',
	field: '',
};

export default function Register() {
	const [state, formAction] = useActionState(register, initialState);
	const [nameError, setNameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [formValues, setFormValues] = useState<RegisterFormData>({
		name: '',
		email: '',
		password: '',
	});

	useEffect(() => {
		if (state.error) {
			if (state.field === 'name') {
				setEmailError('');
				setPasswordError('');
				setNameError(state.error);
			}
			if (state.field === 'email') {
				setNameError('');
				setPasswordError('');
				setEmailError(state.error);
			}
			if (state.field === 'password') {
				setNameError('');
				setEmailError('');
				setPasswordError(state.error);
			}
		}
	}, [state]);

	const handleSubmit = async (formData: FormData) => {
		setFormValues({
			name: formData.get('name') as string,
			email: formData.get('email') as string,
			password: formData.get('password') as string,
		});
		return formAction(formValues);
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<form
				action={handleSubmit}
				className="max-w-md mx-auto mt-10 flex flex-col gap-4"
			>
				<h1 className="text-2xl font-bold">Sign up</h1>
				<input
					type="text"
					name="name"
					value={formValues.name}
					onChange={(e) =>
						setFormValues((prev) => ({ ...prev, name: e.target.value }))
					}
					placeholder="Name"
					className={clsx(
						'border border-gray-300 rounded-md p-2',
						nameError ? 'border-red-500' : 'border-gray-300'
					)}
				/>
				{nameError && <span className="text-red-500 text-sm">{nameError}</span>}
				<input
					type="email"
					name="email"
					value={formValues.email}
					onChange={(e) =>
						setFormValues((prev) => ({ ...prev, email: e.target.value }))
					}
					placeholder="Email"
					className={clsx(
						'border border-gray-300 rounded-md p-2',
						emailError ? 'border-red-500' : 'border-gray-300'
					)}
				/>
				{emailError && (
					<span className="text-red-500 text-sm">{emailError}</span>
				)}
				<input
					type="password"
					name="password"
					value={formValues.password}
					onChange={(e) =>
						setFormValues((prev) => ({ ...prev, password: e.target.value }))
					}
					placeholder="Password"
					className={clsx(
						'border border-gray-300 rounded-md p-2',
						passwordError ? 'border-red-500' : 'border-gray-300'
					)}
				/>
				{passwordError && (
					<span className="text-red-500 text-sm">{passwordError}</span>
				)}
				<button
					type="submit"
					className="bg-blue-500 text-white p-2 rounded-md"
				>
					Register
				</button>
				<Link href="/login">Already have an account? Login</Link>
				<Link href="/">Go back</Link>
			</form>
		</div>
	);
}
