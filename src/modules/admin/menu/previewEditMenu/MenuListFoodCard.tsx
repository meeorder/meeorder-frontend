import useConsoleSectionMode from "@/modules/admin/menu/hooks/useConsoleSectionMode";
import TextPrice from "@/modules/common/components/TextPrice";
import { H5 } from "@/modules/common/components/Typography";
import { type Food } from "@/modules/user/mock/foods";
import { PlusOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button } from "antd";
import Image from "next/image";

type MenuListFoodCardProps = {
  food: Food;
};

const MenuListFoodCard: React.FC<MenuListFoodCardProps> = ({ food }) => {
  const { changeToEditMenuMode } = useConsoleSectionMode();

  const getIsFoodPublished = (food: Food) => {
    // return food.published_at == null ? false : true;
    // random 0 or 1
    return parseInt(food.id) > 2 ? false : true;
    // return true;
  };

  return (
    <CardContainer
      onClick={() => changeToEditMenuMode(food.id)}
      style={{
        opacity: getIsFoodPublished(food) ? "1" : "0.1",
      }}
    >
      <TextContainer>
        <H5>{food.name}</H5>
        <TextPrice price={food.price} />
      </TextContainer>
      <PhotoContainer>
        <StyledImage
          src={food.imagePath ?? ""}
          width={500}
          height={500}
          alt={food.name}
        />
        <StyledButton
          id={food.id}
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
        />
      </PhotoContainer>
    </CardContainer>
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

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 120px;
  border: 1px solid ${(props) => props.theme.antd.colorBorderSecondary};
`;

const TextContainer = styled.div`
  padding-top: 24px;
  margin-left: 24px;
  height: 100%;
`;

const PhotoContainer = styled.div`
  position: relative;
`;
