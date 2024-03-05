import { IPullsOpenInfo } from '@/utils/pulls.types'
import {
  HATBOT_IMG,
  OCTOPOST_IMG,
  PETDEX_IMG,
} from '@/commands/list-pulls/utils/constants'
import { TObjectKeyAsType } from '@/commands/girias/girias.types'

export function FormatPulls(pull: IPullsOpenInfo) {
  return {
    id: pull.id,
    link: pull.html_url,
    title: pull.title,
    username: pull.user.login,
    user_link: pull.user.html_url,
    user_avatar: pull.user.avatar_url,
    issue: pull.number,
    reviewers: pull.requested_reviewers || [],
    created_at: pull.created_at,
    updated_at: pull.updated_at,
  }
}

const obj = {
  octopost: OCTOPOST_IMG,
  'pet-dex-frontend': PETDEX_IMG,
  'pet-dex-backend': PETDEX_IMG,
  'hatbot-discord': HATBOT_IMG,
}

export type Project = TObjectKeyAsType<typeof obj>

export function returnImageProject(name: Project): string {
  return obj[name]
}
