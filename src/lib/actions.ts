"use server";

import { z } from "zod";
import puppeteer from "puppeteer";
import { startParsing } from "./parser";
import { removeTrailingSlash } from "./utils";

const FormSchema = z.object({
	link: z.string().refine((data) => data.trim() !== "", {
		message: "Link cannot be empty.",
	}),
	waitTime: z.coerce
		.number()
		.nullable()
		.transform((num) => (num !== null ? num : 2)),
	navigationTime: z.coerce
		.number()
		.nullable()
		.transform((num) => (num !== null ? num : 30)),
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
		waitTime: formData.get("waitTime"),
		navigationTime: formData.get("navigationTime"),
	});

	if (!validatedFields.success) {
		return {
			message: String(validatedFields.error.flatten().fieldErrors.link),
		};
	}

	const waitTime = validatedFields.data.waitTime;
	const navigationTime = validatedFields.data.navigationTime;

	const url = removeTrailingSlash(validatedFields.data.link);

	const { htmlContent, failedAction } = await getHTMLContent(
		url,
		waitTime,
		navigationTime,
	);

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

async function getHTMLContent(
	url: string,
	waitTime: number,
	navigationTime: number,
) {
	const browser = await puppeteer.launch({
		headless: "new",
	});
	const page = await browser.newPage();
	let pageContent = "";
	let failedAction = false;

	try {
		await page.goto(url, { timeout: navigationTime * 1000 });
		await page.waitForTimeout(waitTime * 1000);
		pageContent = await page.content();
	} catch (err) {
		failedAction = true;
		pageContent = `Failed to get the site's HTML. Is the link valid? Error: ${err}`;
	}
	await browser.close();

	return { htmlContent: pageContent, failedAction: failedAction };
}
