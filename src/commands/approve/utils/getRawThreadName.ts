import { Channel, ChannelType } from 'discord.js'

export async function getRawThreadName(channel: Channel) {
  if (channel.type !== ChannelType.PublicThread) {
    return
  }

  const rawThreadName = channel.name.match('{OPEN}(.+)')

  if (rawThreadName) {
    return rawThreadName[1]
  }
}
