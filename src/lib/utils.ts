const MAX_LINK_LENGTH = 50;

export function removeTrailingSlash(url: string): string {
    if (url.endsWith('/')) {
        return url.slice(0, -1);
      }
      return url;
}

export function truncateLink (link: string): string {
	if (link.length > MAX_LINK_LENGTH) {
		return `${link.substring(0, MAX_LINK_LENGTH)}...`;
	}
	return link;
};