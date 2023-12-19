import { env } from '@/config/env'
import { Client, REST, Routes } from 'discord.js'
import * as commandModules from './commands'
import { ReminderDaily } from './cronjobs'

export class Bot {
  public commands = Object(commandModules)

  constructor(public readonly client: Client) {
    this.client.login(env.DISCORD_TOKEN)

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

    this.runCronJobs()
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
    ReminderDaily(this.client)
  }
}
