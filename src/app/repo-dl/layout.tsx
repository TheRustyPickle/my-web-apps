import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Repo Download",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <div className="absolute inset-x-0 top-20">{children}</div>;
}
