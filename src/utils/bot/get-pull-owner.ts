import { Channel, ChannelType } from 'discord.js'

export async function getPullOwner(channel: Channel | undefined) {
  if (!channel || channel.type !== ChannelType.PublicThread) {
    return
  }

  let pullRequestOwner: string | null = null

  try {
    const messages = await channel.messages.fetchPinned()

    const ownerMessage = messages.at(1)

    if (ownerMessage) {
      const match = ownerMessage.content.match(/<@(.+?)>/)

      if (match) {
        pullRequestOwner = match[1]
      }
    }
  } catch (error) {
    console.error('error fetching messages:', error)
  }

  const members = await channel.members.fetch()

  const pullOwner = pullRequestOwner ? members.get(pullRequestOwner) : null

  return pullOwner?.user
}
