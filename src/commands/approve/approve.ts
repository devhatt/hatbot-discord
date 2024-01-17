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
  const members = await channel.members.fetch()

  const initialOpenPosition = channel.name.indexOf('{OPEN}')
  const finalOpenPosition = initialOpenPosition + '{OPEN}'.length

  const closedPrText =
    channel.name.slice(0, initialOpenPosition) +
    channel.name.slice(finalOpenPosition)

  // avoid to add {CLOSED} twice
  if (channel.name.includes('{OPEN}')) {
    channel.setName(`{CLOSED} ${closedPrText}`)
  }

  const [pullOwner] = members.map((member) => member)

  await interaction.reply(`✅ aprovado ${pullOwner.user}`)
  await channel.setArchived(true)
}
