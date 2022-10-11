import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { Check, GameController } from "phosphor-react";
import { Input } from "./Input";
import { useEffect, useState, FormEvent } from "react";
import axios from "axios";

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  async function handleCreatAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.nickname && data.discord) {
      return;
    }

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.nickname,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });
      alert("Anúncio criado com sucesso!");
    } catch (err) {
      console.log(err);
      alert("Erro ao criar anúncio!");
    }

    console.log(data);
    console.log(weekDays);
    console.log(useVoiceChannel);
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[30rem] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleCreatAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Selecione o jogo
            </label>

            <select
              id="game"
              name="game"
              className="bg-zinc-900 py-3 px-4 rounded text-sm text-zinc-500"
              defaultValue=""
            >
              {games.map((game) => {
                return (
                  <option key={game.id} value={game.id}>
                    {game.title}
                  </option>
                );
              })}
            </select>

            {/* <Select.Root>
              <Select.SelectTrigger className="bg-zinc-900 py-3 px-4 min-h-[42px] rounded text-sm text-zinc-400  flex items-center">
                <Select.Value className="" 
                 />
                <Select.Icon className="absolute right-12"/>
              </Select.SelectTrigger>

              <Select.Portal>
                <Select.Content>
                  <Select.ScrollUpButton />
                  <Select.Viewport className="py-3 px-2 mt-[120px]">
                    <Select.Item
                      className=" pl-4 py-4 text-white bg-zinc-900 cursor-pointer"
                      value="item"
                    >
                      {games.map((game) => {
                        return (
                          <option key={game.id} value={game.id}>
                            {game.title}
                          </option>
                        );
                      })}

                      <Select.ItemText />
                      <Select.ItemIndicator />
                    </Select.Item>

                    <Select.Separator />
                  </Select.Viewport>
                  <Select.ScrollDownButton />
                </Select.Content>
              </Select.Portal>
            </Select.Root> */}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="nickname">
              Seu Nickname
            </label>
            <Input
              name="nickname"
              id="nickname"
              type="text"
              placeholder="Escreva seu nickname"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="yearsPlaying">
                A quanto tempo joga
              </label>
              <Input
                name="yearsPlaying"
                id="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser zero"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="discord">
                Seu Discord
              </label>
              <Input
                name="discord"
                id="discord"
                type="text"
                placeholder="Usuário#0000"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="weekDays">
                Selecione os dias da semana que você joga
              </label>
              <ToggleGroup.Root
                type="multiple"
                className="flex gap-[10px]"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  className={`text-[20px] w-12 h-12 rounded-sm ${
                    weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Domingo"
                >
                  D
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="1"
                  className={`text-[20px] w-12 h-12 rounded-sm ${
                    weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Segunda"
                >
                  S
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="2"
                  className={`text-[20px] w-12 h-12 rounded-sm ${
                    weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Terça"
                >
                  T
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="3"
                  className={`text-[20px] w-12 h-12 rounded-sm ${
                    weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Quarta"
                >
                  Q
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="4"
                  className={`text-[20px] w-12 h-12 rounded-sm ${
                    weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Quinta"
                >
                  Q
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="5"
                  className={`text-[20px] w-12 h-12 rounded-sm ${
                    weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Sexta"
                >
                  S
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="6"
                  className={`text-[20px] w-12 h-12 rounded-sm ${
                    weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Sabado"
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex flex-col gap-2 flex-1">
              <label className="font-semibold" htmlFor="hourStart">
                Qual horário?
              </label>
              <div className="m-auto grid grid-cols-2 gap-1 h-12 font-bold">
                <Input
                  name="hourStart"
                  id="hourStart"
                  type="time"
                  placeholder="De"
                />
                <Input
                  name="hourEnd"
                  id="hourEnd"
                  type="time"
                  placeholder="Até"
                />
              </div>
            </div>

            <div className="mt-8 ml-6 font-semibold flex gap-2">
              <Checkbox.Root
                checked={useVoiceChannel}
                onCheckedChange={(checked) => {
                  checked === true
                    ? setUseVoiceChannel(true)
                    : setUseVoiceChannel(false);
                }}
                className="w-6 h-6 rounded p-1 bg-zinc-900"
              >
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Uso chat de voz
            </div>
          </div>

          <footer className="mt-4 flex justify-center gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>

            <button
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
              type="submit"
            >
              <GameController size={24} />
              Encontrar Duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
