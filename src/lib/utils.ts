/**
 *
 * @param repoUrl A valid github repository Url
 * @returns The repo owner username and the repository name or null as error
 */
export function getUsernameRepo(repoUrl: string): [string, string] | null {
	const split_link = repoUrl.split("/");

	// Favor incomplete links such as without https and links with extra param at the end
	// As long as there is a github.com/username/repo. The other values won't have any impact
	const githubLocation = split_link.indexOf("github.com");

	if (githubLocation === -1) {
		return null;
	}

	const username = split_link[githubLocation + 1];
	const repoName = split_link[githubLocation + 2];

	if (!username || !repoName) {
		return null;
	}

	return [username, repoName];
}
