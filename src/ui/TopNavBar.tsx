"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const projectLinks = [{ name: "Repo D/L", href: "/repo-dl" }];

const mainLinks = [
	{ name: "Home", href: "/home" },
	{ name: "Projects", href: "Nowhere" },
	{ name: "About", href: "/about" },
];

export default function NavBar() {
	const pathname = usePathname();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [detailsOpen, setDetailsOpen] = useState(false);

	// biome-ignore lint/suspicious/noExplicitAny: Shut it linter
	const toggleDetails = (event: any) => {
		event.preventDefault();
		setDetailsOpen(!detailsOpen);
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const dropdown = document.querySelector("details");
			if (dropdown && !dropdown.contains(event.target as Node)) {
				setDetailsOpen(false);
			}
		};
		if (detailsOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [detailsOpen]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const dropdown = document.querySelector(".dropdown");
			if (dropdown && !dropdown.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			}
		};

		if (isDropdownOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isDropdownOpen]);
	return (
		// keep the navbar stuck to the top of the page
		<div className="navbar fixed top-0 left-0 right-0 z-50">
			{/* Start of the navbar */}
			<div className="navbar-start">
				<div className="dropdown">
					{/* The menu icon when on not on a large display */}
					<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							onMouseDown={toggleDropdown}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<title>Icon description</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</div>
					{/* Content of the menu button */}
					{isDropdownOpen && (
						<ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
							{mainLinks.map((link) => (
								<div key={`index_${link.href}`}>
									{/* If the value is Projects create the collapsing menu or just a regular Link button */}
									{link.name === "Projects" ? (
										<div className="collapse collapse-arrow">
											<input type="checkbox" />
											<div className="collapse-title flex item-center justify-center">
												Projects
											</div>
											<div className="collapse-content">
												{projectLinks.map((link) => (
													<Link
														key={`index_${link.href}`}
														href={link.href}
														className={clsx(
															"p-2 m-1 flex justify-center hover:bg-blue-600 transition duration-300 rounded-lg",
															{
																"font-bold text-red-300":
																	pathname === link.href,
															},
															{
																"hover:text-white": pathname !== link.href,
															},
														)}
													>
														{link.name}
													</Link>
												))}
											</div>
										</div>
									) : (
										<Link
											href={link.href}
											className={clsx(
												"flex flex-grow justify-center hover:bg-blue-600 hover:text-red-300 transition duration-300 px-2 py-2 rounded-lg",
												{
													"font-bold text-red-300": pathname === link.href,
												},
											)}
										>
											{link.name}
										</Link>
									)}
								</div>
							))}
						</ul>
					)}
				</div>
			</div>
			{/* For when in a large display */}
			<div className="navbar-center hidden lg:flex bg-blue-500 w-2/5 justify-center items-center rounded-full text-white">
				{mainLinks.map((link) => (
					<div key={`index_${link.href}`}>
						{/* Create a menu item with the projects if Projects value or just a normal link button */}
						{link.name === "Projects" ? (
							<ul className="menu menu-horizontal">
								<li>
									<details open={detailsOpen}>
										<summary
											className="text-base hover:text-red-300 hover:bg-blue-600 transition duration-300 px-3 py-2 rounded-lg"
											onClick={toggleDetails}
											onKeyDown={(event) => {
												if (event.key === "Enter" || event.key === " ") {
													toggleDetails(event);
												}
											}}
											tabIndex={0}
										>
											{link.name}
										</summary>
										<ul className="p-2 text-black">
											{projectLinks.map((projLink) => (
												<Link
													key={`index_${projLink.href}`}
													href={projLink.href}
													className={clsx(
														"p-2 m-1 flex justify-center hover:bg-blue-600 transition duration-300 rounded-lg",
														{
															"font-bold text-red-300":
																pathname === projLink.href,
														},
														{
															"hover:text-white": pathname !== projLink.href,
														},
													)}
												>
													{projLink.name}
												</Link>
											))}
										</ul>
									</details>
								</li>
							</ul>
						) : (
							<Link
								className={clsx(
									" hover:bg-blue-600 hover:text-red-300 transition duration-300 px-2 py-2 rounded-lg",
									{
										"font-bold text-red-300": pathname === link.href,
									},
								)}
								href={link.href}
							>
								{link.name}
							</Link>
						)}
					</div>
				))}
			</div>
			<div className="navbar-end" />
		</div>
	);
}
