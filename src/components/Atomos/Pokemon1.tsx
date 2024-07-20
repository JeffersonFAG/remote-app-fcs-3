import React, { useState, useEffect } from "react";
import styles from "./Pokemon3.module.css";

interface PokemonProps {
  id: number;
}

interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
  };
}

function Pokemon1({ id }: PokemonProps) {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);

  useEffect(() => {
    const fetchPokemon = async (pokemonId: number) => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      const data: PokemonData = await response.json();
      setPokemon(data);
    };

    fetchPokemon(id);
  }, [id]);

  useEffect(() => {
    const handlePokemonChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ id: number }>;
      const fetchPokemon = async (pokemonId: number) => {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        const data: PokemonData = await response.json();
        setPokemon(data);
      };

      fetchPokemon(customEvent.detail.id);
    };

    window.addEventListener("changePokemon", handlePokemonChange);

    return () => {
      window.removeEventListener("changePokemon", handlePokemonChange);
    };
  }, []);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
  );
}

export default Pokemon1;
