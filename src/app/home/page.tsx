"use client";

import Image, { StaticImageData } from "next/image";

import scraper from "/public/scraper.png";
import repo_dl from "/public/repo-dl.png";
import next_js from "/public/next-js.svg";
import rex from "/public/rex.png";
import talon from "/public/talon.png";
import chirp from "/public/chirp.png";
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
	image: StaticImageData;
	alt: string;
	description: string;
	link: string;
	source: string;
	badges: string[];
	next: string;
	prev: string;
};

const projects: Project[] = [
	{
		id: "slide1",
		title: "Media Scraper",
		image: scraper,
		alt: "Screenshot of Media Scraper app",
		description:
			"A tool that allows you to scrape downloadable contents such as images, videos, pdf from websites.",
		link: "/media-scraper",
		source: "https://github.com/TheRustyPickle/my-web-apps",
		badges: ["Typescript", "NextJS", "TailwindCSS", "DaisyUI", "Puppeteer"],
		next: "#slide2",
		prev: "#slide5",
	},
	{
		id: "slide2",
		title: "Repo D/L",
		image: repo_dl,
		alt: "Screenshot of Repo D/L app",
		description: "A tool to check download data of Github repository releases",
		link: "/repo-dl",
		source: "https://github.com/TheRustyPickle/my-web-apps",
		badges: ["Typescript", "NextJS", "TailwindCSS", "DaisyUI", "Octokit"],
		next: "#slide3",
		prev: "#slide1",
	},
	{
		id: "slide3",
		title: "Rex",
		image: rex,
		alt: "Screenshot of Repo D/L app",
		description:
			"A cross-platform TUI app for managing Incomes and Expenses that comes with charts and summary pages",
		link: "",
		source: "https://github.com/TheRustyPickle/Rex",
		badges: ["Rust", "ratatui", "Terminal", "SQLite"],
		next: "#slide4",
		prev: "#slide2",
	},
	{
		id: "slide4",
		title: "Talon",
		image: talon,
		alt: "Screenshot of Talon app",
		description:
			"Talon is a tool to generate on-demand data insights from public Telegram chats including charts, user table and more using Telegram account API",
		link: "",
		source: "https://github.com/TheRustyPickle/Talon",
		badges: ["Rust", "egui", "GUI", "Telegram"],
		next: "#slide5",
		prev: "#slide3",
	},
	{
		id: "slide5",
		title: "Chirp",
		image: chirp,
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
		next: "#slide1",
		prev: "#slide4",
	},
];

export default function Home() {
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
			<div className="carousel w-full">
				{projects.map((project) => (
					// A carousel item for each of the projects
					<div
						key={project.id}
						id={project.id}
						className="carousel-item relative w-full justify-center items-center flex"
					>
						{/* The card inside the carousel */}
						<div className="card w-auto bg-base-100 shadow-xl justify-center items-center flex m-5 hover:shadow-blue-400 transition-all duration-300 ease-in-out">
							<figure className="px-10 pt-10">
								<Image
									src={project.image}
									alt={project.alt}
									className="rounded-xl"
								/>
							</figure>
							{/* add the badges after the image of the project */}
							<div className="mt-3 flex items-center">
								{project.badges.map((badge) => (
									<div
										key={project.id}
										className={`badge badge-info mx-0.5 gap-1 ${badgeStyles[badge]}`}
									>
										{/* Add an image beside the badge if it exists */}
										{badgeImages[badge] && (
											<Image src={badgeImages[badge]} width="20" alt="logo" />
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
						<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
							<a href={project.prev} className="btn btn-circle">
								❮
							</a>
							<a href={project.next} className="btn btn-circle">
								❯
							</a>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
