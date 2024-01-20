import * as cheerio from "cheerio";
import { truncateLink } from "./utils";

export function startParsing(htmlContent: string, link: string) {
	const $ = cheerio.load(htmlContent);
	let downloadables: string[] = [];

	$("img, video source").each((index, element) => {
		const tagName = element.tagName.toLowerCase();
		if (tagName === "img") {
			const src = $(element).attr("src");
			downloadables = addToList(downloadables, src, link);
		} else if (tagName === "source") {
			const src = $(element).attr("src");
			downloadables = addToList(downloadables, src, link);
		}
	});
	const newLinks = separateLinks(downloadables);

	return {
		fullLinks: downloadables,
		partialLinks: newLinks,
	};
}

function addToList(
	currentList: string[],
	toAdd: string | undefined,
	baseUrl: string,
) {
	if (!toAdd) {
		return currentList;
	}

	if (toAdd.startsWith("https")) {
		if (!currentList.includes(toAdd)) {
			currentList.push(toAdd);
		}
	} else {
		let properLink = "";

		if (toAdd.startsWith("/")) {
			properLink = baseUrl + toAdd;
		} else {
			properLink = `${baseUrl}/${toAdd}`;
		}

		if (!currentList.includes(properLink)) {
			currentList.push(properLink);
		}
	}

	return currentList;
}

function separateLinks(links: string[]): string[] {
	const cleanLinks: string[] = [];

	for (const link of links) {
		const splitted = link.split("/");
		const lastTwo = splitted.slice(-2).join("/");
		cleanLinks.push(truncateLink(lastTwo));
	}

	return cleanLinks;
}
