import { getPullRequest } from '@/utils/pulls.info'
import {
  CommandInteraction,
  SlashCommandBuilder,
  ButtonBuilder,
  Client,
  ChannelType,
  UserSelectMenuBuilder,
  ActionRowBuilder,
  ComponentType,
  ButtonStyle,
  AutocompleteInteraction,
} from 'discord.js'
import { pinMessage } from './utils/pinMessage'

export const data = new SlashCommandBuilder()
  .setName('pulls')
  .setDescription('Crie um novo Tópico para discutir sobre seu pr')
  .addNumberOption((option) =>
    option
      .setName('pull-request-id')
      .setDescription('Digite o ID do seu Pull Request')
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName('projeto')
      .setDescription('Digite o nome do projeto do seu Pull Request')
      .setAutocomplete(true)
      .setRequired(true)
  )

export async function autocomplete(interaction: AutocompleteInteraction) {
  const focused = interaction.options.getFocused(true)

  const choices = [
    { name: 'Octopost', value: 'octopost' },
    { name: 'PetDex Frontend', value: 'pet-dex-frontend' },
    { name: 'PetDex Backend', value: 'pet-dex-backend' },
    { name: 'Github bot', value: 'hatbot-discord' },
  ]

  const filtered = choices.filter((choice) =>
    choice.value.toLowerCase().includes(focused.value.toLowerCase())
  )

  await interaction.respond(
    filtered.map((choice) => ({ name: choice.name, value: choice.value }))
  )
}

export async function execute(interaction: CommandInteraction, client: Client) {
  const channel = await client.channels.fetch(interaction.channelId)
  const { member } = interaction

  if (!channel || channel.type !== ChannelType.GuildText) {
    await interaction.reply("Necessário ser um canal do tipo 'GUILD TEXT'")
    return
  }

  const projectName = interaction.options.get('projeto')
  const pullID = interaction.options.get('pull-request-id')

  if (!pullID?.value || !projectName?.value) return

  try {
    const pullInfo = await getPullRequest(
      projectName.value as string,
      pullID.value as number
    )

    const thread = await channel.threads.create({
      name: `{OPEN} - #${pullInfo.number} - ${pullInfo.title}`,
    })

    await thread.members.add(interaction.user.id)

    await interaction.reply({
      content: 'Pegando informações do pull request...',
      ephemeral: true,
    })

    const selectSlang = new UserSelectMenuBuilder()
      .setCustomId(`select-user`)
      .setPlaceholder('Pessoas para revisar')
      .setMinValues(2)
      .setMaxValues(6)

    const row = new ActionRowBuilder<UserSelectMenuBuilder>().addComponents(
      selectSlang
    )

    const selectUser = await thread.send({
      content: `${member} selecione pelo menos uma pessoa para revisar seu pull request`,
      components: [row],
    })

    await pinMessage(thread)

    const collector = selectUser.createMessageComponentCollector({
      componentType: ComponentType.UserSelect,
    })

    collector.on('collect', async (interaction) => {
      const usersSelected = interaction.users.map(
        (userSelected) => userSelected
      )

      const githubButton = new ButtonBuilder()
        .setLabel('Abrir o Pull Request')
        .setURL(pullInfo.html_url)
        .setStyle(ButtonStyle.Link)

      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        githubButton
      )

      await interaction.reply({
        content: `
        **Revisores:** ${usersSelected}
**Repositório:** ${projectName.value}
**Pull Request ID:** ${pullID.value}
**Info:** Quando o pull request for concluído, comente '/approve'
      `,
        components: [row],
      })

      const messages = await thread.messages.fetchPinned()

      const messageInfo = messages.at(0)

      if (
        !messageInfo ||
        !messageInfo.content.includes(pullID.value?.toString()!)
      ) {
        await pinMessage(thread)
      }
    })
  } catch (error) {
    return interaction.reply({
      content: `Não foi possível achar esse pull request, verifique se o ID está correto.`,
      ephemeral: true,
    })
  }
}
