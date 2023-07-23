import { type Food } from "@/modules/mock/foods";
import { PlusOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Col, List } from "antd";
import Image from "next/image";

type SimpleFoodCardProps = {
  food: Food;
};

const SimpleFoodCard: React.FC<SimpleFoodCardProps> = ({ food }) => {
  return (
    <List.Item
      key={food.id}
      extra={
        <Col>
          <StyledImage
            src={food.imagePath}
            preview={false}
            width={100}
            height={100}
            alt="pic"
          />
          <StyledButton type="primary" shape="circle" icon={<PlusOutlined />} />
        </Col>
      }
    >
      <List.Item.Meta title={food.name} description={`\$${food.price}`} />
    </List.Item>
  );
};

export default SimpleFoodCard;

const StyledImage = styled(Image)`
  border-radius: 5.667px;
`;
const StyledButton = styled(Button)`
  position: absolute;
  right: 11px;
  top: 73px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: ${(props) => props.theme.antd.colorPrimary};
`;
