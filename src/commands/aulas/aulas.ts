import {
  CommandInteraction,
  SlashCommandBuilder,
  Client,
  ChannelType,
  AutocompleteInteraction,
} from 'discord.js'
import { getMessageOptions } from './utils/getMessageOptions'
import { env } from '@/config/env'

export const data = new SlashCommandBuilder()
  .setName('aulas')
  .setDescription('procure por uma aula da devhatt')
  .addStringOption((option) =>
    option
      .setName('titulo-do-video')
      .setDescription('Procure por palavras chaves exemplo: diogojs')
      .setAutocomplete(true)
      .setRequired(true)
  )

export async function autocomplete(
  interaction: AutocompleteInteraction,
  client: Client
) {
  const focused = interaction.options.getFocused(true)
  const channel = client.channels.cache.get(env.CLASS_VIDEOS)

  if (!channel || channel.type !== ChannelType.GuildText) {
    return
  }

  const messages = await channel.messages.fetch()

  const choices = messages.map((message) => getMessageOptions(message))

  const filtered = choices.filter((choice) =>
    choice.value.toLowerCase().includes(focused.value.toLowerCase())
  )

  const paginatedChoices =
    filtered.length > 25 ? filtered.slice(0, 25) : filtered

  await interaction.respond(
    paginatedChoices.map((choice) => ({
      name: choice.name,
      value: choice.value,
    }))
  )
}

export async function execute(interaction: CommandInteraction, client: Client) {
  const channel = client.channels.cache.get(interaction.channelId)

  if (!channel || channel.type !== ChannelType.GuildText) {
    await interaction.reply("Necessário ser um canal do tipo 'GUILD TEXT'")
    return
  }

  const videoData = interaction.options.get('titulo-do-video')

  return await interaction.reply({
    ephemeral: true,
    content: videoData?.value?.toString(),
  })
}
