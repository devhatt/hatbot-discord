import { getPullOwner } from '@/utils/bot/get-pull-owner'
import { CommandInteraction, SlashCommandBuilder, Client } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('change')
  .setDescription('Avisar sobre mudanças no pr')

export async function execute(interaction: CommandInteraction, client: Client) {
  const channel = client.channels.cache.get(interaction.channelId)

  const pullOwner = await getPullOwner(channel)

  if (pullOwner)
    await interaction.reply(
      `❌ Necessário realizar mudanças no código ${pullOwner}`
    )
}
