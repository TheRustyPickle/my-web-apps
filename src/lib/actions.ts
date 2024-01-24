"use server";

import { z } from "zod";
import { startParsing } from "./parser";
import { getHTMLContent, removeTrailingSlash } from "./utils";

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

export async function checkRepoDL(prevState: number, formData: FormData): Promise<number> {
	console.log("To do add repo checking");
	return 0;
}
