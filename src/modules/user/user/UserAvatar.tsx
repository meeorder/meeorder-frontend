import { User } from "@phosphor-icons/react";
import { Avatar, theme } from "antd";

type UserAvatarProps = {
  image?: string;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ image }) => {
  const {
    token: { colorPrimary, colorPrimaryBg },
  } = theme.useToken();

  if (image) {
    return <Avatar size={44} src={image} alt="User avatar" />;
  } else {
    return (
      <Avatar
        size={44}
        style={{ backgroundColor: colorPrimaryBg }}
        icon={<User color={colorPrimary} weight="duotone" />}
      />
    );
  }
};

export default UserAvatar;
