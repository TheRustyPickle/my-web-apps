import * as cheerio from "cheerio";
import { truncateLink } from "./utils";

export function startParsing(htmlContent: string, link: string) {
	const rootUrl = extractRootUrl(link);

	const $ = cheerio.load(htmlContent);
	let downloadables: string[] = [];
	$("img, video, audio, source, a, embed, object, iframe, link").each(
		(index, element) => {
			const tagName = element.tagName.toLowerCase();
			if (
				tagName === "img" ||
				tagName === "source" ||
				tagName === "audio" ||
				tagName === "embed" ||
				tagName === "object" ||
				tagName === "iframe"
			) {
				const src = $(element).attr("src");
				downloadables = addToList(downloadables, src, rootUrl);
			} else if (tagName === "a") {
				const href = $(element).attr("href");
				if (href && /\.(pdf|docx|xlsx|txt)$/i.test(href)) {
					downloadables = addToList(downloadables, href, rootUrl);
				}
			}
		},
	);
	const newLinks = separateLinks(downloadables);

	return {
		fullLinks: downloadables,
		partialLinks: newLinks,
	};
}

function addToList(
	currentList: string[],
	toAdd: string | undefined,
	rootUrl: string,
) {
	if (!toAdd) {
		return currentList;
	}

	let linkToAdd = "";

	if (toAdd.startsWith("https://") || toAdd.startsWith("http://")) {
		if (!currentList.includes(toAdd)) {
			linkToAdd = toAdd;
		}
	} else if (toAdd.startsWith("data:")) {
		if (!currentList.includes(toAdd)) {
			linkToAdd = toAdd;
		}
	} else {
		let properLink = "";

		if (toAdd.startsWith("/")) {
			properLink = rootUrl + toAdd;
		} else {
			properLink = `${rootUrl}/${toAdd}`;
		}

		if (!currentList.includes(properLink)) {
			linkToAdd = properLink;
		}
	}

	if (!(linkToAdd === "")) {
		currentList.push(linkToAdd);
	}

	return currentList;
}

/**
 * Truncate links to the last two parts of the url. If not a http url, replaces with a custom text
 * @param links A list of URLs
 * @returns Truncated links
 */
function separateLinks(links: string[]): string[] {
	const cleanLinks: string[] = [];

	for (const link of links) {
		if (link.startsWith("data")) {
			cleanLinks.push("Right Click => Open in New Tab to view");
		} else {
			const splitted = link.split("/");
			const lastTwo = splitted.slice(-2).join("/");
			cleanLinks.push(truncateLink(lastTwo));
		}
	}

	return cleanLinks;
}

function extractRootUrl(url: string): string {
	const urlObject = new URL(url);
	return `${urlObject.protocol}//${urlObject.hostname}${
		urlObject.port ? `:${urlObject.port}` : ""
	}`;
}
