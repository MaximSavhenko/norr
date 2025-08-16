'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Heading } from '@/components/ui/Heading/Heading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { IAuthForm } from '@/types/auth.type'

import { authSchema } from '@/schemas/auth.schemas'
import { authService } from '@/services/auth.service'

export function Auth() {
	const [isLoginForm, setLoginForm] = useState(false)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IAuthForm>({
		mode: 'onSubmit',
		resolver: zodResolver(authSchema)
	})
	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: ({ isLogin, data }: { isLogin: boolean; data: IAuthForm }) =>
			authService.main(isLogin ? 'login' : 'register', data),
		onSuccess(_, variables) {
			if (variables.isLogin) {
				toast.success('Successfully logged in!')
			} else {
				toast.success('Successfully registered!')
			}
			reset()
			push('/')
		},
		onError(error: AxiosError<{ message?: string }>) {
			toast.error(error.response?.data?.message || 'Something went wrong')
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate({ isLogin: isLoginForm, data })
	}
	return (
		<div className='flex justify-center items-center w-screen h-screen'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='w-1/4 rounded-xl'
			>
				<Heading title='Auth' />
				<Label
					htmlFor='email'
					className='mb-3'
				>
					Email
				</Label>

				<Input
					className='mb-3'
					id='email'
					type='email'
					placeholder='Enter email : '
					error={errors.email?.message}
					{...register('email', { required: 'Email is required!' })}
				/>

				<Label
					htmlFor='email'
					className='mb-3'
				>
					Password
				</Label>

				<Input
					className='mb-4'
					id='password'
					type='password'
					placeholder='Enter password: '
					error={errors.password?.message}
					{...register('password', { required: 'Password is required!' })}
				/>

				<div className='flex'>
					<Button
						type='submit'
						onClick={() => setLoginForm(true)}
						className='mr-3'
					>
						Login
					</Button>

					<Button
						type='submit'
						onClick={() => setLoginForm(false)}
					>
						Register
					</Button>
				</div>
			</form>
		</div>
	)
}
