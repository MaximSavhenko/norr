export const formatDate = (date: string) =>
	new Date(date).toLocaleString('uk-UA', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	})
