import type { Metadata } from 'next'

import { Home } from '@/components/home/Home'

export const metadata: Metadata = {
	title: 'PageTitle'
}

export default function HomePage() {
	return (
		<div>
			<Home />
		</div>
	)
}
