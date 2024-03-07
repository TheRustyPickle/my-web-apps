"use client";

import Image, { StaticImageData } from "next/image";

import scraper from "/public/scraper.png";
import repo_dl from "/public/repo-dl.png";
import next_js from "/public/next-js.svg";
import rex_1 from "/public/rex_1.png";
import rex_2 from "/public/rex_2.png";
import rex_3 from "/public/rex_3.png";
import rex_4 from "/public/rex_4.png";
import rex_5 from "/public/rex_5.png";
import talon_1 from "/public/talon_1.png";
import talon_2 from "/public/talon_2.png";
import talon_3 from "/public/talon_3.png";
import chirp_1 from "/public/chirp_1.png";
import chirp_2 from "/public/chirp_2.png";
import diesel from "/public/diesel.svg";
import actix from "/public/actix.png";
import telegram from "/public/telegram.svg";
import gtk from "/public/gtk.svg";
import octokit from "/public/octokit.png";
import postgresql from "/public/postgresql.svg";
import puppeteer from "/public/puppeteer.svg";
import rust from "/public/rust.svg";
import sqlite from "/public/sqlite.svg";
import tailwind from "/public/tailwind.svg";
import typescript from "/public/typescript.svg";
import daisyui from "/public/daisyui.png";
import ratatui from "/public/ratatui.png";
import encryption from "/public/ency.svg";
import terminal from "/public/terminal.svg";
import gui from "/public/gui.svg";
import websocket from "/public/websocket.svg";
import egui from "/public/egui.png";
import { useRef } from "react";

const badgeImages: Record<string, StaticImageData> = {
	NextJS: next_js,
	diesel: diesel,
	ActixWeb: actix,
	Telegram: telegram,
	Typescript: typescript,
	TailwindCSS: tailwind,
	Octokit: octokit,
	Puppeteer: puppeteer,
	GTK4: gtk,
	ratatui: ratatui,
	SQLite: sqlite,
	PostgreSQL: postgresql,
	DaisyUI: daisyui,
	Rust: rust,
	Encryption: encryption,
	Websocket: websocket,
	Terminal: terminal,
	GUI: gui,
	egui: egui,
};

const badgeStyles: Record<string, string> = {
	Typescript: "bg-blue-400 text-white",
	NextJS: "bg-gray-500 text-white",
	DaisyUI: "bg-purple-800 text-white",
	TailwindCSS: "bg-sky-600 text-white",
	Rust: "bg-orange-500 text-black",
	ActixWeb: "bg-indigo-500 text-white",
	diesel: "bg-gray-700 text-white",
	Octokit: "bg-red-600 text-white",
	Puppeteer: "bg-green-500 text-white",
	GTK4: "bg-teal-500 text-black",
	egui: "bg-sky-400 text-black",
	ratatui: "bg-neutral-500 text-white",
	Encryption: "bg-purple-600 text-white",
	Websocket: "bg-emerald-600 text-white",
	SQLite: "bg-indigo-600 text-white",
	Terminal: "bg-amber-400 text-black",
	GUI: "bg-green-600 text-black",
	Telegram: "bg-blue-300 text-black",
	PostgreSQL: "bg-blue-500 text-white",
};

type Project = {
	id: string;
	title: string;
	images: StaticImageData[];
	alt: string;
	description: string;
	link: string;
	source: string;
	badges: string[];
};

const projects: Project[] = [
	{
		id: "slide1",
		title: "Media Scraper",
		images: [scraper],
		alt: "Screenshot of Media Scraper app",
		description:
			"A tool that allows you to scrape downloadable contents such as images, videos, pdf from websites.",
		link: "/media-scraper",
		source: "https://github.com/TheRustyPickle/my-web-apps",
		badges: ["Typescript", "NextJS", "TailwindCSS", "DaisyUI", "Puppeteer"],
	},
	{
		id: "slide2",
		title: "Repo D/L",
		images: [repo_dl],
		alt: "Screenshot of Repo D/L app",
		description: "A tool to check download data of Github repository releases",
		link: "/repo-dl",
		source: "https://github.com/TheRustyPickle/my-web-apps",
		badges: ["Typescript", "NextJS", "TailwindCSS", "DaisyUI", "Octokit"],
	},
	{
		id: "slide3",
		title: "Rex",
		images: [rex_1, rex_2, rex_3, rex_4, rex_5],
		alt: "Screenshot of Repo D/L app",
		description:
			"A cross-platform TUI app for managing Incomes and Expenses that comes with charts and summary pages",
		link: "",
		source: "https://github.com/TheRustyPickle/Rex",
		badges: ["Rust", "ratatui", "Terminal", "SQLite"],
	},
	{
		id: "slide4",
		title: "Talon",
		images: [talon_1, talon_2, talon_3],
		alt: "Screenshot of Talon app",
		description:
			"Talon is a tool to generate on-demand data insights from public Telegram chats including charts, user table and more using Telegram account API",
		link: "",
		source: "https://github.com/TheRustyPickle/Talon",
		badges: ["Rust", "egui", "GUI", "Telegram"],
	},
	{
		id: "slide5",
		title: "Chirp",
		images: [chirp_1, chirp_2],
		alt: "Screenshot of Chirp app",
		description:
			"A GTK4 based chatting app created from scratch with Rust with a custom server and built-in encryption support with RSA and AES",
		link: "",
		source: "https://github.com/TheRustyPickle/Chirp",
		badges: [
			"Rust",
			"GTK4",
			"diesel",
			"ActixWeb",
			"GUI",
			"Encryption",
			"Websocket",
			"PostgreSQL",
		],
	},
];

