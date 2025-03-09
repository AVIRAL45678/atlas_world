import axios from "axios";

const api = axios.create({
  baseURL: "https://restcountries.com/v3.1", // ✅ Correct API URL
});

// Get all countries
export const getCountryData = async () => {
  try {
    const response = await api.get("/all?fields=name,population,region,capital,flags");
    return response.data;
  } catch (error) {
    console.error("Error fetching country data:", error);
    return [];
  }
};

// Get single country
export const getCountryIndData = async (name) => {
  try {
    const response = await api.get(`/name/${name}?fullText=true`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for ${name}:`, error);
    return null;
  }
};
