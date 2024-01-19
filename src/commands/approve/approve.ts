import {
  CommandInteraction,
  SlashCommandBuilder,
  Client,
  ChannelType,
} from 'discord.js'
import { getPullOwner } from '@/utils/bot/get-pull-owner'
import { prContent } from '@/utils/bot/prContent'
import { getPullRequest } from '@/utils/pulls.info'

export const data = new SlashCommandBuilder()
  .setName('approve')
  .setDescription('fechar um Tópico sobre pr')

export async function execute(interaction: CommandInteraction, client: Client) {
  const channel = client.channels.cache.get(interaction.channelId)

  if (!channel || channel.type !== ChannelType.PublicThread) {
    await interaction.reply('Necessário ser um tópico público')
    return
  }

  const initialOpenPosition = channel.name.indexOf('{OPEN}')
  const finalOpenPosition = initialOpenPosition + '{OPEN}'.length

  const closedPrText =
    channel.name.slice(0, initialOpenPosition) +
    channel.name.slice(finalOpenPosition)

  await interaction.deferReply()
  const prInfo = await prContent(channel)

  if (!prInfo) return
  const [pullOwner, { state }] = await Promise.all([
    getPullOwner(channel),
    getPullRequest(prInfo.repository, prInfo.pullId),
  ])

  if (!pullOwner) return

  // avoid to add {CLOSED} twice
  if (channel.name.includes('{OPEN}') && state === 'closed') {
    await Promise.all([
      interaction.editReply(
        `✅ ${interaction.user} Revisou e mergeou seu Pull Request, ${pullOwner} 🫡`
      ),
      channel.setName(`{CLOSED} ${closedPrText}`),
    ])
    await channel.setArchived(true)
    return
  }

  await interaction.editReply(
    `✅ ${interaction.user} Revisou e aprovou seu Pull Request, ${pullOwner} 🫡`
  )
}
