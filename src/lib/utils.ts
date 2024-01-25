import puppeteer from "puppeteer";

const MAX_LINK_LENGTH = 50;

export function removeTrailingSlash(url: string): string {
	if (url.endsWith("/")) {
		return url.slice(0, -1);
	}
	return url;
}

export function truncateLink(link: string): string {
	if (link.length > MAX_LINK_LENGTH) {
		return `${link.substring(0, MAX_LINK_LENGTH)}...`;
	}
	return link;
}

export async function getHTMLContent(
	url: string,
	waitTime: number,
	navigationTime: number,
) {
	const browser = await puppeteer.launch({
		headless: "new",
	});
	const page = await browser.newPage();

	await page.setViewport({
		width: 1920,
		height: 1080,
	});

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

export function getUsernameRepo(repoUrl: string): [string, string] | null {
	const splittedLink = repoUrl.split("/");

	// Will still work if https is not present in the url
	const githubLocation = splittedLink.indexOf("github.com");

	if (githubLocation === -1) {
		return null;
	}

	const username = splittedLink[githubLocation + 1];
	const repoName = splittedLink[githubLocation + 2];

	return [username, repoName];
}
