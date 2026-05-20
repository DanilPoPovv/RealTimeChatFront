import "./avatarEditModal.css";
type AvatarEditModalProps = {
    currentAvatarUrl: string;
}

export function AvatarEditModal({
    currentAvatarUrl
}: AvatarEditModalProps) {
    return (
        <div className="avatarEditModal">
            <img src={currentAvatarUrl}/>
        </div>
    )
}