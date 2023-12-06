import { REST, Routes } from "discord.js";
import * as commandModules from "../index";
import { ICommand } from "./commands.types";
import dotenv from "dotenv";
dotenv.config();

const commands = [];

for (const module of Object.values<ICommand>(commandModules)) {
  commands.push(module.data);
}

const rest = new REST();

rest
  .setToken(process.env.DISCORD_TOKEN)
  .put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.DISCORD_SERVER_ID
    ),
    { body: commands }
  )
  .then(() =>
    console.log("[deploy commands]: successfully registered commands")
  )
  .catch((error) =>
    console.log(`[deploy commands]: something bad happened ${error}`)
  );
