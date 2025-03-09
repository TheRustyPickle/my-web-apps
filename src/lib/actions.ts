"use server";

import { z } from "zod";
import { fetchReleaseData } from "./repo_releases";

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

export async function checkRepoDL(
	_prevState: RepoDLState,
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
