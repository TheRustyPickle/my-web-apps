import puppeteer, { Browser, Page } from "puppeteer";

const MAX_LINK_LENGTH = 50;

/**
 *
 * @param url An url string
 * @returns An url string that does not end with /
 */
export function removeTrailingSlash(url: string): string {
	if (url.endsWith("/")) {
		return url.slice(0, -1);
	}
	return url;
}

/**
 *
 * @param link An url string
 * @returns String truncated to 50 chars
 */
export function truncateLink(link: string): string {
	if (link.length > MAX_LINK_LENGTH) {
		return `${link.substring(0, MAX_LINK_LENGTH)}...`;
	}
	return link;
}

/**
 *
 * @param url A url string
 * @param waitTime How long a browser should wait before capturing the HTML content. Default 2 seconds
 * @param navigationTime Maximum wait time for navigation. Default 30 seconds
 * @returns htmlContent in String and whether the fetching failed or not
 */
export async function getHTMLContent(
	url: string,
	waitTime: number,
	navigationTime: number,
) {
	let pageContent = "";
	let failedAction = false;

	let page: Page;
	let browser: Browser;

	// Can error when running on a server like on vercel
	try {
		browser = await puppeteer.launch({
			headless: true,
		});
		page = await browser.newPage();

		await page.setViewport({
			width: 1920,
			height: 1080,
		});
	} catch (err) {
		failedAction = true;
		pageContent = "Failed to create a browser tab.";
		return { htmlContent: pageContent, failedAction: failedAction };
	}

	try {
		await page.goto(url, { timeout: navigationTime * 1000 });
		pageContent = await page.content();
	} catch (err) {
		failedAction = true;
		pageContent = `Failed to get the site's HTML. Is the link valid? Error: ${err}`;
	}
	await browser.close();

	return { htmlContent: pageContent, failedAction: failedAction };
}

/**
 *
 * @param repoUrl A valid github repository Url
 * @returns The repo owner username and the repository name or null as error
 */
export function getUsernameRepo(repoUrl: string): [string, string] | null {
	const splittedLink = repoUrl.split("/");

	// Favor incomplete links such as without https and links with extra param at the end
	// As long as there is a github.com/username/repo. The other values won't have any impact
	const githubLocation = splittedLink.indexOf("github.com");

	if (githubLocation === -1) {
		return null;
	}

	const username = splittedLink[githubLocation + 1];
	const repoName = splittedLink[githubLocation + 2];

	if (!username || !repoName) {
		return null;
	}

	return [username, repoName];
}
