import { Client, GatewayIntentBits } from 'discord.js'
import { Bot } from './bot'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
  ],
})

export const bot = new Bot(client)
