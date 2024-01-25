import { Client, NewsChannel } from 'discord.js'

interface Options {
  channelID: string
  message: string
}

export async function SendMessageNewsChat(
  client: Client<boolean>,
  { channelID, message }: Options
) {
  const channel = client.channels.cache.get(channelID)

  if (!channel || !(channel instanceof NewsChannel)) {
    return
  }

  await channel.send(message)
}
