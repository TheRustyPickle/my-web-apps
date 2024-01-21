"use client";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function Home() {
	revalidatePath("/site-media-scraper");
	redirect("/site-media-scraper");
}