export default function Home() {
	const carouselRef = useRef<HTMLDivElement>(null);

	const scrollLeft = () => {
		carouselRef.current?.scrollBy({
			left: -100,
			behavior: "smooth",
		});
	};

	const scrollRight = () => {
		carouselRef.current?.scrollBy({
			left: 100,
			behavior: "smooth",
		});
	};
	return (
		<div className="container mx-auto">
			<div className="flex flex-col justify-center items-center">
				<h1 className="text-3xl font-bold mb-4">
					Welcome to my site of Web Apps
				</h1>
				<p className="text-lg">
					Explore a collection of applications developed by me using various
					technologies
				</p>
			</div>

			{/* Start of the carousel */}
			<div className="carousel w-full" ref={carouselRef}>
				{/* The initial card that is to be shown when the Home page is opened. It won't show up again while cycling the cards */}
				<div className="carousel-item relative w-full justify-center items-center flex">
					<div className="card w-auto h-1/4 bg-base-100 shadow-xl justify-center items-center flex m-5 hover:shadow-blue-400 transition-all duration-300 ease-in-out">
						<div className="card-body justify-center items-center flex">
							<p className="text-base">
								Cycle through to see to some of the projects that I have worked
								on
							</p>
							<a
								href="https://github.com/TheRustyPickle"
								className="btn btn-md bg-blue-500 hover:bg-blue-600 text-white mx-5"
							>
								Check My Github
							</a>
						</div>
					</div>
					<div className="absolute flex justify-end transform -translate-y-1/2 right-5 top-1/2">
						<button
							onClick={scrollRight}
							className="btn btn-circle"
							type="button"
						>
							❯
						</button>
					</div>
				</div>

				{projects.map((project) => (
					// A carousel item for each of the projects
					<div
						key={project.id}
						id={project.id}
						className="carousel-item relative w-full justify-center items-center flex"
					>
						{/* The card inside the carousel */}
						<div className="card w-auto lg:w-3/5 shadow-md justify-center items-center flex m-5 hover:shadow-blue-400 hover:shadow-xl transition-all duration-300 ease-in-out">
							{/* A carousel inside carousel that for cycling through the images */}
							<div className="carousel">
								{project.images.map((image, index) => (
									<div
										key={`${project.id}_index_${index}`}
										className="carousel-item relative w-full justify-center items-center flex"
										id={`${project.id}_item_${index + 1}`}
									>
										<figure>
											<Image
												src={image}
												alt={project.alt}
												className="rounded-xl"
												height={400}
												quality={100}
											/>
										</figure>
									</div>
								))}
							</div>
							{/* If there are multiple images add x amount of buttons to cycle through the images*/}
							{project.images.length > 1 && (
								<div className="flex justify-center w-full py-2 gap-2">
									{project.images.map((image, index) => (
										<a
											key={`${project.id}_button_index_${index}`}
											href={`#${project.id}_item_${index + 1}`}
											className="btn btn-xs"
										>
											{index + 1}
										</a>
									))}
								</div>
							)}

							{/* add the badges after the image of the project */}
							<div className="mt-3 flex flex-wrap items-center justify-center">
								{project.badges.map((badge, index) => (
									<div
										key={`${project.id}_badge_index_${index}`}
										className={`badge badge-info mx-0.5 gap-1 ${badgeStyles[badge]}`}
									>
										{/* Add an image beside the badge if it exists */}
										{badgeImages[badge] && (
											<Image
												src={badgeImages[badge]}
												width="20"
												alt="logo"
												key={project.id}
											/>
										)}
										{badge}
									</div>
								))}
							</div>
							{/* Project description */}
							<div className="card-body justify-center items-center flex">
								<h2 className="card-title">{project.title}</h2>
								<p className="text-base">{project.description}</p>
								<div>
									{project.link && (
										<a
											href={project.link}
											className="btn btn-md bg-blue-500 hover:bg-blue-600 text-white mx-5"
										>
											Try It Online
										</a>
									)}
									<a
										href={project.source}
										className="btn btn-md bg-blue-500 hover:bg-blue-600 text-white mx-5"
									>
										Source Code
									</a>
								</div>
							</div>
						</div>

						{/* Arrow icons for going left and right */}
						<div className="absolute flex justify-end transform -translate-y-1/2 right-5 top-1/2">
							{project.id === projects[projects.length - 1].id ? (
								<a href={`#${projects[0].id}`} className="btn btn-circle">
									❯
								</a>
							) : (
								<button
									onClick={scrollRight}
									className="btn btn-circle"
									type="button"
								>
									❯
								</button>
							)}
						</div>
						<div className="absolute flex justify-start transform -translate-y-1/2 left-5 top-1/2">
							{project.id === projects[0].id ? (
								<a
									href={`#${projects[projects.length - 1].id}`}
									className="btn btn-circle"
								>
									❮
								</a>
							) : (
								<button
									onClick={scrollLeft}
									className="btn btn-circle"
									type="button"
								>
									❮
								</button>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
