import axios from 'axios'
import { IPullInfo, IPullsOpenInfo } from './pulls.types'

export async function getPullRequest(repo: string, pullRequestID: number) {
  const { data } = await axios.get<IPullInfo>(
    `https://api.github.com/repos/devhatt/${repo}/pulls/${pullRequestID}`
  )
  return data
}

export async function getPullsRequest(repo: string) {
  const { data } = await axios.get<IPullsOpenInfo[]>(
    `https://api.github.com/repos/devhatt/${repo}/pulls`
  )
  return data
}
