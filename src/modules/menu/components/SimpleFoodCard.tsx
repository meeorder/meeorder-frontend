import { type Food } from "@/modules/mock/foods";
import { PlusOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, List } from "antd";
import Image from "next/image";

type SimpleFoodCardProps = {
  food: Food;
};

const SimpleFoodCard: React.FC<SimpleFoodCardProps> = ({ food }) => {
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
      <List.Item.Meta title={food.name} description={`${food.price} Bath`} />
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
`;
