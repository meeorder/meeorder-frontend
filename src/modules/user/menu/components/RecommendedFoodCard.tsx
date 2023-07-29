import TextPrice from "@/modules/common/components/TextPrice";
import { H5 } from "@/modules/common/components/Typography";
import { type Food } from "@/modules/user/mock/foods";
import styled from "@emotion/styled";
import { Col } from "antd";
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
      <FoodNameText bold>{food.name}</FoodNameText>
      <StyledTextPrice price={food.price} />
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

const FoodNameText = styled(H5)`
  position: absolute;
  left: 10px;
  top: 10px;
  color: #ffffff !important;
`;

const StyledTextPrice = styled(TextPrice)`
  position: absolute;
  right: calc(16px + 4px);
  bottom: 16px;
  padding: 1px 8px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.antd.colorBorder};
  background: ${(props) => props.theme.antd.colorBgLayout};
`;
