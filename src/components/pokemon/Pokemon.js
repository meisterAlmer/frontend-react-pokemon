import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Pokemon.css";
import loading from "../../assets/images/loading.gif";

function Pokemon({ name }) {
  const [pokemon, setPokemon] = useState([]);
  const [isLoaded, toggleIsLoaded] = useState(false);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const fetchData = async function () {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`,
          {
            cancelToken: source.token,
          }
        );
        setPokemon(response.data);
        toggleIsLoaded(true);
      } catch (error) {
        console.error(error);
      }
      return () => source.cancel();
    };
    fetchData();
  }, []);

  return (
    <>
      <article className="card fade-in">
        {!isLoaded && (
          <section className="loader">
            <img src={loading} alt="loading" />
            <h4>Catching Pokemon...</h4>
          </section>
        )}
        {isLoaded && (
          <section>
            <div>
              <h1>{pokemon.name}</h1>
              {!pokemon.sprites.back_default && (
                <div className="no-img">
                  <p>No Image 😥</p>
                </div>
              )}
              {pokemon.sprites.back_default && (
                <div className="pokemon-img">
                  <img src={pokemon.sprites.back_default} alt={pokemon.name} />
                </div>
              )}
            </div>
            <div>
              <h3>Weight</h3>
              <p>{pokemon.weight}</p>
            </div>
            <div>
              <h3>Moves</h3>
              <p>{pokemon.moves.length}</p>
            </div>
            <div>
              <h3>Abilities</h3>
              <ul>
                {pokemon.abilities.map((ability) => {
                  return (
                    <li key={ability.ability.name}>{ability.ability.name}</li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}
      </article>
    </>
  );
}

export default Pokemon;
