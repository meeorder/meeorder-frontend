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
      <AspectRatioSquare>
        <StyledImage
          src={food.imagePath ?? ""}
          alt={food.name}
          width={200}
          height={200}
        />
      </AspectRatioSquare>
      <FoodNameText level={5}>{food.name}</FoodNameText>
      <PriceTag>{food.price} Baht</PriceTag>
    </Col>
  );
};

export default RecommendedFoodCard;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  position: absolute;
  top: 0px;
  left: 0px;
  filter: brightness(0.8);
`;

const AspectRatioSquare = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const FoodNameText = styled(Typography.Title)`
  position: absolute;
  padding: 0px;
  margin: 0px;
  left: 10px;
  top: 10px;
  color: #ffffff !important;
  font-weight: 700 !important;
`;

const PriceTag = styled(Tag)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: calc(16px + 4px);
  bottom: 16px;
  padding: 1px 8px;
  margin: 0px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.antd.colorBorder};
  background: ${(props) => props.theme.antd.colorBgBase};
  color: ${(props) => props.theme.antd.colorTextSecondary};
  font-size: 14px;
`;
