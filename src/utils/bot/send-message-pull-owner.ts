import { Channel, ChannelType } from 'discord.js'

export async function sendMessageToPullOwner(
  channel: Channel | undefined,
  message: string
) {
  if (!channel || channel.type !== ChannelType.PublicThread) {
    return
  }

  let pullRequestOwner: string | null = null

  try {
    const messages = await channel.messages.fetch({ limit: 100 })
    const firstMessage = messages.first()

    if (firstMessage) {
      const match = firstMessage.content.match(/<@(.+?)>/)

      if (match) {
        pullRequestOwner = match[1]
      }
    }
  } catch (error) {
    console.error('Error fetching messages:', error)
  }

  const members = await channel.members.fetch()
  const pullOwner = pullRequestOwner ? members.get(pullRequestOwner) : null

  const replyContent = `${message} ${
    pullOwner ? pullOwner.user : 'Unknown user'
  }`

  return replyContent
}
