import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/ui/globals.css";
import TopNavBar from "@/ui/TopNavBar";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		template: "%s | My Web Apps",
		default: "My Web Apps",
	},
	description: "A collection of random web apps created by Rusty Pickle",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<TopNavBar />
				{children}
				<Analytics />
			</body>
		</html>
	);
}
