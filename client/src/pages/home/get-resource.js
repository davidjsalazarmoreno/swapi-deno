export default function getResource(uri) {
	const api = 'http://localhost:8000';

	return fetch(`${api}${uri}`)
		.then((r) => r.json())
		.then((data) => JSON.stringify(data, null, 4))
		.catch(() => 'No data for the requested resource');
}
