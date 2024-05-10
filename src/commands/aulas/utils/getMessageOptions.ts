import { Message } from 'discord.js'

export function getMessageOptions(message: Message<true>) {
  const matchTitle = message.content.match(/title: \s*(.*)/)
  const matchLink = message.content.match(/link: \s*(.*)/)
  console.log(matchTitle, matchLink)

  if (matchTitle && matchLink) {
    return { name: matchTitle[1], value: matchLink[1] }
  }
  return { name: '', value: '' }
}
