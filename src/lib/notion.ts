import { Client } from "@notionhq/client";
import {
  BulletedListItemBlockObjectResponse,
  DatabaseObjectResponse,
  TextRichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { env } from "../config/env";
import { GetRecentDaily } from "../utils";

export const notionClient = new Client({
  auth: env.NOTION_TOKEN,
});

type PropertiesSelectOptions = {
  id: string;
  type: string;
  select?: { id: string; name: string; color: string };
};

export async function GetDailyPages(daily: string, page_size: number) {
  const databaseQueryResponse = await notionClient.databases.query({
    database_id: "7b626c16af1b4f0c986a9811f59cb9a9",
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
    page_size,
  });

  const resultsDatabaseQueryResponse =
    databaseQueryResponse.results as DatabaseObjectResponse[];

  const pageWithPropertieDaily = resultsDatabaseQueryResponse
    .map((item) => {
      const optionsSelect = item.properties.Daily as PropertiesSelectOptions;

      if (!optionsSelect.select) {
        return;
      }

      if (optionsSelect.select.name == "PetDex") {
        return {
          petdex: { pageId: item.id, createdAt: new Date(item.created_time) },
        };
      } else if (optionsSelect.select.name == "Octopost") {
        return {
          octopost: { pageId: item.id, createdAt: new Date(item.created_time) },
        };
      }
    })
    .filter(Boolean);

  console.log(pageWithPropertieDaily);

  const recentDaily = GetRecentDaily(pageWithPropertieDaily, daily);

  const pageChildrenResponse = await notionClient.blocks.children.list({
    block_id: recentDaily?.pageId || "",
  });

  const pageContent =
    pageChildrenResponse.results as BulletedListItemBlockObjectResponse[];

  const pautasDaily: string[] = [];

  pageContent.map((item) => {
    const texts = item.bulleted_list_item
      .rich_text as TextRichTextItemResponse[];

    const textContent = texts.map((text) => text.text.content);

    pautasDaily.push(textContent[0]);
  });

  return pautasDaily;
}
