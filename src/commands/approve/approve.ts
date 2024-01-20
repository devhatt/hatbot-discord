import {
  CommandInteraction,
  SlashCommandBuilder,
  Client,
  ChannelType,
} from 'discord.js'
import { getPullOwner } from '@/utils/bot/get-pull-owner'
import { prContent } from '@/utils/bot/prContent'
import { getPullRequest } from '@/utils/pulls.info'
import { getRawThreadName } from './utils/getRawThreadName'

export const data = new SlashCommandBuilder()
  .setName('approve')
  .setDescription('fechar um Tópico sobre pr')

export async function execute(interaction: CommandInteraction, client: Client) {
  const channel = client.channels.cache.get(interaction.channelId)

  if (!channel || channel.type !== ChannelType.PublicThread) {
    await interaction.reply('Necessário ser um tópico público')
    return
  }

  await interaction.deferReply()
  const prInfo = await prContent(channel)

  if (!prInfo) return
  const [pullOwner, { state }] = await Promise.all([
    getPullOwner(channel),
    getPullRequest(prInfo.repository, prInfo.pullId),
  ])

  if (!pullOwner) return

  const rawThreadName = await getRawThreadName(channel)

  // avoid to add {CLOSED} twice
  if (channel.name.includes('{OPEN}') && state === 'closed') {
    await Promise.all([
      interaction.editReply(
        `✅ ${interaction.user} Revisou e mergeou seu Pull Request, ${pullOwner} 🫡`
      ),
      channel.setName(`{CLOSED} ${rawThreadName}`),
    ])
    await channel.setArchived(true)
    return
  }

  await interaction.editReply(
    `✅ ${interaction.user} Revisou e aprovou seu Pull Request, ${pullOwner} 🫡`
  )
}
