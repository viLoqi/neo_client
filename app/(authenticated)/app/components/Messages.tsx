
import Message from './Message'
import { MessageSchema } from '@/app/_types/main'
import useChat from '@/hooks/useChat'

interface Props {
  course: string
}
const Messages = ({ course }: Props) => {

  // const [firebaseMessages, _fbMessageLoading, _fbMessageLoadingErr] = useCollection(query(collection(firestore, mcp), orderBy('firstCreated', 'asc')))

  const { chatMessages } = useChat({ room: course })

  return (
    <div className='flex flex-col h-full px-20 py-10 overflow-auto no-scrollbar'>
      {chatMessages?.map(e => {
        const currMsg = e as MessageSchema
        return <Message key={crypto.randomUUID()} {...currMsg} />
      })}
    </div>
  )
}

export default Messages