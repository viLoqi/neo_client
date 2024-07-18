import { useState, useEffect } from 'react'

import { useCollection } from 'react-firebase-hooks/firestore'

import Message from './Message'
import { MessageSchema } from '@/app/_types/main'
import useFirestore from '@/hooks/useFirestore'

interface Props {
  course: string
}
const Messages = ({ course }: Props) => {
  const [collectionPath, setCollectionPath] = useState("chats/CSE 114/messages")

  useEffect(() => {
    setCollectionPath(`chats/${course}/messages`)
  }, [course])

  // const [firebaseMessages, _fbMessageLoading, _fbMessageLoadingErr] = useCollection(query(collection(firestore, mcp), orderBy('firstCreated', 'asc')))

  const [firebaseMessages] = useFirestore({ collectionPath })

  return (
    <div className='flex flex-col h-full px-20 py-10 overflow-auto no-scrollbar'>
      {firebaseMessages?.docs.map(e => {
        const currMsg = e.data() as MessageSchema
        return <Message key={crypto.randomUUID()} {...currMsg} />
      })}
    </div>
  )
}

export default Messages