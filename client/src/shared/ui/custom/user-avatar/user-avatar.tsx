import { User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/core/avatar";

interface UserAvatarProps {
  imageUrl?: string;
  name?: string;
  className?: string;
}

const UserAvatar = ({ imageUrl, name, className }: UserAvatarProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={imageUrl} alt={name} />
      <AvatarFallback>
        <User className="size-4" />
      </AvatarFallback>
    </Avatar>
  );
};

export { UserAvatar };
