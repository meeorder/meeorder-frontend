import TextPrice from "@/modules/common/components/TextPrice";
import { checkImageSrc } from "@/modules/common/utils";
import { type Menu } from "@/modules/user/menu/types";
import { useSession } from "@/modules/user/order/hooks/useSession";
import { PlusOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, List } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";

type SimpleFoodCardProps = {
  menu: Menu;
};

const SimpleFoodCard: React.FC<SimpleFoodCardProps> = ({ menu }) => {
  const router = useRouter();

  const handleChooseMenu = () => {
    void router.push({
      pathname: `/menu/${menu._id}`,
    });
  };

  const { data: session } = useSession();

  return (
    <List.Item
      onClick={handleChooseMenu}
      style={{
        position: "relative",
      }}
      extra={
        <>
          <StyledImage
            src={checkImageSrc(menu.image ?? "")}
            width={500}
            height={500}
            alt={menu.title}
          />
          {!!session && (
            <StyledButton
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
            />
          )}
        </>
      }
    >
      <List.Item.Meta
        title={menu.title}
        description={<TextPrice price={menu.price} />}
      />
    </List.Item>
  );
};

export default SimpleFoodCard;

const StyledImage = styled(Image)`
  margin: 8px;
  border-radius: 8px;
  object-fit: cover;
  object-position: center;
  width: 100px;
  height: 100px;
`;

const StyledButton = styled(Button)`
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
