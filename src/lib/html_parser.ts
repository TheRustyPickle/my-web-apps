import * as cheerio from "cheerio";
import { truncateLink } from "./utils";

const tagsToExtract = [
	{ tag: "img", attribute: "src" },
	{ tag: "source", attribute: "src" },
	{ tag: "audio", attribute: "src" },
	{ tag: "embed", attribute: "src" },
	{ tag: "object", attribute: "data" },
	{ tag: "iframe", attribute: "src" },
	{ tag: "a", attribute: "href" },
];

const allowedExtensions =
	/\.(pdf|docx|xlsx|txt|svg|png|jpg|jpeg|webp|mkv|mp4|mp3|gif|bmp|tif|tiff|ico|mp3|wav|ogg|html|htm|css|js|json|zip|rar|tar|gz)(\?.*)?$/i;

export function startParsing(htmlContent: string, link: string) {
	const rootUrl = extractRootUrl(link);

	const $ = cheerio.load(htmlContent);
	let downloadables: string[] = [];
	for (const { tag, attribute } of tagsToExtract) {
		$(tag).each((index, element) => {
			const value = $(element).attr(attribute);

			// These three are safe to say that will contain a proper source for something downloadable
			if (tag === "img" || tag === "source" || tag === "audio") {
				downloadables = addToList(downloadables, value, rootUrl);
			} else {
				if (value && allowedExtensions.test(value)) {
					downloadables = addToList(downloadables, value, rootUrl);
				}
			}
		});
	}
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
