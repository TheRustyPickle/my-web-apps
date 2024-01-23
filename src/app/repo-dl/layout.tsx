import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Repo Download",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <div>{children}</div>;
}
