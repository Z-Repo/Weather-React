export const geoAPIOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${process.env.apiKey}`,
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo"