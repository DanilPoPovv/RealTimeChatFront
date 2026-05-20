import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./UserMenu.css"
import { useAuth } from "../../Shared/context/AuthContext";
type UserMenuProps = {
    closeUserMenu: () => void;
    openAvatarEditModal : () => void;
}
export function UserMenu(UserMenuProps: UserMenuProps) {
    const {currentUser} = useAuth();
    
    const userMenuRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
                UserMenuProps.closeUserMenu();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);


        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])
    return createPortal(
        <div ref={userMenuRef} className="userMenu">
            <div className="userInfo">
                <img className="userAvatar" 
                src={`https://localhost:7110${currentUser?.avatarUrl}`}/>
                <div style={{marginTop : "15px"}}>{currentUser?.name}</div>
            </div>
            <hr />
            <button className="avatarUpdateBtn" onClick={UserMenuProps.openAvatarEditModal}>Обновить аватар</button>
            <button className="userMenuButton">Создать группу</button>
        </div>
        , document.body)
}