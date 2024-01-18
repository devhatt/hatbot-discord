import { ChannelType, ThreadChannel } from 'discord.js'

export async function pinMessage(thread: ThreadChannel | undefined) {
  if (!thread || thread.type !== ChannelType.PublicThread) {
    return
  }

  const allMessages = await thread.messages.fetch()

  const lastMessage = allMessages.first()

  if (!lastMessage) return

  await lastMessage.pin()
}
