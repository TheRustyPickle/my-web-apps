"use server";

import { z } from "zod";
import puppeteer from "puppeteer";
import { startParsing } from "./parser";
import { removeTrailingSlash } from "./utils";

const FormSchema = z.object({
	link: z.string().refine((data) => data.trim() !== "", {
		message: "Link cannot be empty.",
	}),
});

export type State = {
	error?: {
		link?: string[];
	};
	message?: string | null;
	parsedDownloadables?: {
		fullLinks: string[];
		parsedLinks: string[];
	};
};

export async function checkLink(
	prevState: State,
	formData: FormData,
): Promise<State> {
	const validatedFields = FormSchema.safeParse({
		link: formData.get("linkToCheck"),
	});

	if (!validatedFields.success) {
		return {
			error: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields",
		};
	}

	const url = removeTrailingSlash(validatedFields.data.link);

	let htmlContent = "";

	try {
		htmlContent = await getHTMLContent(url);

	} catch (err) {
		return {
			message: "Failed to get HTML content from the site.",
		};
	}

	const {fullLinks, parsedLinks} = startParsing(htmlContent, url);

	return {
		parsedDownloadables: {
			fullLinks: fullLinks,
			parsedLinks: parsedLinks
		},
	};
}

async function getHTMLContent(url: string) {
	const browser = await puppeteer.launch({
		headless: "new",
	});
	const page = await browser.newPage();
	let pageContent = "";

	try {
		await page.goto(url);
		pageContent = await page.content();
	} catch (err) {
		pageContent = "Failed to get the site's HTML. Is the link valid?";
	}
	await browser.close();

	return pageContent;
}
