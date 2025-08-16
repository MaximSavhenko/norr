import { z } from 'zod'

export const authSchema = z.object({
	email: z.email('Invalid email'),
	password: z.string().min(6, 'Min 6 sumbols')
})

export type AuthSchemaType = z.infer<typeof authSchema>
