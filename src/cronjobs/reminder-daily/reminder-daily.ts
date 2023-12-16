import { GetDailyPages } from '@/lib'
import { CronJob } from 'cron'
import { Client, TextChannel } from 'discord.js'
import { CONSTANTS } from '@/constants'

interface Options {
  discordChannel: string
  roleId: string
  message: string
}

async function ReminderDaily(client: Client<boolean>, options: Options) {
  const channel = client.channels.cache.get(options.discordChannel)

  if (!channel || !(channel instanceof TextChannel)) {
    return
  }

  channel.send(`<@&${options.roleId}> - ${options.message}`)
}

export function Run(client: Client<boolean>) {
  new CronJob(
    '0 13 * * *', // Runs every day at 13h 00m
    async () => {
      const agendaOctopost = await GetDailyPages('octopost', 20)

      if (!agendaOctopost) {
        return
      }

      ReminderDaily(client, {
        discordChannel: CONSTANTS.CHANNEL_DISCORD,
        message: `Daily começando em 1h - as 14h\n**Pautas**: ${agendaOctopost.map(
          (i) => `\n${i}`
        )}`,
        roleId: CONSTANTS.OCTOPOST_ROLE,
      })
    },
    null,
    true,
    'America/Sao_Paulo'
  )

  new CronJob(
    '0 15 * * *', // Runs every day at 15h 00m
    async () => {
      const agendaPet = await GetDailyPages('petdex', 20)

      if (!agendaPet) {
        return
      }

      ReminderDaily(client, {
        discordChannel: CONSTANTS.CHANNEL_DISCORD,
        message: `Daily começando em 1h - as 16\n**Pautas:** ${agendaPet.map(
          (i) => `\n${i}`
        )}`,
        roleId: CONSTANTS.PETDEX_ROLE,
      })
    },
    null,
    true,
    'America/Sao_Paulo'
  )
}
