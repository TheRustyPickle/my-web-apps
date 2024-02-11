import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Create Survey",
	description: "Create a new Survey",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <div className="absolute inset-x-0 top-20">{children}</div>;
}
