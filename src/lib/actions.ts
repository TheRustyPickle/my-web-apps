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
	message?: string | null;
	parsedDownloadables?: {
		fullLinks: string[];
		partialLinks: string[];
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
			message: String(validatedFields.error.flatten().fieldErrors.link),
		};
	}

	const url = removeTrailingSlash(validatedFields.data.link);

	const { htmlContent, failedAction } = await getHTMLContent(url);

	if (failedAction) {
		return {
			message: htmlContent,
		};
	}

	const { fullLinks, partialLinks } = startParsing(htmlContent, url);

	return {
		parsedDownloadables: {
			fullLinks: fullLinks,
			partialLinks: partialLinks,
		},
	};
}

async function getHTMLContent(url: string) {
	const browser = await puppeteer.launch({
		headless: "new",
	});
	const page = await browser.newPage();
	let pageContent = "";
	let failedAction = false;

	try {
		await page.goto(url);
		await page.waitForTimeout(2000)
		pageContent = await page.content();
	} catch (err) {
		failedAction = true;
		pageContent = "Failed to get the site's HTML. Is the link valid?";
	}
	await browser.close();

	return { htmlContent: pageContent, failedAction: failedAction };
}
