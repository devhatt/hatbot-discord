import dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
  ],
});

client.login(process.env.DISCORD_TOKEN);

client.once("ready", () => {
  console.log(`[hatbot]: 🚀🫡Ready! bot is running`);
});

client.once("shardError", (error) => {
  console.error(`[hatbot]: something bad happened, ${error.message}`);
});
