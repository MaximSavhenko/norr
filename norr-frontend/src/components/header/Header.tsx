import { Topbar } from '../topbar/Topbar'

export function Header() {
	return (
		<header className='flex justify-between items-center p-4 border-b border-zinc-800 '>
			<Topbar />
		</header>
	)
}
