import type { Metadata } from 'next'

import { Auth } from './Auth'

export const metadata: Metadata = {
	title: 'PageTitle'
}

export default function page() {
	return (
		<div>
			<Auth />
		</div>
	)
}
