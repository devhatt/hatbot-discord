import { Channel, ChannelType } from 'discord.js'

export async function prContent(channel: Channel | undefined) {
  if (!channel || channel.type !== ChannelType.PublicThread) {
    return
  }

  const messages = await channel.messages.fetchPinned()

  const messageInfos = messages.at(0)

  if (!messageInfos) return

  const rawContent = messageInfos.content
  const revisorsRepo = rawContent.match(/\*\*Revisores:\*\*\s*(.*)/)
  const matchRepo = rawContent.match(/\*\*Repositório:\*\*\s*(.*)/)
  const matchPullId = rawContent.match(/\*\*Pull Request ID:\*\*\s*(.*)/)

  if (revisorsRepo && matchRepo && matchPullId) {
    return {
      revisors: revisorsRepo[1],
      repository: matchRepo[1],
      pullId: Number(matchPullId[1]),
    }
  }
}
