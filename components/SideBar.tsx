import Link from "next/link"
import { useRouter } from 'next/router'
import { signOut } from "next-auth/react"

import Logo from "./Logo"

const SideBar = ({ showNav } : { showNav: boolean }) => {
	const { pathname } = useRouter()
	// const pathname = useRouter().pathname
	const router = useRouter()

	const inactiveLink = "flex gap-2 p-1 my-1"
	const activeLink = inactiveLink + " bg-gray-200 Xtext-primary text-gray-900 rounded-md"
	const inactiveIcon = "w-6 h-6"
	const activeIcon = inactiveIcon + " text-blue-700"

	const dashboardIcon =
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={pathname === '/' ? activeIcon : inactiveIcon}>
  		<path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
	  	<path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
		</svg>

	const productsIcon =
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={pathname.includes('products') ? activeIcon : inactiveIcon}>
  		<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
		</svg>

	const ordersIcon =
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={pathname.includes('orders') ? activeIcon : inactiveIcon}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
		</svg>
	
	const settingsIcon =
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={pathname.includes('settings') ? activeIcon : inactiveIcon}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
			<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
		</svg>

	const categoriesIcon = 
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={pathname.includes('categories') ? activeIcon : inactiveIcon}>
  		<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
		</svg>

const logoutIcon =
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
		<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
	</svg>

	async function logout() {
		// uses await for the page "/" be fully loaded before to logout
    await router.push('/')
    signOut()
  }
	
	return (
		<aside className={`Wrapper fixed p-4 w-full bg-gray-100 h-full transition-all duration-1000 ease-in-out md:static md:w-auto ${showNav? 'left-0':'-left-full'}`}>
			<div className="Logo mb-4 mr-4">
				<Logo />
			</div>
				
			<nav className="flex flex-col">
				<Link
					className={pathname === '/' ? activeLink : inactiveLink} 
					href={'/'}>
						{dashboardIcon}
						Dashboard
				</Link>

				<Link
					className={pathname.includes('products') ? activeLink : inactiveLink} 
					href={'/products'}>
						{productsIcon}
						Products
				</Link>

				<Link
					className={pathname.includes('categories') ? activeLink : inactiveLink} 
					href={'/categories'}>
						{categoriesIcon}
						Categories
				</Link>

				<Link
					className={pathname.includes('orders') ? activeLink : inactiveLink} 
					href={'/orders'}>
						{ordersIcon}
						Orders
				</Link>

				<Link
					className={pathname.includes('settings') ? activeLink : inactiveLink} 
					href={'/settings'}>
						{settingsIcon}
						Settings
				</Link>

				<button 
					className={inactiveLink}
					onClick={() => logout()}>
					{logoutIcon}
					Logout
				</button>

			</nav>

		</aside>
	)
}

export default SideBar
