import { useContext } from "react";
import { UserMenuContext } from "../Shared/context/UserMenuContext";

export function useUserMenu() {

    const context =
        useContext(UserMenuContext);

    if (!context) {
        throw new Error(
            "useUserMenu must be used within UserMenuProvider"
        );
    }

    return context;
}