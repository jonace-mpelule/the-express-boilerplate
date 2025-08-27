export function bLog(
	message: string,
	options: {
		color?: 'GREEN' | 'RED';
	} = { color: 'GREEN' },
) {
	if (options.color == 'GREEN') {
		console.log('\x1b[32m', message, '\x1b[0m');
	} else if (options.color == 'RED') {
		console.log('\x1b[31m', message, '\x1b[0m');
	}
}
