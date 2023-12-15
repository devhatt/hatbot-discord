import { CronJob } from "cron";
import { Client, TextChannel } from "discord.js";
import { GetDailyPages } from "../../lib";

const discordChannel = "1182331317082398751";
const petdexRoleId = "1176201989797986456";
const octopostRoleId = "1136795129219383376";

interface Options {
  discordChannel: string;
  roleId: string;
  message: string;
}

async function ReminderDaily(client: Client<boolean>, options: Options) {
  const channel = client.channels.cache.get(options.discordChannel);

  if (!channel || !(channel instanceof TextChannel)) {
    return;
  }

  channel.send(`<@&${options.roleId}> - ${options.message}`);
}

export function Run(client: Client<boolean>) {
  new CronJob(
    "0 13 * * *", // Runs every day at 13h 00m
    async () => {
      const pautasOctopost = await GetDailyPages("octopost", 20);

      if (!pautasOctopost) {
        return;
      }

      ReminderDaily(client, {
        discordChannel,
        message: `Daily começando em 1h - as 14h\n**Pautas**: ${pautasOctopost.map(
          (i) => `\n${i}`
        )}`,
        roleId: octopostRoleId,
      });
    },
    null,
    true,
    "America/Sao_Paulo"
  );

  new CronJob(
    "0 15 * * *", // Runs every day at 15h 00m
    async () => {
      const pautasPet = await GetDailyPages("petdex", 20);

      if (!pautasPet) {
        return;
      }

      ReminderDaily(client, {
        discordChannel,
        message: `Daily começando em 1h - as 16\n**Pautas:** ${pautasPet.map(
          (i) => `\n${i}`
        )}`,
        roleId: petdexRoleId,
      });
    },
    null,
    true,
    "America/Sao_Paulo"
  );
}
