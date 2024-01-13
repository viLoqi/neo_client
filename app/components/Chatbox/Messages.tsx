import React from 'react'
import Message from './Message'

const Messages = () => {
  return (
    <div className='flex flex-col h-full px-20 py-10 overflow-auto no-scrollbar'>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
    </div>
  )
}

export default Messages