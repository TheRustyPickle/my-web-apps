import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Media Scraper",
	description:
		"A scraper that tries to find downloadable content from websites",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <div className="absolute inset-x-0 top-20">{children}</div>;
}
