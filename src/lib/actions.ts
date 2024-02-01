"use server";

import { z } from "zod";
import { startParsing } from "./html_parser";
import { getHTMLContent, removeTrailingSlash } from "./utils";
import { fetchReleaseData } from "./repo_releases";

const ScraperFormSchema = z.object({
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

const RepoDLFormSchema = z.object({
	link: z.string().refine((data) => data.trim() !== "", {
		message: "Github Repository URL cannot be empty.",
	}),
});

export type ParserState = {
	message?: string | null;
	parsedDownloadables?: {
		fullLinks: string[];
		partialLinks: string[];
	};
};

export type ReleaseAsset = {
	assetName: string;
	downloadCount: number;
};

export type ReleaseData = {
	releaseName: string;
	releaseUrl: string;
	publishedAt: string;
	releaseDownload: number;
	releaseAssets: ReleaseAsset[];
};

export type RepoDLState = {
	message?: string | null;
	releases?: {
		releaseData: ReleaseData[];
		mostDownloaded: null | ReleaseData;
		totalDownload: number;
	};
};

export async function checkLink(
	prevState: ParserState,
	formData: FormData,
): Promise<ParserState> {
	const validatedFields = ScraperFormSchema.safeParse({
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

export async function checkRepoDL(
	prevState: RepoDLState,
	formData: FormData,
): Promise<RepoDLState> {
	const validatedFields = RepoDLFormSchema.safeParse({
		link: formData.get("repoLink"),
	});

	if (!validatedFields.success) {
		return {
			message: String(validatedFields.error.flatten().fieldErrors.link),
		};
	}

	const repoUrl = validatedFields.data.link;

	const releasesResponse = await fetchReleaseData(repoUrl);

	if (typeof releasesResponse !== "string") {
		const [releaseData, totalDownload, mostDownloaded] = releasesResponse;
		return { releases: { releaseData, totalDownload, mostDownloaded } };
	}

	return { message: releasesResponse };
}
