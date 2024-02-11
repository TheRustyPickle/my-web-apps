import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Survey",
	description: "Create or check a survey",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <div>{children}</div>;
}
