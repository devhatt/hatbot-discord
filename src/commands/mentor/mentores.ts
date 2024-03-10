import {
  CommandInteraction,
  SlashCommandBuilder,
  TextChannel,
  AutocompleteInteraction,
  roleMention,
} from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('mentores')
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
      .setName('question')
      .setDescription('Digite a sua dúvida')
      .setRequired(true)
  )

export async function autocomplete(interaction: AutocompleteInteraction) {
  const focused = interaction.options.getFocused()

  const mentorRolesArray =
    interaction.guild?.roles.cache.map((r) => ({
      name: r.name,
      value: r.id,
    })) || []
  const mentorRoles = mentorRolesArray.filter((r) =>
    r.name.toLowerCase().includes('mentor')
  )
  const mappedMentorRoles =
    mentorRoles.map((r) => ({
      name: r.name,
      id: r.value,
    })) || []

  const filtered = mappedMentorRoles.filter((choice) =>
    choice.id.toLowerCase().includes(focused.toLowerCase())
  )
  console.log('Filtered ', filtered)

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

  const mentor = interaction.options.get('mentor-role')
  const question = interaction.options.get('question')

  const mentorName = await interaction.guild?.roles
    .fetch(`${mentor?.value}`)
    .then((role) => role?.name)

  console.log(mentor)

  const thread = await channel.threads.create({
    name: `{${mentorName}} - ${question?.value}`,
  })

  await thread.members.add(interaction.user.id)

  await thread.send({
    content: `**Criado por:** ${member}\n${roleMention(`${mentor?.value}`)}`,
  })

  await interaction.reply({
    content: 'Thread criada!',
    ephemeral: true,
  })
}
