"use client"
import { useState } from "react"

// // エンドポイントからポケモンを3つ取得
// const pokemonImages: string[] = [
//   "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png",
//   "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/445.png",
//   "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/887.png",
// ];
// // ランダムに1つ指定
// const randomPokemonImage= (): string => {
//   const index = Math.floor(Math.random() * pokemonImages.length)
//   return pokemonImages[index];
// }


// PokeAPIからresponseを取得する
// 905の全ポケモンからランダムに1つのポケモンを指定
const fetchPokemon = async () => {
  // const res = await fetch("https://pokeapi.co/api/v2/pokemon/25");
  const index= Math.floor(Math.random()*905 +1)
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/"+index);
  const result = await res.json();
  return result;
}
// // 取得した1つのポケモンデータから任意のvalueを取得
// fetchPokemon().then((pokemon) => {
//   console.log(`id: ${pokemon['id']}`);
//   console.log(`name: ${pokemon['name']}`);
//   console.log(`url: ${pokemon['sprites']['front_default']}`);
// })


export default function Index() {
  // 画像切替のためにuseStateを用いる
  const [pokemonImageUrl, setPokemonImageUrl] = useState("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png");
  const [pokemonID, setPokemonID] = useState("25");
  const [pokemonName, setPokemonName] = useState("pikachu");

  // ボタンのクリックイベント
  const handleClick = async() => {
    // setPokemonImageUrl(randomPokemonImage);

    const pokemon = await fetchPokemon();
    setPokemonImageUrl(pokemon['sprites']['front_default']);
    setPokemonID(pokemon['id']);
    setPokemonName(pokemon['name']);
  }

  return (
    <main className="flex items-center justify-center w-screen h-screen">

    <div className="flex-col text-center">
    <button
      onClick={handleClick}
      className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
      ポケモンを出現させる
    </button>

    <img src={pokemonImageUrl} className="mx-auto"/>
    <p>{pokemonID}</p>
    <p>{pokemonName}</p>
    </div>

    </main>
  );
}
