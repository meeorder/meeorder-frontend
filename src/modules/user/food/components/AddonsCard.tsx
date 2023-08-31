import { Text } from "@/modules/common/components/Typography";
import { type Menu } from "@/modules/user/menu/types";
import styled from "@emotion/styled";
import { Checkbox } from "antd";
import { type CheckboxChangeEvent } from "antd/es/checkbox";

export type AddonsCardProps = {
  addon: Menu["addons"][number];
};

const AddonsCard: React.FC<AddonsCardProps> = ({ addon }) => {
  const handleChange = (e: CheckboxChangeEvent, addonTitle: string) => {
    console.log("Addon:", addonTitle, "checked", e.target.checked);
  };
  return (
    <div style={{ marginInline: "12px" }}>
      <FlexRow>
        <Checkbox onChange={(e) => handleChange(e, addon?.title)}>
          {addon?.title}
        </Checkbox>
        <Text type="secondary">+{addon?.price} Baht</Text>
      </FlexRow>
    </div>
  );
};

export default AddonsCard;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
