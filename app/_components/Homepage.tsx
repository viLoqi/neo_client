import Link from 'next/link'

import { User, Auth } from "firebase/auth";

import { Button } from "./Button";

interface HomePageProps {
    user: User,
    auth: Auth
}

export default function HomePage({ user, auth }: HomePageProps) {
    // use temp data for the client rn
    const classes = ["CSE 114", "CSE 214", "CSE 215", "CSE 216"]
    const users = ["Jie", "Zb", "Wilson", "Benny"]


    return <div className="flex flex-col items-center">

        <div className="flex flex-col gap-4">
            {/* Keep this button for now even though it's not in the figma */}
            <Button>
                <Link href="/leetcode">LEET CODE BABY</Link>
            </Button>
            {/*  */}

            <Button>
                <Link href="/question">View Question Component</Link>
            </Button>

            <Button>
                <Link href="/chatbox">View Chatbox Component</Link>
            </Button>

            <Button>
                <Link href="/deck">View Deck Component</Link>
            </Button>

        </div>


        <h1>Welcome {user.displayName}!</h1>
        <Button size='sm' variant='outline' onClick={() => auth.signOut()}>
            Sign Out
        </Button>
    </div>;
}