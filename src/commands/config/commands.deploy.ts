import { REST, Routes } from "discord.js";
import * as commandModules from "../index";
import { ICommand } from "./commands.types";
import dotenv from "dotenv";
import { env } from "../../config/env";
dotenv.config();

const commands = [];

for (const module of Object.values<ICommand>(commandModules)) {
  commands.push(module.data);
}

const rest = new REST();

rest
  .setToken(env.DISCORD_TOKEN)
  .put(Routes.applicationGuildCommands(env.CLIENT_ID, env.DISCORD_SERVER_ID), {
    body: commands,
  })
  .then(() =>
    console.log("[deploy commands]: successfully registered commands")
  )
  .catch((error) =>
    console.log(`[deploy commands]: something bad happened ${error}`)
  );
