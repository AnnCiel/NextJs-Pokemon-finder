"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link"; // Make sure to import Link from next/router
import Image from "next/image"; // Import Image component from next/image

function PokeData() {
  const [poke, setPoke] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchPokeData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon");
        const pokeData = await response.json();
        console.log(pokeData);
        setPoke(pokeData.results);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchPokeData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container text-center mx-auto ">
      <div className="grid grid-cols-5 ">
        {poke.map((item, index) => (
          <Link
            key={index}
            href={`/pokeinfo/[id]}`}
            as={`/pokeinfo/${index + 1}`}
          >
            <div key={index} className="flex justify-center items-center shadow-md transition cursor-pointer hover:shadow-lg m-3 rounded-md bg-white  text-center">
              <div>
              <h3>{item.name}</h3>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`}
                width={150}
                height={150}
              />

              </div>
             
              </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PokeData;