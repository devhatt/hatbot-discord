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
  const channel = await client.channels.fetch(interaction.channelId)

  if (!channel || channel.type !== ChannelType.PublicThread) {
    return
  }

  const members = await channel.members.fetch()

  const [pullOwner] = members.map((member) => member)

  await interaction.reply(`✅ aprovado ${pullOwner.user}`)
  await channel.setArchived(true)
}
