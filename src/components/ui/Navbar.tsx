import React from "react";
import Image from "next/image";
 
import PokemonLogo from "../../../public/PokemonLogo.png";
function Navbar() {
  return (
    <div
      className="bg-[#ef5350]  "
      style={{
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        paddingTop: 5,
        paddingBottom: 5,
      }}
    >
      <Image src={PokemonLogo} alt="Pokemon Logo" width={200} height={100} />
    
    </div>
  );
}

export default Navbar;
