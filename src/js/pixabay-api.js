import axios from "axios";

const API_KEY = "54666795-342cd36b10c863945e9f956f4";
const PER_PAGE = 15;
export async function getImagesByQuery(query, page = 1) {

  const BASE_URL = "https://pixabay.com/api/";

  const params = {
  key: API_KEY,
  q: query,
  image_type: "photo",
  orientation: "horizontal",
  safesearch: true,
  page: page,
  per_page: PER_PAGE,
};

  const response = await axios.get(BASE_URL, { params });

  return response.data;

}
