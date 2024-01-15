import { sendMessageToPullOwner } from '@/utils/bot/send-message-pull-owner'
import { CommandInteraction, SlashCommandBuilder, Client } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('approve')
  .setDescription('fechar um Tópico sobre pr')

export async function execute(interaction: CommandInteraction, client: Client) {
  const channel = client.channels.cache.get(interaction.channelId)

  const message = '✅ aprovado: '
  const replyContent = await sendMessageToPullOwner(channel, message)

  if (replyContent) await interaction.reply(replyContent)
}
