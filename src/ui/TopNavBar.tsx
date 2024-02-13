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
		<>
			<div className="fixed top-0 left-0 right-0 z-50 bg-blue-500 p-3">
				<div className="text-white text-lg antialiased mx-5 flex items-center">
					<div className="hidden sm:block">
						<a
							href="https://github.com/TheRustyPickle"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								src="my-logo.svg"
								alt="A green black R logo"
								width="25"
								height="20"
							/>
						</a>
					</div>
					<div className="flex space-x-4 grow justify-center">
						{links.map((link) => {
							return (
								<Link
									key={link.name}
									href={link.href}
									className={clsx(
										" hover:bg-blue-600 hover:text-red-300 transition duration-300 px-3 py-1 rounded-lg",
										{
											"font-bold": pathname === link.href,
										},
									)}
								>
									<p>{link.name}</p>
								</Link>
							);
						})}
					</div>
					<div className="hidden sm:block">
						<a
							href="https://github.com/TheRustyPickle/my-web-apps"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								src="github-logo.svg"
								alt="Github Logo"
								width="35"
								height="20"
							/>
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default TopNavBar;
