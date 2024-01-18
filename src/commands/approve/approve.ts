import { sendMessageToPullOwner } from '@/utils/bot/send-message-pull-owner'
import { CommandInteraction, SlashCommandBuilder, Client } from 'discord.js'
import { prContent } from '@/utils/bot/prContent'
import { getPullRequest } from '@/utils/pulls.info'
import {
  CommandInteraction,
  SlashCommandBuilder,
  Client,
  ChannelType,
} from 'discord.js'

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

  const prInfo = await prContent(channel)

  if (!prInfo) return

  const { state } = await getPullRequest(prInfo.repository, prInfo.pullId)

  // avoid to add {CLOSED} twice
  if (channel.name.includes('{OPEN}') && state === 'closed') {
    channel.setName(`{CLOSED} ${closedPrText}`)
    await interaction.reply(
      `✅ ${interaction.user} revisou e mergeou seu Pull request 🫡`
    )
    await channel.setArchived(true)
    return
  }
  const [pullOwner] = members.map((member) => member)

  await interaction.reply(
    `✅ ${interaction.user} revisou e aprovou seu Pull Request, ${pullOwner.user} 🫡`
  )
}
