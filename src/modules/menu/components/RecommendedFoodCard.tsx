import { type Food } from "@/modules/mock/foods";
import styled from "@emotion/styled";
import { Col, Tag, Typography } from "antd";
import Image from "next/image";

type RecommendedFoodCardProps = {
  food: Food;
};

const RecommendedFoodCard: React.FC<RecommendedFoodCardProps> = ({ food }) => {
  return (
    <Col span={12}>
      <StyledImage
        src={food.imagePath ?? ""}
        alt={food.name}
        width={200}
        height={200}
      />
      <FoodNameText>{food.name}</FoodNameText>
      <PriceTag>
        <PriceText>{food.price} Baht</PriceText>
      </PriceTag>
    </Col>
  );
};

export default RecommendedFoodCard;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  position: relative;
  border-radius: 12px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  filter: brightness(0.8);
`;

const FoodNameText = styled(Typography.Text)`
  position: absolute;
  padding: 0px;
  margin: 0px;
  left: 10px;
  top: 10px;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
`;

const PriceTag = styled(Tag)`
  position: absolute;
  right: calc(16px + 4px);
  bottom: 16px;
  padding: 0px;
  margin: 0px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.antd.colorBorder};
  background: ${(props) => props.theme.antd.colorBgBase};
`;

const PriceText = styled(Typography.Text)`
  display: flex;
  padding: 1px 8px;
  align-items: center;
  gap: 3px;

  color: ${(props) => props.theme.antd.colorTextSecondary};

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`;
