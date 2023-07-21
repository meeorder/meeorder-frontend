import { type Food } from "@/modules/mock/foods";
import styled from "@emotion/styled";
import { Col, ConfigProvider, Tag, Typography } from "antd";
import Image from "next/image";

type RecommendedFoodCardProps = {
  food: Food;
};

const RecommendedFoodCard: React.FC<RecommendedFoodCardProps> = ({ food }) => {
  const {
    id,
    name = "RecommededFoodImage",
    price,
    description,
    imagePath,
  } = food;

  return (
    <Col span={12}>
      {imagePath && (
        <StyledImage src={imagePath} alt={name} width={200} height={200} />
      )}
      <ConfigProvider
        theme={{
          components: {
            Typography: {
              colorText: "#ffffff",
            },
          },
        }}
      >
        <FoodNameText>{name}</FoodNameText>
      </ConfigProvider>
      <PriceTag>
        <PriceText>{price} Baht</PriceText>
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

  border-radius: 12px;
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
  right: 16px;
  bottom: 17px;

  border-radius: 12px;
  border: 1px solid var(--neutral-5, #d9d9d9);
  background: var(--neutral-2, #fafafa);
`;

const PriceText = styled(Typography.Text)`
  display: flex;
  padding: 1px 8px;
  align-items: center;
  gap: 3px;

  color: var(--neutral-9, #434343);

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`;
