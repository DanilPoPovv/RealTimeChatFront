import { useUserMenu } from "../../hooks/useUserMenu";
import { useAuth } from "../../Shared/context/AuthContext";
import { AvatarEditModal } from "./avatarEdit/AvatarEditModal";
import { UserMenu } from "./UserMenu";

export function UserMenuHandler(){
    const { userMenuState, setUserMenuState } = useUserMenu();
    const { currentUser } = useAuth();
    if(!userMenuState) return;

    switch(userMenuState.type) {
        case "base":
            return <UserMenu closeUserMenu={() => setUserMenuState(null)}
                             openAvatarEditModal={() => {
                                setUserMenuState({
                                    type : "avatarEdit",
                                    currentAvatarUrl: currentUser?.avatarUrl ?? ""
                                })
                                console.log(userMenuState.type);
                             }}
            />
        case "avatarEdit":
            return <AvatarEditModal 
                    currentAvatarUrl={userMenuState.currentAvatarUrl}
                    />
    }
}