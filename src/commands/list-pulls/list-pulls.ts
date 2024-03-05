import {
  AutocompleteInteraction,
  ChannelType,
  Client,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js'
import { getPullsRequest } from '@/utils/pulls.info'
import {
  FormatPulls,
  Project,
  returnImageProject,
} from '@/commands/list-pulls/utils/formatPulls'
import { CLOCK_IMG } from '@/commands/list-pulls/utils/constants'
import { PROJECTS } from '@/utils/constants'

export const data = new SlashCommandBuilder()
  .setName('listpulls')
  .setDescription('Liste todas as pull request abertas por projeto')
  .addStringOption((option) =>
    option
      .setName('projeto')
      .setDescription('Digite o nome do projeto para ver as pull requests')
      .setAutocomplete(true)
      .setRequired(true)
  )

export async function autocomplete(interaction: AutocompleteInteraction) {
  const focused = interaction.options.getFocused(true)

  const filtered = PROJECTS.filter((choice) =>
    choice.value.toLowerCase().includes(focused.value.toLowerCase())
  )

  await interaction.respond(
    filtered.map((choice) => ({ name: choice.name, value: choice.value }))
  )
}

export async function execute(interaction: CommandInteraction, client: Client) {
  const channel = await client.channels.fetch(interaction.channelId)

  if (!channel || channel.type !== ChannelType.GuildText) {
    await interaction.reply("Necessário ser um canal do tipo 'GUILD TEXT'")
  }

  const projectName = interaction.options.get('projeto')

  if (!projectName?.value) return

  try {
    const pulls = await getPullsRequest(projectName.value as string)

    const formattedPulls = pulls
      .filter((pull) => pull.user.login !== 'dependabot[bot]')
      .map(FormatPulls)

    if (formattedPulls.length === 0) {
      await interaction.reply({ content: 'Nenhuma pull request aberta' })
      return
    }

    const formattedEmbeds = formattedPulls
      .map((pull) => {
        return new EmbedBuilder()
          .setColor(0xebe288)
          .setTitle(pull.title)
          .setAuthor({
            name: pull.username,
            iconURL: pull.user_avatar,
          })
          .setURL(pull.link)
          .setFields({
            name: 'Revisores',
            value:
              pull.reviewers && pull.reviewers.length > 0
                ? `${pull.reviewers
                    .map(
                      (reviewer) =>
                        `- [${reviewer.login}](${reviewer.html_url})`
                    )
                    .join(`\n`)}`
                : 'Sem revisor',
          })
          .setThumbnail(returnImageProject(projectName.value as Project))
          .setFooter({
            text: `Criado em: ${new Date(pull.created_at).toLocaleDateString(
              'br'
            )} \nÚltima atualização em: ${new Date(
              pull.updated_at
            ).toLocaleDateString('br')}`,
            iconURL: CLOCK_IMG,
          })
      })
      .slice(0, 10)

    await interaction.reply({
      content: `Pull requests abertos no projeto ${projectName.name}`,
      embeds: [...formattedEmbeds],
    })
  } catch (e) {
    console.error(e)
  }
}
