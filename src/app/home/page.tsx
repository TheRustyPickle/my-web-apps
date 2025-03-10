"use client";

import type { StaticImageData } from "next/image";
import Image from "next/image";

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
import dl_reddit from "/public/dl_reddit.png";
import leptos from "/public/leptos.png";
import { useRef, useState } from "react";

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
	leptos: leptos,
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
		badges: [
			"Rust",
			"egui",
			"Websocket",
			"discord",
			"wasm",
			"PostgreSQL",
			"diesel",
		],
	},
	{
		id: "slide9",
		title: "DL-Reddit",
		images: [dl_reddit],
		alt: "Screenshot of DL-Reddit app",
		description:
			"A simple Leptos WASM web app to download videos/images from a Reddit post",
		link: "https://dl-reddit.onrender.com/",
		source: "https://github.com/TheRustyPickle/DL-Reddit",
		badges: ["Rust", "leptos", "TailwindCSS", "wasm"],
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
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
	const totalSlides = projects.length + 1; // +1 for the initial intro slide

	// Scroll to previous slide in the main carousel
	const scrollToPrevSlide = () => {
		// Skip the intro slide when going back from any project slide
		if (currentSlideIndex === 1) {
			// If we're on the first project slide, go to the last project slide
			const lastProjectIndex = totalSlides - 1;
			setCurrentSlideIndex(lastProjectIndex);
			scrollToSlide(projects[projects.length - 1].id);
		} else if (currentSlideIndex > 1) {
			// Normal previous for other project slides
			const newIndex = currentSlideIndex - 1;
			setCurrentSlideIndex(newIndex);
			scrollToSlide(projects[newIndex - 1].id);
		}
		// Do nothing if we're on the intro slide (index 0)
	};

	// Scroll to next slide in the main carousel
	const scrollToNextSlide = () => {
		if (currentSlideIndex === 0) {
			// From intro slide, go to first project
			setCurrentSlideIndex(1);
			scrollToSlide(projects[0].id);
		} else if (currentSlideIndex === totalSlides - 1) {
			// From last project, go to first project (skip intro)
			setCurrentSlideIndex(1);
			scrollToSlide(projects[0].id);
		} else {
			// Normal next for other slides
			const newIndex = currentSlideIndex + 1;
			setCurrentSlideIndex(newIndex);
			scrollToSlide(projects[newIndex - 1].id);
		}
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
		<div className="container mx-auto relative">
			{/* Start of the carousel */}
			<div className="carousel w-full lg:pb-5" ref={carouselRef}>
				{/* The initial card that is to be shown when the Homepage is opened. It won't show up again while cycling the cards */}
				<div
					id="intro-slide"
					className="carousel-item relative w-full justify-center items-center flex"
				>
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
						<div className="card bg-white w-auto lg:w-3/5 shadow-md justify-center items-center flex m-5 hover:shadow-blue-400 hover:shadow-xl transition-all duration-300 ease-in-out">
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
												className="py-4 rounded-xl"
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
										className="badge badge-soft badge-neutral mx-0.5 gap-1"
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
											View Online
										</a>
									)}
									<a
										href={project.source}
										className="btn btn-md bg-blue-500 hover:bg-blue-600 text-white mx-0 md:mx-5 w-full md:w-auto"
									>
										View On Github
									</a>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Fixed position navigation arrows for main carousel */}
			<div className="absolute flex justify-between w-full top-1/2 transform -translate-y-1/2 px-5 pointer-events-none">
				{/* Left arrow - hide on first slide */}
				{currentSlideIndex !== 0 && (
					<button
						onClick={scrollToPrevSlide}
						className="btn btn-circle btn-soft pointer-events-auto"
						type="button"
					>
						❮
					</button>
				)}

				{/* Empty div to maintain layout when left button is hidden */}
				{currentSlideIndex === 0 && <div />}

				{/* Right arrow - always visible */}
				<button
					onClick={scrollToNextSlide}
					className="btn btn-circle btn-soft pointer-events-auto"
					type="button"
				>
					❯
				</button>
			</div>
		</div>
	);
}
