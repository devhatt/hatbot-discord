import {
  CommandInteraction,
  SlashCommandBuilder,
  TextChannel,
  AutocompleteInteraction,
  roleMention,
  channelMention,
  ChannelType,
} from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('mentors')
  .setDescription('Pedir ajuda dos mentores')
  .addStringOption((opt) =>
    opt
      .setName('mentor-role')
      .setDescription('Escolha o tipo de mentor que quer tirar sua dúvida')
      .setAutocomplete(true)
      .setRequired(true)
  )
  .addStringOption((opt) =>
    opt
      .setName('pergunta')
      .setDescription('Digite a sua dúvida')
      .setRequired(true)
  )

export async function autocomplete(interaction: AutocompleteInteraction) {
  const focused = interaction.options.getFocused()

  const mentorRolesArray =
    interaction.guild?.roles.cache
      .map((role) => ({
        name: role.name,
        id: role.id,
      }))
      .filter((role) => role.name.toLowerCase().includes('mentor')) || []

  const filtered = mentorRolesArray.filter((choice) =>
    choice.id.toLowerCase().includes(focused.toLowerCase())
  )

  await interaction.respond(
    filtered.map((choice) => ({
      name: choice.name,
      value: choice.id,
    }))
  )
}

export async function execute(interaction: CommandInteraction) {
  const channel = interaction.channel as TextChannel

  const { member } = interaction
  const channelId: string = '1128384525098033264'

  const mentor: string = String(interaction.options.get('mentor-role')?.value)
  const question = interaction.options.get('pergunta')

  if (channel.name !== 'help') {
    interaction.reply({
      content: `Você não pode usar este comando aqui, utilize o canal ${channelMention(channelId)} para tal`,
      ephemeral: true,
    })
    return
  }

  if (!channel || channel.type !== ChannelType.GuildText) {
    await interaction.reply("Necessário ser um canal do tipo 'GUILD TEXT'")
    return
  }

  const mentorName = await interaction.guild?.roles
    .fetch(`${mentor}`)
    .then((role) => role?.name.split(' ')[0].toUpperCase())

  const thread = await channel.threads.create({
    name: `{${mentorName}} - ${question?.value}`,
  })

  await thread.members.add(interaction.user.id)

  await thread.send({
    content: `**Criado por**: ${member}
**Mentores**: ${roleMention(mentor)}
    
***Use o template abaixo para melhorar a sua pergunta, colocando informações que ajudem os mentores a te responder da melhor maneira possível***.
    
**Problema/Situação**
**O que você já pesquisou sobre o assunto?**
**O que você já tentou?**
**Caso tenha, coloque uma parte do código em questão, utilize blocos de código do Discord**.`,
  })

  await interaction.reply({
    content: 'Thread criada!',
    ephemeral: true,
  })
}
