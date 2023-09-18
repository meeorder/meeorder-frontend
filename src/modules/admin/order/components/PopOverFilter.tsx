import { CenterContentButton } from "@/modules/common/components/CenterContentButton";
import styled from "@emotion/styled";
import { Funnel } from "@phosphor-icons/react";
import { Button, Divider, Popover, Select, type SelectProps } from "antd";
import React, { useState, type Dispatch } from "react";

type PopOverFilterProps = {
  options: SelectProps["options"];
  setFilterCategory: Dispatch<React.SetStateAction<string[]>>;
  filterCategory: string[];
};

const PopOverFilter: React.FC<PopOverFilterProps> = ({
  options,
  setFilterCategory,
  filterCategory,
}) => {
  const [clicked, setClicked] = useState(false);
  const [changeFilterCategory, setChangeFilterCategory] =
    useState<string[]>(filterCategory);

  const onSave = () => {
    setClicked(false);
    setFilterCategory(changeFilterCategory);
  };
  const onCancle = () => {
    setClicked(false);
    setChangeFilterCategory(filterCategory);
  };
  const onReset = () => {
    setChangeFilterCategory([]);
  };
  const handleClickChange = (open: boolean) => {
    setClicked(open);
    setChangeFilterCategory(filterCategory);
    console.log("filterCategory", filterCategory);
    console.log("changeFilterCategory", changeFilterCategory);
    console.log("clicked");
  };
  const onChangeCategory = (value: string[]) => {
    setChangeFilterCategory(value);
  };
  return (
    <StyledPopover
      placement="bottomRight"
      trigger="click"
      open={clicked}
      onOpenChange={handleClickChange}
      title={
        <>
          <div>ตัวเลือกแสดงข้อมูล:</div>
          <Divider style={{ margin: "8px" }} />
        </>
      }
      content={
        <StyledContentContainer>
          <StyledSelectSection>
            <div>Category</div>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "25vw" }}
              options={options}
              defaultValue={filterCategory}
              value={changeFilterCategory}
              onChange={(value: string[]) => {
                onChangeCategory(value);
              }}
            />
          </StyledSelectSection>
          <BottonGroup>
            <Button onClick={onSave}>save</Button>
            <Button onClick={onCancle}>cancel</Button>
            <Button onClick={onReset}>reset</Button>
          </BottonGroup>
        </StyledContentContainer>
      }
    >
      <CenterContentButton
        type="primary"
        shape="round"
        icon={<Funnel size={16} />}
      >
        ตัวเลือกแสดงข้อมูล
      </CenterContentButton>
    </StyledPopover>
  );
};

const StyledSelectSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  margin-top: 12px;
`;

const BottonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;
`;

const StyledPopover = styled(Popover)`
  position: relative;
`;

const StyledContentContainer = styled.div`
  width: 100%;
`;

export default PopOverFilter;
