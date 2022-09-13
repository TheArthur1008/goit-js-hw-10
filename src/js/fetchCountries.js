export const fetchCounries = countryName => {
    const BASE_URL = 'https://restcountries.com/v3.1/name/';
    const SEARCH_PARAMS = '?fields=name,capital,population,flags,languages';

    return fetch(`${BASE_URL}${countryName}${SEARCH_PARAMS}`).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        // console.log(response.json());
        return response.json();
    })
}