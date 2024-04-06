import { useState, useEffect } from 'react'

import { useDocument, useCollection } from 'react-firebase-hooks/firestore'
import { getFirestore, doc, collection, query, orderBy, Timestamp } from 'firebase/firestore'
import { firestore } from '@/app/_modules/firebase'

import Message from './Message'
import { MessageSchema } from '@/app/_types/main'

interface Props {
  course: string
}
const Messages = ({ course }: Props) => {
  const [mcp, setMcp] = useState("chats/CSE 114/messages")

  useEffect(() => {
    setMcp(`chats/${course}/messages`)
  }, [course])

  const [firebaseMessages, _fbMessageLoading, _fbMessageLoadingErr] = useCollection(query(collection(firestore, mcp), orderBy('firstCreated', 'asc')))

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