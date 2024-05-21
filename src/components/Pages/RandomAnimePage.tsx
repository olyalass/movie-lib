import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import AnimeBigCard from '../Content/AnimeBigCard'
import { AnimePageDataType, DispatchType } from '../../types'
import { StateType } from '../../types'
import requestRandomPageData from '../../redux/thunk/requestRandomPageData'
import ContentLoading from '../Loadings/ContentLoading'
import ContentError from '../Errors/ContentError'
import CaseComponent from '../ContentPieces/CaseComponent'
import { fetchAnimePageRequest } from '../../redux/actionCreators'
import ContentEmpty from '../Errors/ContentEmpty'

function RandomAnimePage() {
  const dispatch: DispatchType = useDispatch()
  const isLoading = useSelector((state: StateType) => state.isLoadingAnimePage)
  const isError = useSelector((state: StateType) => state.isAnimePageError)
  const isEmpty = useSelector((state: StateType) => state.isEmptyPage)
  const data: AnimePageDataType = useSelector(
    (state: StateType) => state.animePageData,
  )
  const isSpinnerActive = isLoading || !data

  useEffect(() => {
    dispatch(requestRandomPageData())

    return () => {
      dispatch(fetchAnimePageRequest())
    }
  }, [dispatch])

  return (
    <div className="random-container">
      <CaseComponent
        isError={isError}
        isSpinnerActive={isSpinnerActive}
        isEmpty={isEmpty}
        errorElement={
          <ContentError>
            <Button
              className="random-button"
              onClick={() => {
                dispatch(requestRandomPageData())
              }}
            >
              Try again
            </Button>
          </ContentError>
        }
        loadingElement={<ContentLoading />}
        emptyElement={<ContentEmpty type="byId" />}
      >
        <AnimeBigCard data={data} />
        <Button
          className="random-button"
          onClick={() => {
            dispatch(requestRandomPageData())
          }}
        >
          Try again
        </Button>
      </CaseComponent>
    </div>
  )
}

export default RandomAnimePage
