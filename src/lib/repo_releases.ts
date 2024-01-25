import { Octokit } from "octokit";
import { paginateRest } from "@octokit/plugin-paginate-rest";
import { getUsernameRepo } from "./utils";
import { RequestError } from "octokit";
import { ReleaseData, ReleaseAsset } from "./actions";

export async function fetchReleaseData(
	repoUrl: string,
): Promise<[ReleaseData[], number] | string> {
	const usernameRepo = getUsernameRepo(repoUrl);

	if (!usernameRepo) {
		return "Failed to get Github repository information. Is the link a valid GitHub URL?";
	}

	const [username, repoName] = usernameRepo;

	const octo = Octokit.plugin(paginateRest);
	const O = new octo();

	const parameters = { owner: username, repo: repoName, per_page: 100 };
	const releaseData: ReleaseData[] = [];
	let totalDownload = 0;

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

				const assetList: ReleaseAsset[] = [];

				for (const asset of assets) {
					const { name: assetName, download_count: downloadCount } = asset;
					totalDownload += downloadCount;
					const to_push: ReleaseAsset = { assetName, downloadCount };
					assetList.push(to_push);
				}

				releaseData.push({
					releaseUrl,
					releaseAssets: assetList,
					releaseName,
					publishedAt,
				});
			}
		}
	} catch (err) {
		if (err instanceof RequestError) {
			switch (err.status) {
				case 404:
					return "Repository not found";
				case 403:
					return "Forbidden: You may not have permission to access the repository";

				default:
					return `An error occurred: ${err}`;
			}
		}
		return `An unknown error occurred: ${err}`;
	}
	return [releaseData, totalDownload];
}
