import { Dispatch } from 'redux'

import parseAnimePageResponse from '../../api/parsers/parseAnimePageResponse'
import { AnimeBaseResponseType } from '../../types'
import {
  fetchAnimePageEmpty,
  fetchAnimePageFailure,
  fetchAnimePageRequest,
  fetchAnimePageSuccess,
} from '../thunk/thunkActionCreators'
import getAnimeData from '../../api/requests/getAnimeData'
import createGetTopAnimeUrl from '../../utils/urlCreators/createGetTopAnimeUrl'

function requestRandomPageData() {
  const makeRequest = async (dispatch: Dispatch) => {
    dispatch(fetchAnimePageRequest())
    try {
      const url = createGetTopAnimeUrl()
      const response = await fetch(url)
      const data: {
        pagination: { last_visible_page: number }
        data: AnimeBaseResponseType[]
      } = await response.json()
      const totalAnimes = data.pagination.last_visible_page
      const randomPage = Math.floor(Math.random() * totalAnimes)
      const newUrl = url + '&page=' + randomPage
      const responseData = await getAnimeData(newUrl)
      if (!responseData) {
        dispatch(fetchAnimePageEmpty())
      } else {
        const responsePageArray = responseData.data
        const parsedPageData = parseAnimePageResponse(responsePageArray[0])
        dispatch(fetchAnimePageSuccess(parsedPageData))
      }
    } catch {
      dispatch(fetchAnimePageFailure())
    }
  }
  return makeRequest
}

export default requestRandomPageData
