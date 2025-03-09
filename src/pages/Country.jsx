import { useEffect, useState, useTransition } from "react";
import { getCountryData } from "../api/postApi";
import { Loader } from "../components/UI/Loader";
import { CountryCard } from "../components/Layout/CountryCard";
import { SearchFilter } from "../components/UI/SerachFilter";

export const Country = () => {
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await getCountryData();
        console.log("API Response:", res); // Log the response
        if (res && Array.isArray(res)) {
          setCountries(res); // Use the response directly if it's an array
        } else if (res && res.data) {
          setCountries(res.data); // Fallback to res.data if it exists
        } else {
          console.error("Unexpected API response:", res);
          setCountries([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Error fetching country data:", error);
        setCountries([]); // Fallback to an empty array
      }
    });
  }, []);

  if (isPending) return <Loader />;

  const searchCountry = (country) => {
    if (search) {
      return country.name.common.toLowerCase().includes(search.toLowerCase());
    }
    return country;
  };

  const filterRegion = (country) => {
    if (filter === "all") return country;
    return country.region === filter;
  };

  const filterCountries = Array.isArray(countries)
    ? countries.filter((country) => searchCountry(country) && filterRegion(country))
    : [];

  return (
    <section className="country-section">
      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        countries={countries}
        setCountries={setCountries}
      />

      {filterCountries.length > 0 ? (
        <ul className="grid grid-four-cols">
          {filterCountries.map((curCountry, index) => (
            <CountryCard country={curCountry} key={index} />
          ))}
        </ul>
      ) : (
        <p>No countries found.</p>
      )}
    </section>
  );
};