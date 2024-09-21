"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function PokeInfo() {
  const params = useParams();
  console.log(params);

  const [poke, setPoke] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchPokeDetails = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${params.id}`
        );
        const pokeData = await response.json();

        setPoke(pokeData);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchPokeDetails();
  }, []);

  console.log(poke);

  return (
    <div className="p-24">
      <div className="flex justify-center items-center mt-10 text-center">
        <div className="shadow-md p-10 rounded-md">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <h3 className="text-3xl">{poke.name}</h3>
              <Image
                src={poke.sprites?.other.home.front_default}
                height={300}
                width={300}
                alt={poke.name}
              />
              <div className="mt-5">
                <p className="my-3">Weight : {poke.weight}</p>
                <p className="my-3">
                  Abilities : {""}
                  {poke.abilities?.map((val) => (
                    <span
                      key={val.ability.name}
                      className="bg-gray-500 text-white px-3 py-1 rounded-md"
                    >
                      {val.ability.name}
                    </span>
                  ))}
                </p>
                <p className="my-3">
                  Type: {""}
                  {poke.types?.map((val) => (
                    <span
                      key={val.type.name}
                      className="bg-gray-500 text-white px-3 py-1 rounded-md"
                    >
                      {val.type.name}
                    </span>
                  ))}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <Link href="/" className="bg-blue-500 text-white p-3 rounded-md">
        Back
      </Link>
    </div>
  );
}

export default PokeInfo;
