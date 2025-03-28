"use client";
import Navbar from "@/components/ui/Navbar";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";


type Pokemon = {
  name: string;
  url: string;
};
function Home() {
   
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
 
  const [filteredData, setFilteredData] = useState<Pokemon[]>([]);
  
  const [visibleData, setVisibleData] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`
      );
      const fetchedData = response.data.results;
      setPokemonData(fetchedData);
      setFilteredData(fetchedData);

      setVisibleData(fetchedData.slice(0, itemsPerPage));
      setPage(1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedQuery) {
      const filtered = pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setFilteredData(filtered);
      // Reset visible data to first page when search changes
      setVisibleData(filtered.slice(0, itemsPerPage));
      setPage(1);
    } else {
      setFilteredData(pokemonData);
      setVisibleData(pokemonData.slice(0, itemsPerPage));
      setPage(1);
    }
  }, [debouncedQuery, pokemonData]);

  const loadMoreData = () => {
   

    const nextPage = page + 1;
    const startIndex = page * itemsPerPage;
    const endIndex = nextPage * itemsPerPage;
    const newItems = filteredData.slice(startIndex, endIndex);

    setVisibleData((prev) => [...prev, ...newItems]);
    setPage(nextPage);

 
  };

  const hasMoreData = page * itemsPerPage < filteredData.length;
   
  return (
    <div className="bg-[#f0f0f099] h-screen">
      <Navbar />
      <div className="p-4">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full  focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200 transition duration-200 ease-in-out "
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <p className="text-center text-gray-600 my-4 animate-pulse border w-[80vw] p-4 rounded-md bg-white shadow-md">
            Loading Pokémon data...
          </p>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={visibleData.length}
          next={loadMoreData}
          hasMore={hasMoreData}
          loader={
            <div
                 
                className="p-5 bg-white rounded-l-3xl rounded-r-md shadow-md flex justify-between items-center mb-2 mx-5 "
              >
                <p className="text-lg font-semibold">
                   
                </p>
                 
                 <div>

                 </div>
              </div>
          }
          endMessage={
            <div className="px-10">
              <p className="text-center self-center text-gray-600 my-4  border w-full p-4 rounded-md bg-white shadow-md">
                🎉 No more Pokémon to load!
              </p>
            </div>
          }
        >
          <div className="flex flex-col gap-2 py-2 mx-2 bg-[#f0f0f099]">
            {visibleData.map((pokemon, index) => (
              <div
                key={`${pokemon.name}-${index}`}
                className="p-5 bg-white rounded-l-3xl rounded-r-md shadow-md flex justify-between items-center mb-2 mx-5 "
              >
                <p className="text-lg font-semibold">
                  {pokemon.name.toUpperCase()}
                </p>
                <Link className="text-blue-600" href={`pages/pokemon/${pokemon.name}`}>View Details</Link>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}


export default Home;