export const getLastPageFromLinks = (links) => {
	const match = links.match(/<[^>]*[?&]_page=(\d+)[^>]*>; rel="last"/)
	return match ? Number(match[1]) : null
}
