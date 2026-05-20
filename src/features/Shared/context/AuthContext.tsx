import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../../../entities/chat/domainTypes";
import { userRepository } from "../../../api/user/UserRepository";
type AuthContextType = {
    token: string | null;
    currentUser: User | null;

    setToken: (
        token: string | null
    ) => void;

    setCurrentUser: (
        user: User | null
    ) => void;
};


const AuthContext =
    createContext<AuthContextType | null>(null);

type AuthProviderProps = {
    children: ReactNode;
}


export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] =
        useState<string | null>(null)
    const [currentUser, setCurrentUser] =
        useState<User | null>(null);
    useEffect(() => {

        const initAuth = async () => {
            const token = localStorage.getItem("token");

            if (!token) return;

            setToken(token);

            const user =
                await userRepository.loadMe();

            setCurrentUser(user);
        };

        initAuth();

    }, []);
    return (
        <AuthContext.Provider value={{
            token,
            currentUser,
            setToken,
            setCurrentUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("context must be used in AuthProvider")
    }

    return context;
}