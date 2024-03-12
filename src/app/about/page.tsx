"use client";

import telegram from "/public/telegram_2.svg";
import discord from "/public/discord.svg";
import gmail from "/public/gmail.svg";
import github from "/public/github-logo.svg";
import Image from "next/image";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="card w-auto lg:w-2/5 p-6 shadow-xl hover:shadow-blue-400 hover:shadow-xl transition-all duration-300 ease-in-out">
				<p className="text-lg text-center">
					I&#39;m a hobbyist programmer exploring the vast world of technology
					and software development. Currently, I&#39;m primarily working with
					Rust, and this site was crafted using TypeScript, Tailwind CSS, and
					Next.js. Interested in discussing any of my projects or potential job
					opportunities? Feel free to reach out to me through the links below.
				</p>
			</div>

			<div className="flex flex-col md:flex-row md:gap-20 gap-5 mt-8">
				<a href="https://t.me/RustyPickle">
					<Image
						src={telegram}
						height={100}
						quality={100}
						alt="Telegram Logo"
						className="hover:border-blue-600 hover:border-2 rounded-full p-2 hover:shadow-blue-400 hover:shadow-xl transition-all duration-75 ease-in-out"
					/>
				</a>
				<a href="https://discord.com/users/406917444381179905">
					<Image
						src={discord}
						height={100}
						quality={100}
						alt="Discord Logo"
						className="hover:border-blue-600 hover:border-2 rounded-full p-2 hover:shadow-blue-400 hover:shadow-xl transition-all duration-75 ease-in-out"
					/>
				</a>
				<a href="mailto:rusty.pickle94@gmail.com">
					<Image
						src={gmail}
						height={90}
						quality={100}
						alt="Gmail Logo"
						className="hover:border-blue-600 hover:border-2 rounded-xl p-2 hover:shadow-blue-400 hover:shadow-xl transition-all duration-75 ease-in-out"
					/>
				</a>
				<a href="https://github.com/TheRustyPickle">
					<Image
						src={github}
						height={100}
						quality={100}
						alt="GitHub Logo"
						className="hover:border-blue-600 hover:border-2 rounded-full p-2 hover:shadow-blue-400 hover:shadow-xl transition-all duration-75 ease-in-out"
					/>
				</a>
			</div>
		</div>
	);
}
