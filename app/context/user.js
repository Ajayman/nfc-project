"use client"
import { createContext, useState } from "react"
import ResponsiveAppBar from "app/components/appbar";
const UserContext = createContext();

export function UserProvider({ user }) {
    const [loggedUser, setLoggedUser] = useState(user);
    console.log(loggedUser);
    <UserContext.Provider value={loggedUser}>
        <ResponsiveAppBar />
    </UserContext.Provider>
}

export { UserContext };