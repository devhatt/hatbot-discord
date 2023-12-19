/* eslint-disable @typescript-eslint/no-explicit-any */
import { SlashCommandBuilder } from 'discord.js'

export interface Command {
  data: SlashCommandBuilder
  execute(...args: any): any
}
