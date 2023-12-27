import { Button } from "./Button";
import { User, Auth } from "firebase/auth";
import Link from 'next/link'
interface HomePageProps {
    user: User,
    auth: Auth
}

const HomePage = ({ user, auth }: HomePageProps) => {
    // use temp data for the client rn
    const classes = ["CSE 114", "CSE 214", "CSE 215", "CSE 216"]
    const users = ["Jie", "Zb", "Wilson", "Benny"]


    return <div>

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

export default HomePage;