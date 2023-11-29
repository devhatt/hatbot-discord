import {
  CommandInteraction,
  SlashCommandBuilder,
  ActionRowBuilder,
  ComponentType,
  StringSelectMenuBuilder,
} from "discord.js";
import { Slangs, processSlang } from "./utils/slangs/slangs";
import { TSelectSlang } from "./utils/slangs/slangs.types";

export const data = new SlashCommandBuilder()
  .setName("girias")
  .setDescription("girias do Alecell");

export async function execute(interaction: CommandInteraction) {
  const slangOptions: TSelectSlang[] = [];
  Object.keys(Slangs).map((slang) => {
    slangOptions.push({ label: slang, value: slang });
  });

  const selectSlang = new StringSelectMenuBuilder()
    .setCustomId(`select-slang`)
    .setPlaceholder("Selecione uma das gírias")
    .addOptions(slangOptions);

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
    const slangSelected = processSlang(interaction.values[0]);
    await interaction.reply({
      content: `Significado: ${slangSelected}`,
      ephemeral: true,
    });
  });
}
