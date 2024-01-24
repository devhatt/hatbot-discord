import { env } from '@/config/env'
import { Client, REST, Routes } from 'discord.js'
import * as commandModules from './commands'
import { Reminder } from './cronjobs/reminder-daily/reminder'
import { CronAdapter } from './lib'

export class Bot {
  public commands = Object(commandModules)

  constructor(public readonly client: Client) {
    this.client.login(env.DISCORD_TOKEN)

    this.runCronJobs()

    this.client.once('ready', (bot) => {
      console.log(
        `[${bot.user.username}]: 🚀🫡Ready! bot is running and logged as ${bot.user.tag}`
      )
    })

    this.client.once('shardError', (error) => {
      console.error(`[bot]: something bad happened, ${error.message}`)
    })

    this.registerCommands()

    this.onInteractionCreate()
  }

  private async registerCommands() {
    const rest = new REST().setToken(env.DISCORD_TOKEN)

    const commands = []

    for (const module of Object.values<{ data: unknown }>(commandModules)) {
      commands.push(module.data)
    }

    rest.put(
      Routes.applicationGuildCommands(env.CLIENT_ID, env.DISCORD_SERVER_ID),
      {
        body: commands,
      }
    )
  }

  private async onInteractionCreate() {
    this.client.on('interactionCreate', async (interaction) => {
      if (interaction.isCommand()) {
        const { commandName } = interaction
        this.commands[commandName].execute(interaction, this.client)
      }

      if (interaction.isAutocomplete()) {
        const { commandName } = interaction
        this.commands[commandName].autocomplete(interaction)
      }
    })
  }

  private async runCronJobs() {
    const reminder = new Reminder(CronAdapter.create(), this.client)

    reminder.setDailys([
      {
        crontime: '0 13 * * 1-5', // Runs at 15h every day - monday to friday
        channelID: env.DISCORD_OCTOPOST_CHANNEL,
        message:
          '🦑 **[OCTOPOST]** Daily iniciando em 1h - as **14h** 🦑\nNo canal <#1137077093201625109>\nCola com nois!!1',
      },
      {
        crontime: '30 17 * * 1-5', // Runs at 17:30h every day - monday to friday
        channelID: env.DISCORD_PETDEX_CHANNEL,
        message:
          '🐶😺 **[PETDEX]** Daily iniciando em 1h - as **16h** 🐶😺\nNo canal <#1179104791826268180>\n Cola com nois!!1',
      },
    ])
    reminder.daily()
  }
}
