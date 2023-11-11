import { Text } from "@/modules/common/components/Typography";
import { type Menu } from "@/modules/user/menu/types";
import { useSession } from "@/modules/user/order/hooks/useSession";
import styled from "@emotion/styled";
import { Checkbox } from "antd";

export type AddonsCardProps = {
  addon: Menu["addons"][number];
  handleToggleAddon: (addon: Menu["addons"][number]) => void;
  isChecked: boolean;
};

const AddonsCard: React.FC<AddonsCardProps> = ({
  addon,
  handleToggleAddon,
  isChecked,
}) => {
  const { data: session } = useSession();

  return (
    <div style={{ marginInline: "12px" }}>
      <FlexRow>
        <Checkbox
          checked={isChecked}
          disabled={!session}
          onChange={() => handleToggleAddon(addon)}
        >
          {addon?.title}
        </Checkbox>
        <Text type="secondary">+฿{addon?.price}</Text>
      </FlexRow>
    </div>
  );
};

export default AddonsCard;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
