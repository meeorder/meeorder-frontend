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
    image = "",
  } = food;

  return (
    <Col span={12}>
      <StyledImage src={image} alt={name} width={217} height={217} />
      <ConfigProvider
        theme={{
          components: {
            Typography: {
              colorText: "#ffffff",
            },
          },
        }}
      >
        <FoodName level={5}>{name}</FoodName>
      </ConfigProvider>
      <PriceTag>{price} Baht</PriceTag>
    </Col>
  );
};

export default RecommendedFoodCard;

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
`;

const StyledImage = styled(Image)`
  flex: 1 0 0;
  align-self: stretch;

  width: 100%;
  /* height: 100%; */
  object-fit: cover;
  object-position: center;

  /* height: 100%; */

  border-radius: 12px;
  background:
    linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
    url(<path-to-image>),
    lightgray -2.26px -11.135px / 103.623% 134.454% no-repeat;
`;

const FoodName = styled(Typography.Title)`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start; */

  position: absolute;
  padding: 0px;
  margin: 0px;
  left: 10px;
  top: 10px;
`;

const PriceTag = styled(Tag)`
  position: absolute;
  right: 16px;
  bottom: 17px;

  border-radius: 12px;
  border: 1px solid var(--neutral-5, #d9d9d9);
  background: var(--neutral-2, #fafafa);
`;

const Price = styled.div`
  display: flex;
  padding: 1px 8px;
  align-items: center;
  gap: 3px;

  color: var(--neutral-9, #434343);

  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`;
