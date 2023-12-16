import { Client } from '@notionhq/client'
import {
  BulletedListItemBlockObjectResponse,
  DatabaseObjectResponse,
  TextRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

import { GetRecentDaily } from '../utils'
import { env } from '@/config/env'

export const notionClient = new Client({
  auth: env.NOTION_TOKEN,
})

type PropertiesSelectOptions = {
  id: string
  type: string
  select?: { id: string; name: string; color: string }
}

export async function GetDailyPages(daily: string, pageSize: number) {
  try {
    const databaseQueryResponse = await notionClient.databases.query({
      database_id: env.NOTION_DATABASE_ID,
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
      page_size: pageSize,
    })

    const resultsDatabaseQueryResponse =
      databaseQueryResponse.results as DatabaseObjectResponse[]

    const pageWithPropertieDaily = resultsDatabaseQueryResponse
      .map((item) => {
        const optionsSelect = item.properties.Daily as PropertiesSelectOptions

        if (!optionsSelect.select) {
          return
        }

        const { select } = optionsSelect
        const { id, created_time: createdAt } = item

        if (select.name === 'PetDex') {
          return {
            petdex: { pageId: id, createdAt: new Date(createdAt) },
          }
        }

        if (select.name === 'Octopost') {
          return {
            octopost: {
              pageId: id,
              createdAt: new Date(createdAt),
            },
          }
        }
      })
      .filter(Boolean)

    const recentDaily = GetRecentDaily(pageWithPropertieDaily, daily)

    const pageChildrenResponse = await notionClient.blocks.children.list({
      block_id: recentDaily?.pageId || '',
    })

    const pageContent =
      pageChildrenResponse.results as BulletedListItemBlockObjectResponse[]

    const pautasDaily: string[] = []

    pageContent.map((item) => {
      const texts = item.bulleted_list_item
        .rich_text as TextRichTextItemResponse[]

      const textContent = texts.map(({ text }) => text.content)

      pautasDaily.push(textContent[0])
    })

    return pautasDaily
  } catch (err) {
    console.log(err)
  }
}
