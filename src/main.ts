import { Client, GatewayIntentBits } from "discord.js";
import * as CommandModules from "./commands";
import { env } from "./config/env";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DailyCronJobs } from "./cronjobs";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
  ],
});

client.login(env.DISCORD_TOKEN);

client.once("ready", (bot) => {
  console.log(
    `[${bot.user.username}]: 🚀🫡Ready! bot is running and logged as ${bot.user.tag}`
  );
});

client.once("shardError", (error) => {
  console.error(`[bot]: something bad happened, ${error.message}`);
});

const commands = Object(CommandModules);

client.on("interactionCreate", async (interaction) => {
  // this validations changes what discord pass to de functions
  if (interaction.isCommand()) {
    const { commandName } = interaction;
    commands[commandName].execute(interaction, client);
  }

  if (interaction.isAutocomplete()) {
    const { commandName } = interaction;
    commands[commandName].autocomplete(interaction);
  }
});

DailyCronJobs.Run(client);
