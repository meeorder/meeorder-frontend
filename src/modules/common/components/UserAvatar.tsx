import { useClient } from "@/modules/common/hooks/useClient";
import { type User } from "@/modules/services/auth";
import { User as ReactUser } from "@phosphor-icons/react";
import { Avatar, theme } from "antd";

type UserAvatarProps = {
  user?: User | null;
  size?: number;
  fontSize?: number;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ user, size, fontSize }) => {
  const {
    token: { colorPrimary, colorPrimaryBg },
  } = theme.useToken();

  const { isClientLoaded } = useClient();

  if (!isClientLoaded) {
    return null;
  }

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
      <Avatar
        size={size ?? 44}
        style={{
          backgroundColor: userColor,
        }}
      >
        {fontSize === undefined ? (
          user.username?.[0]?.toUpperCase() || ""
        ) : (
          <div
            style={{
              fontSize: `${fontSize}px`,
            }}
          >
            {user.username?.[0]?.toUpperCase() || ""}
          </div>
        )}
      </Avatar>
    );
  } else {
    return (
      <Avatar
        size={size ?? 44}
        icon={<ReactUser color={colorPrimary} weight="duotone" />}
        style={{ backgroundColor: colorPrimaryBg }}
      />
    );
  }
};

export default UserAvatar;
