'use client'

import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { authService } from '@/services/auth.service'

export function LogoutButton() {
	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess() {
			push('/auth')
		}
	})

	return (
		<div>
			<button
				onClick={() => mutate()}
				className='opacity-20 hover:opacity-100 transform-opacity duration-300 cursor-pointer'
			>
				<LogOut size={32} />
			</button>
		</div>
	)
}
