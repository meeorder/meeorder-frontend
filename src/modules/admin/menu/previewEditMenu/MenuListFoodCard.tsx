import useConsoleSectionMode from "@/modules/admin/menu/hooks/useConsoleSectionMode";
import TextPrice from "@/modules/common/components/TextPrice";
import { H5 } from "@/modules/common/components/Typography";
import { type Food } from "@/modules/user/mock/foods";
import { PlusOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Tag, theme } from "antd";
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

  const { editMenuId } = useConsoleSectionMode();
  const {
    token: { colorPrimaryBorder },
  } = theme.useToken();

  return (
    <CardContainer
      style={{
        border: editMenuId === food.id ? `2px solid ${colorPrimaryBorder}` : "",
        borderRadius: "8px",
      }}
      onClick={() => {
        if (editMenuId === food.id) return;
        changeToEditMenuMode(food.id);
      }}
    >
      <TextContainer>
        <div>
          <H5
            style={{
              display: "inline-block",
            }}
          >
            {food.name}
          </H5>
          {!getIsFoodPublished(food) && (
            <StyledStatusTag color="orange">ร่าง</StyledStatusTag>
          )}
        </div>
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
  border: 2px solid ${(props) => props.theme.antd.colorBorderSecondary};
`;

const TextContainer = styled.div`
  padding-top: 24px;
  margin-left: 24px;
  height: 100%;
`;

const PhotoContainer = styled.div`
  position: relative;
`;

const StyledStatusTag = styled(Tag)`
  border-radius: 12px;
  margin-left: 8px;
`;
