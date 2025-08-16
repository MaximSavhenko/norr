import { Topbar } from '../topbar/Topbar'

export function Header() {
	return (
		<header className='flex justify-between items-center p-4 border-b border-zinc-800 sticky top-0 z-5  w-full bg-background'>
			<Topbar />
		</header>
	)
}
