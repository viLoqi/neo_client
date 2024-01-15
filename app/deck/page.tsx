'use client';

import React from 'react';
import './BrowseDeckPage.css';
import Link from 'next/link';
import { CiCircleChevLeft } from "react-icons/ci";
import UserCard from "../components/UserCard";


const Deck = ({ title, cards }) => {
  return (
    <div className="deck">
      <h3>{title}</h3>
      <ul>
        {cards.map(card => (
          <li key={card.id} className={card.completed ? 'completed' : 'not-completed'}>
            {card.question}
          </li>
        ))}
      </ul>
    </div>
  );
};

const BrowseDeckPage = () => {
  // Temporary static data for decks
  const tempDecks = [
    {
      id: 'deck1',
      name: 'Override vs Overload?',
      cards: [
        { id: 'card1', question: 'Example 3', completed: false },
        { id: 'card2', question: 'Example 2', completed: true },
        { id: 'card3', question: 'Example 1', completed: true },
      ],
    },
    {
      id: 'deck2',
      name: 'Arrays',
      cards: [
        { id: 'card4', question: 'Algorithms with arrays', completed: false },
        { id: 'card5', question: 'Example 2', completed: true },
        { id: 'card6', question: 'Example 2', completed: true },

      ],
    },
    {
    id: 'deck3',
    name: 'Recursion',
    cards: [
        { id: 'card7', question: 'Tower of Hanoi', completed: false },
        { id: 'card8', question: 'Binary Search Tree', completed: false },
        { id: 'card9', question: 'Factorial', completed: false },

    ],
    },
    {
    id: 'deck4',
    name: 'Final Review',
    cards: [
        { id: 'card10', question: 'Midterm 1', completed: true },
        { id: 'card11', question: 'Midterm 2', completed: false },
        { id: 'card12', question: 'Practice 1', completed: false },

    ],
    },
    // ... more decks
  ];

  // Use the static data as the initial state
  const [decks, setDecks] = React.useState(tempDecks);

  const addNewDeck = () => {
    // Implement functionality to add a new deck
  };

  return (
    <div className="flex w-full h-screen bg-green-900">
            <div className="back-link">
                <Link href="/">
                    <CiCircleChevLeft size="50" color="white" />
                </Link>
            </div>
            <div className="flex-grow p-4">
                <div className="add-deck-button-container">
                    <button onClick={addNewDeck}>Add new deck</button>
                    </div>
                    <div className="search-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search decks"
                />
                </div>
                <div className="deck-list">
                {decks.map(deck => (
                    <Deck key={deck.id} title={deck.name} cards={deck.cards} />
                ))}
                </div>
            </div>

        <div className="bg-[#003825] w-56 order-last"> {/* Use "order-first" to move it to the right */}
                <UserCard
                    userName="user"
                    userHandle="user123"
                    userProfilePicture="/dummy-user-pic.jpg"
                />
                <UserCard
                    userName="user"
                    userHandle="user123"
                    userProfilePicture="/dummy-user-pic.jpg"
                />
                <UserCard
                    userName="user"
                    userHandle="user123"
                    userProfilePicture="/dummy-user-pic.jpg"
                />
                <UserCard
                    userName="user"
                    userHandle="user123"
                    userProfilePicture="/dummy-user-pic.jpg"
                />
                <UserCard
                    userName="user"
                    userHandle="user123"
                    userProfilePicture="/dummy-user-pic.jpg"
                />
            </div>
    </div>
  );
};

export default BrowseDeckPage;
