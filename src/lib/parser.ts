import * as cheerio from "cheerio";
import { truncateLink } from "./utils";

export function startParsing(htmlContent: string, link: string) {
	const $ = cheerio.load(htmlContent);
	const downloadables: string[] = [];
	$("img, video source").each((index, element) => {
		const tagName = element.tagName.toLowerCase();
		if (tagName === "img") {
			const src = $(element).attr("src");
			if (src) {
				if (src.startsWith("https")) {
					if (!downloadables.includes(src)) {
						downloadables.push(src);
					}
				} else {
					if (!downloadables.includes(src + link)) {
						downloadables.push(link + src);
					}
				}
			}
		} else if (tagName === "source") {
			const src = $(element).attr("src");
			if (src) {
				if (src.startsWith("https")) {
					if (!downloadables.includes(src)) {
						downloadables.push(src);
					}
				} else {
					if (!downloadables.includes(src + link)) {
						downloadables.push(link + src);
					}
				}
			}
		}
	});
	const newLinks = cleanLinks(downloadables);

	return {
		fullLinks: downloadables,
		parsedLinks: newLinks,
	};
}

function cleanLinks(links: string[]): string[] {
	const cleanLinks: string[] = [];

	for (const link of links) {
		const splitted = link.split("/");
		const lastTwo = splitted.slice(-2).join("/");
		cleanLinks.push(truncateLink(lastTwo));
	}

	return cleanLinks;
}
