import { H4, H5, Text } from "@/modules/common/components/Typography";
import AddonsCard from "@/modules/user/food/components/AddonsCard";
import { addOnData } from "@/modules/user/mock/addon";
import { type Food } from "@/modules/user/mock/foods";
import styled from "@emotion/styled";
import { Input } from "antd";

type ContentProps = {
  food?: Food;
};

const Content: React.FC<ContentProps> = ({ food }) => {
  return (
    <ContentContainer>
      <H4>{food?.name}</H4>
      <Text type="secondary">{food?.description}</Text>
      <AddonContainer>
        {addOnData.map((addon) => (
          <AddonsCard key={addon.id} addon={addon} />
        ))}
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
