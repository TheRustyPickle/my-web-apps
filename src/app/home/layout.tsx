import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home",
	description: "Home page of my web apps",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <div className="absolute inset-x-0 top-20">{children}</div>;
}
