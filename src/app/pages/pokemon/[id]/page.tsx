"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/ui/Navbar";
import Image from "next/image";
function PokemonDetailedView() {
  const params = useParams();
  const id = params.id as string;
  const [pokemonData, setPokemonData] = useState<{
    image: string;
    abilities: { ability: { name: string } }[];
    type: { type: { name: string } }[];
    stats: { stat: { name: string }; base_stat: number }[];
    moves: { move: { name: string } }[];
    name: string;
  }>({
    image: "",
    abilities: [],
    type: [],
    stats: [],
    moves: [],
    name: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemonDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(pokemonData, "Pokemon Data");
  }, [pokemonData]);
  const fetchPokemonDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setPokemonData((prevState: any) => ({
        ...prevState,
        image: res.data?.sprites?.other?.dream_world?.front_default,
        abilities: res.data.abilities,
        type: res.data.types,
        stats: res.data.stats,
        moves: res.data.moves,
        name: res.data.name,
      }));
    } catch (err) {
      console.log(err, "Pokemon Details Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <Navbar />
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div className="h-[90vh] flex ">
          <div className=" h-full w-[50%] p-5 flex  ">
            <div className="relative  m-5 rounded-2xl shadow-lg bg-[#f2f2f2] p-10">
              <span className="absolute top-[-20] left-[-20] uppercase bg-blue-700 p-2 text-white rounded-2xl mt-2 animate-bounce">
                {id}
              </span>
              <Image
                src={pokemonData.image}
                alt="Pokemon"
                className="h-full w-full "
                width={100}
                height={200}
              />
            </div>
          </div>
          <div className="p-5 w-full overflow-scroll">
            <div>
              <h1 className="text-3xl font-bold mb-4 mt-5 underline">
                {pokemonData.name}
              </h1>
              <h2 className="text-lg font-semibold mb-1">Abilities:</h2>
              <div className="flex flex-row flex-wrap">
                {pokemonData.abilities.map((ability, index) => (
                  <div
                    className="ml-5 bg-blue-400 px-4 py-2 rounded-xl text-white shadow-2xl"
                    key={index}
                  >
                    {ability.ability.name}
                  </div>
                ))}
              </div>

              <h2 className="text-lg font-semibold mb-1">Types:</h2>
              <div className="flex flex-row flex-wrap">
                {pokemonData.type.map((type, index) => (
                  <div className="ml-5 bg-cyan-500 px-4 py-2 rounded-xl text-white shadow-2xl" key={index}>
                    {type.type.name}
                  </div>
                ))}
              </div>

              <h2 className="text-lg font-semibold mb-1">Stats:</h2>
              <div className="flex flex-row flex-wrap">
              {pokemonData.stats.map((stat, index) => (
                <div className="ml-5 bg-emerald-300 px-4 py-2 rounded-xl text-white shadow-2xl" key={index}>
                  {stat.stat.name}: {stat.base_stat}
                </div>
              ))}
              </div>
              <h2 className="text-lg font-semibold mb-1">Moves:</h2>
              <div className="flex flex-row flex-wrap gap-y-2">
              {pokemonData.moves.map((move, index) => (
                <p className="ml-5 bg-gray-500 px-4 py-2 rounded-xl text-white shadow-2xl " key={index}>
                  {move.move.name}
                </p>
              ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonDetailedView;
