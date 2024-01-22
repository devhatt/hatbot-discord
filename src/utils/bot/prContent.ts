import { Channel, ChannelType } from 'discord.js'

export async function prContent(channel: Channel | undefined) {
  if (!channel || channel.type !== ChannelType.PublicThread) {
    return
  }

  const messages = await channel.messages.fetchPinned()

  const messageInfos = messages.at(0)

  if (!messageInfos) return

  const rawContent = messageInfos.content
  const matchRepo = rawContent.match(/\*\*Repositório:\*\*\s*(.*)/)
  const matchPullId = rawContent.match(/\*\*Pull Request ID:\*\*\s*(.*)/)

  if (matchRepo && matchPullId) {
    return {
      repository: matchRepo[1],
      pullId: Number(matchPullId[1]),
    }
  }
}
