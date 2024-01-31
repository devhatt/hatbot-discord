import { Client, TextChannel } from 'discord.js'

interface Options {
  channelID: string
  message: string
}

export async function SendMessageChat(
  client: Client<boolean>,
  { channelID, message }: Options
) {
  const channel = client.channels.cache.get(channelID)

  if (!channel || !(channel instanceof TextChannel)) {
    return
  }
  await channel.send(message)
}
