//TODO: read from RTDB
import { useState } from "react";

interface ActiveUsersInput {
    collectionPath: string
}

const useActiveUsers = ({ collectionPath }: ActiveUsersInput) => {
    const [users, setUsers] = useState([])
    return users;
}

export default useActiveUsers;