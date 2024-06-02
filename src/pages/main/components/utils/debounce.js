export const debounce = (func, wait) => {
	let timeoutId

	return (...args) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(func, wait, args)
	}
}
