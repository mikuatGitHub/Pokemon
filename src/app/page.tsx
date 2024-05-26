"use client"
import Image from "next/image";
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
fetchPokemon().then((pokemon) => {
  // console.log(`name: ${pokemon['name']}`);
  // console.log(`url: ${pokemon['sprites']['front_default']}`);
  // console.log(pokemon['types']['0']['type']['name']);
})


export default function Index() {
  // 画像切替のためにuseStateを用いる
  // const [pokemonImageUrl, setPokemonImageUrl] = useState("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png");
  const [pokemonImageUrl, setPokemonImageUrl] = useState("https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/025.png");

  const [pokemonID, setPokemonID] = useState("25");
  const [pokemonName, setPokemonName] = useState("pikachu");
  const [pokemonType, setPokemonType] = useState("electric");
  const [typeImg, settypeImg] = useState("icons/electric.svg");

  // ボタンのクリックイベント
  const handleClick = async() => {
    // setPokemonImageUrl(randomPokemonImage);

    const pokemon = await fetchPokemon();
    setPokemonImageUrl(`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${pokemon["id"]}.png`);
    setPokemonID(pokemon["id"]);
    setPokemonName(pokemon["name"]);
    setPokemonType(pokemon["types"]["0"]["type"]["name"]);
    settypeImg(`icons/${pokemon["types"]["0"]["type"]["name"]}.svg`);
  }

  return (
    <main className="flex items-center justify-center w-screen h-screen">

      <div className="flex-col text-center">
        <button
          onClick={handleClick}
          className="inline-flex items-center rounded-md bg-indigo-700 px-2 py-1 text-xl font-medium text-white ring-1 ring-inset ring-indigo-700/10"
        >
          ポケモンを出現させる！
        </button>

        <img src={pokemonImageUrl} className="m-3 w-60 h-60 bg-indigo-50 rounded-xl p-3" />
        <h2>{pokemonID}</h2>
        <h1>{pokemonName}</h1>

        <Image
          // src="/icons/electric.svg"
          src={typeImg}
          width={50}
          height={50}
          alt="typeimg"
          className="bg-indigo-600 rounded-full m-auto p-3"
        />
        <h3 className="text-indigo-600">{pokemonType}</h3>
      </div>

    </main>
  );
}
