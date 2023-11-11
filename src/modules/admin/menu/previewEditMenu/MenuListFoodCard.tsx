import useConsoleSectionMode from "@/modules/admin/menu/hooks/useConsoleSectionMode";
import TextPrice from "@/modules/common/components/TextPrice";
import { H5 } from "@/modules/common/components/Typography";
import { checkImageSrc } from "@/modules/common/utils";
import { type GetAllMenusResponse } from "@/modules/services/menus";
import { PlusOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Tag, theme } from "antd";
import Image from "next/image";

type Menu = GetAllMenusResponse[number]["menus"][number];

type MenuListFoodCardProps = {
  menu: Menu;
};

const getIsFoodPublished = (menu: Menu) => {
  return !!menu.published_at;
};

const MenuListFoodCard: React.FC<MenuListFoodCardProps> = ({ menu }) => {
  const { changeToEditMenuMode, editMenuId } = useConsoleSectionMode();
  const { token } = theme.useToken();
  return (
    <CardContainer
      onClick={() => changeToEditMenuMode(menu._id)}
      style={
        editMenuId === menu._id
          ? { border: `2px solid ${token?.colorPrimaryBorder}` }
          : {}
      }
    >
      <TextContainer>
        <div>
          <H5
            style={{
              display: "inline-block",
            }}
          >
            {menu?.title}
          </H5>
          {!getIsFoodPublished(menu) && (
            <StyledStatusTag color="orange">ร่าง</StyledStatusTag>
          )}
        </div>
        <TextPrice price={menu.price} />
      </TextContainer>
      <PhotoContainer>
        <StyledImage
          src={checkImageSrc(menu.image ?? "")}
          width={500}
          height={500}
          alt={menu.title}
        />
        <StyledButton
          id={menu._id}
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
  border-radius: 8px;
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
