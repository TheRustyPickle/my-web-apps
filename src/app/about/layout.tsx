import { Metadata } from "next";

export const metadata: Metadata = {
	title: "About",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <div className="absolute inset-x-0">{children}</div>;
}
