import { Message } from 'discord.js'

export function getMessageOptions(message: Message<true>) {
  const matchTitle = message.content.trim().match(/title:\s*(.*)/)
  const matchLink = message.content.trim().match(/link:\s*(.*)/)

  if (matchTitle && matchLink) {
    return { name: matchTitle[1], value: matchLink[1] }
  }
  return { name: '', value: '' }
}
