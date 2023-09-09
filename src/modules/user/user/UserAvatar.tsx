import { type User } from "@/modules/services/auth";
import styled from "@emotion/styled";
import { User as ReactUser } from "@phosphor-icons/react";
import { theme } from "antd";

type UserAvatarProps = {
  user?: User | null;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  const {
    token: { colorPrimary, colorPrimaryBg },
  } = theme.useToken();

  if (user) {
    const colors = [
      "#737373",
      "#78716c",
      "#ef4444",
      "#f97316",
      "#f59e0b",
      "#eab308",
      "#84cc16",
      "#22c55e",
      "#10b981",
      "#14b8a6",
      "#06b6d4",
      "#0ea5e9",
      "#3b82f6",
      "#6366f1",
      "#8b5cf6",
      "#a855f7",
      "#d946ef",
      "#ec4899",
      "#f43f5e",
    ];

    const userColor = colors[parseInt(user._id) % colors.length];

    return (
      <Avatar style={{ backgroundColor: userColor }}>
        {user?.username?.[0]?.toUpperCase() || ""}
      </Avatar>
    );
  } else {
    return (
      <Avatar style={{ backgroundColor: colorPrimaryBg }}>
        <ReactUser color={colorPrimary} weight="duotone" />
      </Avatar>
    );
  }
};

export default UserAvatar;

const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
`;
