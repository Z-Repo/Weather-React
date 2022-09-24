export const geoAPIOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": `${process.env.REACT_APP_GEO_KEY}`,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidAPI.com",
  },
};

export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

console.log(process.env);
console.log(process.env.REACT_APP_GEO_KEY);
