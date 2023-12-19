import { env } from '@/config/env'
import { CronJob } from 'cron'
import { Client, TextChannel } from 'discord.js'

interface Options {
  discordChannel: string
  roleId?: string
  message: string
}

async function SendMessageDaily(client: Client<boolean>, options: Options) {
  const channel = client.channels.cache.get(options.discordChannel)

  if (!channel || !(channel instanceof TextChannel)) {
    return
  }

  channel.send(options.message)
}

export function ReminderDaily(client: Client<boolean>) {
  new CronJob(
    '0 13 * * *', // Runs every day at 13h 00m
    async () => {
      SendMessageDaily(client, {
        discordChannel: env.DISCORD_OCTOPOST_CHANNEL,
        message: `🦑 **[OCTOPOST]** Daily iniciando em 1h - as **14h** 🦑\nNo canal <#1137077093201625109>\nCola com nois!!1`,
      })
    },
    null,
    true,
    'America/Sao_Paulo'
  )

  new CronJob(
    '0 15 * * *', // Runs every day at 15h 00m
    async () => {
      SendMessageDaily(client, {
        discordChannel: env.DISCORD_PETDEX_CHANNEL,
        message: `🐶😺 **[PETDEX]** Daily iniciando em 1h - as **16h** 🐶😺\nNo canal <#1179104791826268180>\n Cola com nois!!1`,
      })
    },
    null,
    true,
    'America/Sao_Paulo'
  )
}
