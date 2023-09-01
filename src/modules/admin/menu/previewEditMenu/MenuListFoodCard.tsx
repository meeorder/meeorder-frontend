import TextPrice from "@/modules/common/components/TextPrice";
import { type Food } from "@/modules/user/mock/foods";
import { PlusOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, List } from "antd";
import Image from "next/image";

type MenuListFoodCardProps = {
  food: Food;
};

const MenuListFoodCard: React.FC<MenuListFoodCardProps> = ({ food }) => {
  return (
    <List.Item
      style={{
        position: "relative",
      }}
      extra={
        <>
          <StyledImage
            src={food.imagePath ?? ""}
            width={500}
            height={500}
            alt={food.name}
          />
          <StyledButton type="primary" shape="circle" icon={<PlusOutlined />} />
        </>
      }
    >
      <List.Item.Meta
        title={food.name}
        description={<TextPrice price={food.price} />}
      />
    </List.Item>
  );
};

export default MenuListFoodCard;

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
