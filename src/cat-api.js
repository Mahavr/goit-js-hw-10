const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_jkqviQyYJviWjKkAhustp0yB2HcTbPFJB4hx5I0z29YCckmQlZW8tQdr8i9Cj9Dm';

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}
export function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}
