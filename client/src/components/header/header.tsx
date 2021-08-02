import Link from 'next/link';
import type { VFC } from 'react';

const items = [
	{ href: '/', label: 'Home' },
	{ href: '/about', label: 'About' },
	{ href: '/signup', label: 'Sign up' },
	{ href: '/login', label: 'Login' },
];

const Header: VFC = () => {
	return (
		<header>
			<nav className="border-gray-400 flex items-center">
				{items.map(({ href, label }) => {
					return (
						<Link key={href} href={href}>
							<a className="block p-4 text-gray-400">{label}</a>
						</Link>
					);
				})}
			</nav>
		</header>
	);
};

export default Header;
