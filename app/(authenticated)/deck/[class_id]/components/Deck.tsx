import { PrivateDeck } from "@/app/_types/repo"

interface Input {
    deck: PrivateDeck
}
export default function Deck({ deck }: Input) {

    const placeholderDifficulty = 'high'

    return (
        <div className="deck">
            <div className='flex items-center'>
                <p className={`inline-block mr-2 px-4 py-1 font-bold text-[17px] rounded-xl ${placeholderDifficulty == 'high' ? 'bg-[#f3a4a4] text-[#f62020]' : ''}`}>{placeholderDifficulty}</p>
                <h3 className='inline-block'>{deck.name}</h3>
            </div>
            <ul>
                {deck.cards.map(card => (
                    <li className="ml-20 gap-5 text-gray-500 font-semibold" key={crypto.randomUUID()}>
                        <div>{card.question}</div>
                    </li>
                ))}
            </ul>
            {/* <Link className={"btn"} href={`/study/${deck_id}/select`}>STUDY THIS</Link> */}
        </div >
    );
};