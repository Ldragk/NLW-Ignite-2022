// import "./style.css"; // Não precisa colocar no index.html - o vite faz isso automaticamente.

import "./styles/main.css";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { useState, useEffect } from "react";
import axios from "axios";
import logoImg from "./assets/logo-nlw-esports.png";
import * as Dialog from "@radix-ui/react-dialog";


import { CreateAdModal } from "./components/Forms/CreateAdModal";


interface Game {
  id: string;
  title: string;
  bannerURL: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
      // useEffect(() => {
      //   fetch("http://localhost:3333/games")
      //     .then((response) => response.json())
      //     .then((data) => {
      //       setGames(data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img className="w-80" src={logoImg} alt="" />

      <h1 className="text-5xl text-white font-black mt-14">
        Seu{" "}
        <span className="bg-gradient bg-clip-text text-transparent">duo</span>{" "}
        está aqui
      </h1>

      <div className="grid grid-cols-6 gap-5 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerURL={game.bannerURL}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>
      <Dialog.Root>

        <CreateAdBanner />

        <CreateAdModal />
        
      </Dialog.Root>
    </div>
  );
}
export default App;

// PAREI NO VIDEO 4 1:10