import { type Addon } from "@/modules/mock/addons";
import styled from "@emotion/styled";
import { Checkbox, Typography } from "antd";
import { type CheckboxChangeEvent } from "antd/es/checkbox";

export type AddonsCardProps = {
  addons: Addon;
};

const handleChange = (e: CheckboxChangeEvent, addonName: string) => {
  console.log("Addon:", addonName, "checked", e.target.checked);
};

const AddonsCard: React.FC<AddonsCardProps> = ({ addons }) => {
  return (
    <div style={{ marginInline: "12px" }}>
      <FlexRow>
        <Checkbox onChange={(e) => handleChange(e, addons.name)}>
          {addons.name}
        </Checkbox>
        <Typography.Text>+{addons.price.toFixed(2)} Baht</Typography.Text>
      </FlexRow>
    </div>
  );
};

export default AddonsCard;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
