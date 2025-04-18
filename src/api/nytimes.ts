import { Article, NYTimesResponse } from "../types";
import { apiCache } from "../utils/api-cache";

const API_KEY = "7q1kMr8wDrvoX0WJRnEBDVyV02AXGsov";
const BASE_URL = "https://api.nytimes.com/svc/mostpopular/v2";

export const fetchMostPopular = async (
  period: number = 7
): Promise<NYTimesResponse> => {
  const cacheKey = `mostPopular-${period}`;
  const cachedData = apiCache.get(cacheKey) as NYTimesResponse | null;

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/viewed/${period}.json?api-key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: NYTimesResponse = await response.json();
    apiCache.set(cacheKey, data); // Cache the response
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchArticleById = async (
  period: number,
  id: number
): Promise<Article> => {
  const cacheKey = `mostPopular-${period}`;
  const cachedData = apiCache.get(cacheKey) as NYTimesResponse | null;
  if (cachedData) {
    const article = cachedData.results.find((a) => a.id === id);
    if (article) return article;
  }

  const response = await fetchMostPopular(period);
  const article = response.results.find((a) => a.id === id);

  if (!article) {
    throw new Error(`Article with ID ${id} not found or invalid`);
  }

  return article;
};
