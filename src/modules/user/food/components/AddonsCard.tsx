import { Text } from "@/modules/common/components/Typography";
import { type AddOnDataType } from "@/modules/user/mock/addon";
import styled from "@emotion/styled";
import { Checkbox } from "antd";
import { type CheckboxChangeEvent } from "antd/es/checkbox";

export type AddonsCardProps = {
  addon: AddOnDataType;
};

const handleChange = (e: CheckboxChangeEvent, addonTitle: string) => {
  console.log("Addon:", addonTitle, "checked", e.target.checked);
};

const AddonsCard: React.FC<AddonsCardProps> = ({ addon }) => {
  return (
    <div style={{ marginInline: "12px" }}>
      <FlexRow>
        <Checkbox onChange={(e) => handleChange(e, addon.title)}>
          {addon.title}
        </Checkbox>
        <Text type="secondary">+{addon.price} Baht</Text>
      </FlexRow>
    </div>
  );
};

export default AddonsCard;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
`;