import {
  CommandInteraction,
  SlashCommandBuilder,
  Client,
  ChannelType,
} from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('approve')
  .setDescription('fechar um Tópico sobre pr')

export async function execute(interaction: CommandInteraction, client: Client) {
  const channel = client.channels.cache.get(interaction.channelId)
  let pullRequestOwner: string | null = null

  if (channel && channel.type === ChannelType.PublicThread) {
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
  }

  if (!channel || channel.type !== ChannelType.PublicThread) {
    return
  }

  const members = await channel.members.fetch()
  const pullOwner = pullRequestOwner ? members.get(pullRequestOwner) : null

  const replyContent = `❌ Necessário realizar mudanças no código, ${
    pullOwner ? pullOwner.user : 'Unknown user'
  }`

  await interaction.reply(replyContent)
}
