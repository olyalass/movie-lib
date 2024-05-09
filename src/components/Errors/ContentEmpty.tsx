import { FrownOutlined } from '@ant-design/icons'

function ContentEmpty({ type }: { type: 'byId' | 'byFilters' | 'byList' }) {
  let message = ''
  switch (type) {
    case 'byFilters':
      message = "Sorry, there're no animes with these parametres"
      break
    case 'byId':
      message = "Sorry, anime with this ID doesn't exist"
      break
    case 'byList':
      message = 'This list is empty'
      break
    default:
      message = 'Empty page'
  }

  return (
    <div className="icon-container">
      <FrownOutlined className="icon" />
      <p className="icon-message">{message}</p>
    </div>
  )
}

export default ContentEmpty