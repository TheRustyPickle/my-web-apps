"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const links = [
	{ name: "Home", href: "/home" },
	{ name: "Media Scraper", href: "/media-scraper" },
	{ name: "Repo D/L", href: "/repo-dl" },
	{ name: "Survey", href: "/survey" },
];

const TopNavBar = () => {
	const pathname = usePathname();
	return (
		<div className="fixed top-0 left-0 right-0 z-50 bg-blue-500 p-2 text-white text-lg antialiased">
			<div className="flex space-x-4 grow justify-center">
				{links.map((link) => {
					return (
						<Link
							key={link.name}
							href={link.href}
							className={clsx(
								" hover:bg-blue-600 hover:text-red-300 transition duration-300 px-3 py-1 rounded-lg",
								{
									"font-bold text-red-300": pathname === link.href,
								},
							)}
						>
							<p>{link.name}</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default TopNavBar;
