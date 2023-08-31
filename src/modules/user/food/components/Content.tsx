import { H4, H5, Text } from "@/modules/common/components/Typography";
import AddonsCard from "@/modules/user/food/components/AddonsCard";
import { type Menu } from "@/modules/user/menu/types";
import styled from "@emotion/styled";
import { Input } from "antd";

type ContentProps = {
  food: Menu;
};

const Content: React.FC<ContentProps> = ({ food }) => {
  return (
    <ContentContainer>
      <H4>{food?.title}</H4>
      <Text type="secondary">{food?.description}</Text>
      <AddonContainer>
        {food?.addons
          ?.sort((a, b) => (a?.price ?? 0) - (b?.price ?? 0))
          ?.map((addon) => <AddonsCard key={addon._id} addon={addon} />)}
      </AddonContainer>
      <AdditionalRequest>
        <H5 style={{ marginLeft: "8px" }}>Additional Request</H5>
        <Input.TextArea
          style={{
            borderRadius: "12px",
            height: "55px",
          }}
          autoSize={{ minRows: 4, maxRows: 6 }}
          placeholder="E.g No Carb"
        />
      </AdditionalRequest>
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
