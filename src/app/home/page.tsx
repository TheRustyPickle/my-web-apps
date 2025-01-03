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
import table from "/public/table.png";
import funnel_1 from "/public/funnel_1.png";
import funnel_2 from "/public/funnel_2.png";
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
import discord from "/public/discord.svg";
import wasm from "/public/wasm.svg";
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
	discord: discord,
	wasm: wasm,
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
	wasm: "bg-red-400 text-white",
	discord: "bg-emerald-300 text-black",
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
		link: "",
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
	{
		id: "slide6",
		title: "Funnel",
		images: [funnel_1, funnel_2],
		alt: "Screenshot of Funnel app",
		description:
			"A platform for visualizing Discord analytics with full Wasm compatibility",
		link: "https://therustypickle.github.io/Funnel-Web/",
		source: "https://github.com/TheRustyPickle/Funnel-Web",
		badges: ["Rust", "egui", "Websocket", "discord", "wasm"],
	},
	{
		id: "slide7",
		title: "Egui Selectable Table",
		images: [table],
		alt: "Screenshot of the library demo",
		description:
			"A library for egui to create tables with draggable cell and row selection",
		link: "https://therustypickle.github.io/egui-selectable-table/",
		source: "https://github.com/TheRustyPickle/egui-selectable-table",
		badges: ["Rust", "egui"],
	},
	{
		id: "slide8",
		title: "Egui Theme Animation",
		images: [],
		alt: "",
		description: "A library for egui to animate theme changes",
		link: "https://therustypickle.github.io/egui-theme-lerp/",
		source: "https://github.com/TheRustyPickle/egui-theme-lerp",
		badges: ["Rust", "egui"],
	},
];

export default function Home() {
	const carouselRef = useRef<HTMLDivElement>(null);

	// Simulates scrolling left side horizontally
	// Used for scrolling the main slide
	const scrollLeft = () => {
		carouselRef.current?.scrollBy({
			left: -100,
			behavior: "smooth",
		});
	};

	// Simulates scrolling right side horizontally
	// Used for scrolling the main slide
	const scrollRight = () => {
		carouselRef.current?.scrollBy({
			left: 100,
			behavior: "smooth",
		});
	};

	// Get the element by the id attribute that is passed to the function
	// and scroll to that element. Used for slides inside the main slide
	const scrollToSlide = (slide_link: string) => {
		const targetElement = document.getElementById(slide_link);

		// Scroll to the target element. Taken from StackOverflow
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
		}
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
			<div className="carousel w-full lg:pb-5" ref={carouselRef}>
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
					{/* The very initial slide. It will only have one button to go right side */}
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
				{/* Start of project slide */}
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
							{/* If there are multiple images add x amount of buttons to cycle through the images */}
							{project.images.length > 1 && (
								// There are more than 1 image. Loop through each, get the index. index + 1 is the image number button
								<div className="flex justify-center w-full py-2 gap-2">
									{project.images.map((image, index) => (
										// Anchor tag does not work. Have to do the scrolling manually by checking button press
										<button
											key={`${project.id}_button_index_${index}`}
											onClick={() =>
												scrollToSlide(`${project.id}_item_${index + 1}`)
											}
											type="button"
											className="btn btn-xs"
										>
											{index + 1}
										</button>
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
								<div className="flex flex-col md:flex-row md:space-x-5">
									{/* If project has a link, it can be used online */}
									{project.link && (
										<a
											href={project.link}
											className="btn btn-md bg-blue-500 hover:bg-blue-600 text-white mx-0 md:mx-5 mb-2 md:mb-0 w-full md:w-auto"
										>
											Try It Online
										</a>
									)}
									<a
										href={project.source}
										className="btn btn-md bg-blue-500 hover:bg-blue-600 text-white mx-0 md:mx-5 w-full md:w-auto"
									>
										Source Code
									</a>
								</div>
							</div>
						</div>

						{/* Arrow icons for going left and right */}
						<div className="absolute flex justify-end transform -translate-y-1/2 right-5 top-1/2">
							{project.id === projects[projects.length - 1].id ? (
								// Anchor tag does not work. Needs to handled manually
								// If is the last element, send the element data of the first slide
								<button
									onClick={() => scrollToSlide(`${projects[0].id}`)}
									type="button"
									className="btn btn-circle"
								>
									❯
								</button>
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
								// Anchor tag does not work. Needs to handled manually
								// If is the first element, send the element data of the last slide
								<button
									onClick={() =>
										scrollToSlide(`${projects[projects.length - 1].id}`)
									}
									type="button"
									className="btn btn-circle"
								>
									❮
								</button>
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
