import {
  CommandInteraction,
  SlashCommandBuilder,
  ActionRowBuilder,
  ComponentType,
  StringSelectMenuBuilder,
} from "discord.js";
import { TObjectKeyAsType } from "./girias.types";
import { Slangs, processSlang } from "./utils/processSlang";
import { slangOptions } from "./utils/slangOptions";

export const data = new SlashCommandBuilder()
  .setName("girias")
  .setDescription("girias do Alecell");

export async function execute(interaction: CommandInteraction) {
  const allOptions = slangOptions(Slangs);

  const selectSlang = new StringSelectMenuBuilder()
    .setCustomId(`select-slang`)
    .setPlaceholder("Selecione uma das gírias")
    .addOptions(allOptions);

  const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    selectSlang
  );

  const slangButton = await interaction.reply({
    content: `Gírias do Alecell`,
    components: [row],
    ephemeral: true,
  });

  const collector = slangButton.createMessageComponentCollector({
    componentType: ComponentType.StringSelect,
    time: 60000,
  });

  collector.on("collect", async (interaction) => {
    const slangSelected = processSlang(
      interaction.values[0] as TObjectKeyAsType<typeof Slangs>
    );

    await interaction.reply({
      content: `Significado: ${slangSelected}`,
      ephemeral: true,
    });
  });
}
