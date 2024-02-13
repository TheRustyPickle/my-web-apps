"use client";

import Image, { StaticImageData } from "next/image";

import scraper from "/public/scraper.png";
import repo_dl from "/public/repo-dl.png";
import next_js from "/public/next-js.svg";

const badgeStyles: Record<string, string> = {
    Typescript: "bg-blue-500 text-white",
    NextJS: "bg-gray-300 text-black",
    DaisyUI: "bg-purple-500 text-white",
    TailwindCSS: "bg-teal-500 text-white",
    Rust: "bg-orange-600 text-white",
    ActixWeb: "bg-indigo-500 text-white",
    diesel: "bg-gray-700 text-white",
    Octokit: "bg-blue-600 text-white",
    Puppeteer: "bg-green-500 text-white",
    GTK4: "bg-yellow-500 text-black",
    egui: "bg-yellow-500 text-black",
    ratatui: "bg-pink-500 text-white",
    Encryption: "bg-gray-500 text-white",
    Websocket: "bg-indigo-700 text-white",
    SQLite: "bg-indigo-500 text-white",
    Terminal: "bg-gray-800 text-white",
    GUI: "bg-green-600 text-white",
    Telegram: "bg-blue-400 text-white",
    PostgreSQL: "bg-blue-500 text-white"
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
		image: repo_dl,
		alt: "Screenshot of Repo D/L app",
		description: "A TUI app for managing Incomes and Expenses",
		link: "",
		source: "https://github.com/TheRustyPickle/Rex",
		badges: ["Rust", "ratatui", "Terminal", "SQLite"],
		next: "#slide4",
		prev: "#slide2",
	},
	{
		id: "slide4",
		title: "Talon",
		image: repo_dl,
		alt: "Screenshot of Talon app",
		description:
			"Talon is a tool to generate on-demand data insights from public Telegram chats including charts, user table and more",
		link: "",
		source: "https://github.com/TheRustyPickle/Talon",
		badges: ["Rust", "egui", "GUI", "Telegram"],
		next: "#slide5",
		prev: "#slide3",
	},
	{
		id: "slide5",
		title: "Chirp",
		image: repo_dl,
		alt: "Screenshot of Chirp app",
		description:
			"A Rust based GTK4 chatting app created from scratch with a custom server and built-in encryption support with RSA and AES",
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
			"PostgreSQL"
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

			<div className="carousel w-full">
				{projects.map((project) => (
					<div
						key={project.id}
						id={project.id}
						className="carousel-item relative w-full justify-center items-center flex"
					>
						<div className="card w-auto bg-base-100 shadow-lg justify-center items-center flex m-5 hover:shadow-blue-400 transition-all duration-300 ease-in-out">
							<figure className="px-10 pt-10">
								<Image
									src={project.image}
									alt={project.alt}
									className="rounded-xl"
								/>
							</figure>
							<div className="mt-3">
								{project.badges.map((badge) => (
									<div
										key={project.id}
										className={`badge badge-info gap-2 ${badgeStyles[badge]}`}
									>
										{/* <Image src={next_js} width="20" alt="s"/> */}
										{badge}
									</div>
								))}
							</div>
							<div className="card-body justify-center items-center flex">
								<h2 className="card-title">{project.title}</h2>
								<p className="text-base">{project.description}</p>
								<div>
									{project.link && (
										<a
											href={project.link}
											className="btn btn-md bg-blue-500 hover:bg-blue-600 text-white mx-5"
										>
											Check App
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
