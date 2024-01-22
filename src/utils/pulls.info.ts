import axios from 'axios'
import { IPullInfo } from './pulls.types'

export async function getPullRequest(repo: string, pullRequestID: number) {
  const { data } = await axios.get<IPullInfo>(
    `https://api.github.com/repos/devhatt/${repo}/pulls/${pullRequestID}`
  )
  return data
}
