"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/ui/Navbar";
function PokemonDetailedView() {
  const params = useParams();
  const id = params.id as string;
  const [pokemonData, setPokemonData] = useState({
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
  }, []);

  useEffect(() => {
    console.log(pokemonData, "Pokemon Data");
  }, [pokemonData]);
  const fetchPokemonDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    
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
    }finally{
      setLoading(false);
    }
  };
  
  return (
    <div className="h-screen">
      <Navbar />
      {loading?<div>Loading....</div>
      :<div className="h-[90vh] flex ">
        <div className=" h-full w-[50%] p-5 flex  ">
          <div className="  m-5 rounded-2xl shadow-lg bg-[#f2f2f2] p-10">
            <img
              src={pokemonData.image}
              alt="Pokemon"
              className="h-full w-full "
            />
            <span className="uppercase bg-blue-700 p-2 text-white rounded-2xl mt-2">{id}</span>
          </div>
        </div>
        <div></div>
      </div>}
    </div>
  );
}

export default PokemonDetailedView;
