import React, { useState, useEffect } from "react";
import axios from "axios";
import Pokemon from "./components/pokemon/Pokemon";
import Navigation from "./components/navigation/Navigation";
import "./App.css";
import logo from "./assets/images/logo.png";

function App() {
  const [listLength, setListLength] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [listLimit, setListLimit] = useState(20);
  const [listOffset, setListOffset] = useState(0);
  const [isLoaded, toggleIsLoaded] = useState(false);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const fetchData = async function () {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${listLimit}&offset=${listOffset}`,
          {
            cancelToken: source.token,
          }
        );
        setPokemonList(response.data.results);
        setListLength(response.data.count);
        toggleIsLoaded(true);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      }
    };
    fetchData();
    return () => source.cancel();
  }, [listOffset, listLimit]);

  return (
    <main>
      <img className="logo" src={logo} alt="logo" />
      <Navigation
        setListOffset={setListOffset}
        listOffset={listOffset}
        listLimit={listLimit}
        listLength={listLength}
        isLoaded={isLoaded}
        setListLimit={setListLimit}
      />

      <section className="pokemon-list">
        {isLoaded &&
          pokemonList.map((item) => {
            return <Pokemon name={item.name} key={item.name}></Pokemon>;
          })}
      </section>
    </main>
  );
}

export default App;
