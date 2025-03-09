import { Octokit } from "octokit";
import { paginateRest } from "@octokit/plugin-paginate-rest";
import { getUsernameRepo } from "./utils";
import { RequestError } from "octokit";
import type { ReleaseData, ReleaseAsset } from "./actions";
import { unstable_noStore as noStore } from "next/cache";

/**
 *
 * @param repoUrl A valid github repo url
 * @returns An array containing release info + total downloads or an error message in string
 */
export async function fetchReleaseData(
	repoUrl: string,
): Promise<[ReleaseData[], number, ReleaseData | null] | string> {
	noStore();
	const usernameRepo = getUsernameRepo(repoUrl);

	if (!usernameRepo) {
		return "Failed to get Github repository information. Is the link a valid GitHub Repository URL?";
	}

	const [username, repoName] = usernameRepo;

	// Create an octo client
	const octo = Octokit.plugin(paginateRest);
	const O = new octo();

	const parameters = { owner: username, repo: repoName, per_page: 100 };
	const releaseData: ReleaseData[] = [];
	// Total download from all releases
	let totalDownload = 0;
	let mostDownloaded: null | ReleaseData = null;

	try {
		for await (const response of O.paginate.iterator(
			"GET /repos/{owner}/{repo}/releases",
			parameters,
		)) {
			const releases = response.data;

			for (const release of releases) {
				const { html_url: releaseUrl, assets, published_at, name } = release;

				const publishedAt = published_at ?? "Not Available";
				const releaseName = name ?? "Not Available";
				// Total download for this specific release
				let releaseDownload = 0;
				const assetList: ReleaseAsset[] = [];

				for (const asset of assets) {
					const { name: assetName, download_count: downloadCount } = asset;
					totalDownload += downloadCount;
					releaseDownload += downloadCount;
					const to_push: ReleaseAsset = { assetName, downloadCount };
					assetList.push(to_push);
				}

				releaseData.push({
					releaseUrl,
					releaseAssets: assetList,
					releaseName,
					publishedAt,
					releaseDownload,
				});

				if (!mostDownloaded) {
					mostDownloaded = {
						releaseUrl,
						releaseAssets: assetList,
						releaseName,
						publishedAt,
						releaseDownload,
					};
				} else if (releaseDownload > mostDownloaded.releaseDownload) {
					mostDownloaded = {
						releaseUrl,
						releaseAssets: assetList,
						releaseName,
						publishedAt,
						releaseDownload,
					};
				}
			}
		}
	} catch (err) {
		if (err instanceof RequestError) {
			switch (err.status) {
				case 404:
					return "Error 404. Repository not found";
				case 403:
					return "Error 403. Forbidden: You may not have permission to access the repository";

				default:
					return `An error occurred: ${err}`;
			}
		}
		return `An unknown error occurred: ${err}`;
	}
	return [releaseData, totalDownload, mostDownloaded];
}
