"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Deck = ({ }) => {

  return <></>
}

export default function Home() {
  const [decks, setDecks] = useState([])

  useEffect(() => {
    fetch("/api/deck").then(r => console.log("Request was successful"))
  }, [])
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>
        <h1>All Decks</h1>
        {decks.map(d => <Deck key={Math.random()} />)}
      </div>

      <div>
        <button className="outline-lime-400">Create Random</button>
      </div>
    </main >
  )
}
