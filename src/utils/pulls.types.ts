export interface IPullInfo {
  number: number
  state: 'open' | 'closed'
  title: string
  review_comments_url: string
  html_url: string
}

interface User {
  login: string
  html_url: string
  avatar_url: string
}

export interface IPullsOpenInfo {
  id: number
  html_url: string
  title: string
  user: User
  created_at: Date
  updated_at: Date
  number: number
  requested_reviewers?: User[]
}
