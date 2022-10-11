import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import { convertHournsInMinutes } from "./utils/convertHournsInMinutes";
import { convertMinutesInHours } from "./utils/convertMinutesInHours";

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
  log: ["query"],
});

app.get("/games", async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });
  return response.json(games);
});

app.post("/games/:gameId/ads", async (request, response) => {
  const gameId = request.params.gameId;
  const body = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hourStart: convertHournsInMinutes(body.hourStart),
      hourEnd: convertHournsInMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return response.status(201).json(ad);
});

app.get("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return response.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesInHours(ad.hourStart),
        hourEnd: convertMinutesInHours(ad.hourEnd),
      };
    })
  );
});

app.get("/ads/:id/discord", async (request, response) => {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });
  return response.json({
    discord: ad.discord,
  });
});

app.listen(3333);

// SQLite
// Query Build ou ORM

// Intalar Prisma
// npm i prisma -D
// npx prisma init -h
// npx prisma init --datasource-provider SQLite
// Instalar extenção do prisma
// no arquivo .env DATABASE_URL="file:../src/database/db.sqlite"
// No arquivo schema.prisma que crio o banco de dados, com o comando model (como uma função - model Game {})
//
//npx prisma migrate dev

// O migrate serve para informar o que eu fiz, ou quais mudanças executei ()

// Baixar extenção SQLite
// Instalar o sudo para linux
// reiniciar o vscode
// clicar com botão direito no arquivo db.sqlite (dentro da pasta database)
// clicar em open database
// la no final dos arquivos vai ter uma "workspace da extenção, com meu banco de dados"

// npx prisma studio - gera uma interface grafica para navegar pelo banco de dados (substitui o acima)

// Rodar npx prisma generate - após configurar o banco de dados (adicionar os jogos)
// Serve para executar a conexão automatica

// Bibliotéca para fazer validação = zod JavaScript
