import { H4, H5, Text } from "@/modules/common/components/Typography";
import { type BasketOrder } from "@/modules/user/basket/hooks/useBasketStore";
import AddonsCard from "@/modules/user/food/components/AddonsCard";
import { type Menu } from "@/modules/user/menu/types";
import { useSession } from "@/modules/user/order/hooks/useSession";
import styled from "@emotion/styled";
import { Input } from "antd";
import { type ChangeEvent, type Dispatch, type SetStateAction } from "react";

type ContentProps = {
  menu?: Menu;
  newBasketOrder?: BasketOrder;
  setNewBasketOrder?: Dispatch<SetStateAction<BasketOrder | undefined>>;
};

const Content: React.FC<ContentProps> = ({
  menu,
  newBasketOrder,
  setNewBasketOrder,
}) => {
  const { data: session } = useSession();

  const handleToggleAddon = (addon: Menu["addons"][number]) => {
    if (!setNewBasketOrder) {
      return;
    }

    setNewBasketOrder((prev) => {
      if (!prev) {
        return prev;
      }
      if (prev?.menu?.addons?.find((a) => a._id === addon._id)) {
        return {
          ...prev,
          menu: {
            ...prev?.menu,
            addons: prev?.menu?.addons?.filter((a) => a._id !== addon._id),
          },
        };
      }
      return {
        ...prev,
        menu: {
          ...prev?.menu,
          addons: [...(prev?.menu?.addons ?? []), addon],
        },
      };
    });
  };

  const handleAddAdditionRequest = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!setNewBasketOrder) {
      return;
    }

    setNewBasketOrder((prev) => {
      if (!prev) {
        return prev;
      }
      return {
        ...prev,
        menu: {
          ...prev?.menu,
          additionalRequest: e.target.value,
        },
      };
    });
  };

  return (
    <ContentContainer>
      <H4>{menu?.title}</H4>
      <Text type="secondary">{menu?.description}</Text>
      <AddonContainer>
        {menu?.addons
          ?.sort((a, b) => (a?.price ?? 0) - (b?.price ?? 0))
          ?.filter((addon) => addon?.available === true)
          ?.map((addon) => (
            <AddonsCard
              key={addon._id}
              addon={addon}
              handleToggleAddon={handleToggleAddon}
              isChecked={
                newBasketOrder?.menu?.addons?.find(
                  (a) => a._id === addon._id,
                ) !== undefined
              }
            />
          ))}
      </AddonContainer>
      {session && (
        <AdditionalRequest>
          <H5 style={{ marginLeft: "8px" }}>คำขอเพิ่มเติม</H5>
          <Input.TextArea
            style={{
              borderRadius: "12px",
              height: "55px",
            }}
            autoSize={{ minRows: 4, maxRows: 6 }}
            placeholder="เช่น ไม่ใส่พริก"
            value={newBasketOrder?.menu?.additionalRequest}
            onChange={handleAddAdditionRequest}
          />
        </AdditionalRequest>
      )}
    </ContentContainer>
  );
};

export default Content;

const ContentContainer = styled.div`
  margin: 20px;
  margin-bottom: calc(20px + 88px);
`;

const AddonContainer = styled.div`
  margin-block: 28px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AdditionalRequest = styled.div``;
