import { prContent } from '@/utils/bot/prContent'
import { CommandInteraction, SlashCommandBuilder, Client } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('rereview')
  .setDescription(
    'Avisar aos revisores que seu PR está pronto para ser revisado novamente'
  )

export async function execute(interaction: CommandInteraction, client: Client) {
  const channel = client.channels.cache.get(interaction.channelId)

  const prInfo = await prContent(channel)

  if (prInfo)
    await interaction.reply(
      `Mudanças foram feitas e este PR está pronto para ser revisado novamente ${prInfo.revisors}  🤓☝️ `
    )
}
