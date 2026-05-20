import { createContext, useState, type ReactNode } from "react";
import type { UserMenuState } from "../../../entities/viewTypes"

type UserMenuTypeContext = {
    userMenuState : UserMenuState | null;

    setUserMenuState : (userMenuState : UserMenuState | null) => void;
}

export const UserMenuContext = 
        createContext<UserMenuTypeContext | null>(null);

type UserMenuContextProps = {
    children : ReactNode;
}

export function UserMenuProvider(UserMenuContextProps : UserMenuContextProps){
    const [userMenuState,setUserMenuState] = useState<UserMenuState | null>(null);

    return (
        <UserMenuContext.Provider value={{userMenuState,setUserMenuState}}>
            {UserMenuContextProps.children}
        </UserMenuContext.Provider>
    )
}