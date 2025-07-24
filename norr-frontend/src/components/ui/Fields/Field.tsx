import { forwardRef } from 'react'

interface IFieldProps {
	label: string
	type?: string
	id: string
	placeholder?: string
	name?: string
	error?: string
}

export const Field = forwardRef<HTMLInputElement, IFieldProps>(
	({ label, type = 'text', id, placeholder, name, error, ...rest }, ref) => {
		return (
			<div className='mb-4'>
				<input
					className='w-full border px-3 py-2 rounded'
					id={id}
					name={name}
					type={type}
					placeholder={placeholder}
					ref={ref}
					{...rest}
				/>
				{error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
			</div>
		)
	}
)
Field.displayName = 'Field'
