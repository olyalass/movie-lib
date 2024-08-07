import { AnimeBaseResponseType } from '../../types'

export async function getAnimePageData(url: string) {
  const response = await fetch(url)
  if (response.status === 404) {
    return null
  }
  const data: { data: AnimeBaseResponseType } = await response.json()

  return data.data
}
