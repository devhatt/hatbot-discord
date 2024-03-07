import {
  ActionRowBuilder,
  CommandInteraction,
  ComponentType,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
} from 'discord.js'
import { TObjectKeyAsType } from '../../types/email'
import { Emails, processEmails } from './utils/processSlang'
import { slangOptions } from './utils/slangOptions'

export const data = new SlashCommandBuilder()
  .setName('emails')
  .setDescription('Emails de membros da staff')

export async function execute(interaction: CommandInteraction) {
  const allOptions = slangOptions(Emails)

  const selectEmail = new StringSelectMenuBuilder()
    .setCustomId(`select-membro`)
    .setPlaceholder('Selecione um membro da staff')
    .addOptions(allOptions)

  const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    selectEmail
  )

  const emailButton = await interaction.reply({
    content: `Emails da staff`,
    components: [row],
    ephemeral: true,
  })

  const collector = emailButton.createMessageComponentCollector({
    componentType: ComponentType.StringSelect,
    time: 60000,
  })

  collector.on('collect', async (interaction) => {
    const emailSelected = processEmails(
      interaction.values[0] as TObjectKeyAsType<typeof Emails>
    )

    await interaction.reply({
      content: `Email: ${emailSelected}`,
      ephemeral: true,
    })
  })
}
