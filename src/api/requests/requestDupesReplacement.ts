import { AnimeBaseResponseType } from '../../types'
import requestAnimeData from './requestAnimeData'

async function requestDupesReplacement(
  arr: AnimeBaseResponseType[],
  url: string,
  page: number,
  iPerPage: number,
) {
  const newArr: AnimeBaseResponseType[] = arr.slice(0)
  let currPage = page
  while (newArr.length < iPerPage) {
    currPage += 1
    const diff = iPerPage - newArr.length
    const newUrl = url + `&page=${currPage}`
    const extraData = await requestAnimeData(newUrl)

    newArr.concat(extraData.slice(0, diff))
  }
  return newArr
}

export default requestDupesReplacement
