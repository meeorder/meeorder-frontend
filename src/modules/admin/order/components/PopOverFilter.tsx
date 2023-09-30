import { CenterContentButton } from "@/modules/common/components/CenterContentButton";
import styled from "@emotion/styled";
import { Funnel } from "@phosphor-icons/react";
import {
  Button,
  Checkbox,
  Divider,
  Popover,
  Select,
  Slider,
  type SelectProps,
} from "antd";
import { type SliderMarks } from "antd/es/slider";
import React, { useState } from "react";

type PopOverFilterProps = {
  options: SelectProps["options"];
  filterCategory: string[];
  setFilterCategory: (value: string[]) => void;
  filterStatus: string[];
  setFilterStatus: (value: string[]) => void;
};

const PopOverFilter: React.FC<PopOverFilterProps> = ({
  options,
  filterCategory,
  setFilterCategory,
  filterStatus,
  setFilterStatus,
}) => {
  const statusMarks: SliderMarks = {
    0: "อยู่ในคิว",
    1: "กำลังเตรียมอาหาร",
    2: "พร้อมเสิร์ฟ",
    3: "เสร็จสิ้น",
  };
  const statusMarksTranslation: { [key: string]: string } = {
    0: "IN_QUEUE",
    1: "PREPARING",
    2: "READY_TO_SERVE",
    3: "DONE",
  };
  const reverseStatusMarksTranslation: { [key: string]: number } = {
    IN_QUEUE: 0,
    PREPARING: 1,
    READY_TO_SERVE: 2,
    DONE: 3,
  };
  const [clicked, setClicked] = useState(false);
  const [changeFilterCategory, setChangeFilterCategory] =
    useState<string[]>(filterCategory);
  const [changeFilterStatusSlider, setChangeFilterStatusSlider] = useState<
    [number, number]
  >([
    Math.min(
      ...filterStatus
        .filter((status) => status !== "CANCELLED")
        .map((status) => reverseStatusMarksTranslation[status] as number),
    ),
    Math.max(
      ...filterStatus
        .filter((status) => status !== "CANCELLED")
        .map((status) => reverseStatusMarksTranslation[status] as number),
    ),
  ]);
  console.log("changeFilterStatusSlider", changeFilterStatusSlider);
  const [changeFilterStatusCheckbox, setChangeFilterStatusCheckbox] =
    useState<boolean>(filterStatus.includes("CANCELLED"));

  const onChangeSlider = (value: [number, number]) => {
    setChangeFilterStatusSlider(value);
  };
  const onChangeCheckbox = (checked: boolean) => {
    setChangeFilterStatusCheckbox(checked);
  };
  const onSave = () => {
    setClicked(false);
    setFilterCategory(changeFilterCategory);
    const changeFilterStatusSliderTranslation: string[] = [];
    for (const [key, value] of Object.entries(statusMarksTranslation)) {
      if (
        changeFilterStatusSlider[0] <= parseInt(key) &&
        parseInt(key) <= changeFilterStatusSlider[1]
      ) {
        changeFilterStatusSliderTranslation.push(value);
      }
    }
    if (changeFilterStatusCheckbox) {
      setFilterStatus([...changeFilterStatusSliderTranslation, "CANCELLED"]);
    } else {
      setFilterStatus(changeFilterStatusSliderTranslation);
    }
  };
  const onCancel = () => {
    setClicked(false);
    setChangeFilterCategory(filterCategory);
    setChangeFilterStatusSlider([0, 3]);
    setChangeFilterStatusCheckbox(filterStatus.includes("CANCELLED"));
  };
  const onReset = () => {
    setChangeFilterCategory([]);
    setChangeFilterStatusSlider([
      Math.min(
        ...filterStatus
          .filter((status) => status !== "CANCELLED")
          .map((status) => reverseStatusMarksTranslation[status] as number),
      ),
      Math.max(
        ...filterStatus
          .filter((status) => status !== "CANCELLED")
          .map((status) => reverseStatusMarksTranslation[status] as number),
      ),
    ]);
    setChangeFilterStatusCheckbox(false);
  };
  const handleClickChange = (open: boolean) => {
    setClicked(open);
    setChangeFilterCategory(filterCategory);
    setChangeFilterStatusCheckbox(filterStatus.includes("CANCELLED"));
    setChangeFilterStatusSlider([
      Math.min(
        ...filterStatus
          .filter((status) => status !== "CANCELLED")
          .map((status) => reverseStatusMarksTranslation[status] as number),
      ),
      Math.max(
        ...filterStatus
          .filter((status) => status !== "CANCELLED")
          .map((status) => reverseStatusMarksTranslation[status] as number),
      ),
    ]);
    console.log("changefilterslider", changeFilterStatusSlider);
  };
  const onChangeCategory = (value: string[]) => {
    setChangeFilterCategory(value);
  };
  return (
    <StyledPopover
      placement="bottomRight"
      trigger="click"
      arrow={{ pointAtCenter: true }}
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
              value={changeFilterCategory}
              onChange={(value: string[]) => {
                onChangeCategory(value);
              }}
            />
          </StyledSelectSection>
          <StatusFilterDiv>
            <StyledSlider
              range
              marks={statusMarks}
              step={null}
              value={changeFilterStatusSlider}
              max={3}
              tooltip={{ formatter: null }}
              onChange={(value: [number, number]) => {
                onChangeSlider(value);
              }}
            />
            <StyledCheckbox
              defaultChecked={changeFilterStatusCheckbox}
              onChange={(checked) => onChangeCheckbox(checked.target.checked)}
            >
              {" "}
              ยกเลิก{" "}
            </StyledCheckbox>
          </StatusFilterDiv>

          <BottonGroup>
            <Button danger onClick={onReset}>
              ล้างการเลือกทั้งหมด
            </Button>
            <Button onClick={onCancel}>ยกเลิก</Button>
            <Button type="primary" onClick={onSave}>
              ตกลง
            </Button>
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

const StyledPopover = styled(Popover)`
  position: relative;
`;

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

const StyledContentContainer = styled.div`
  width: 100%;
`;

const StyledSlider = styled(Slider)`
  width: 80%;
  margin-right: 24px;
  margin-left: 24px;
  white-space: nowrap;
`;

const StatusFilterDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledCheckbox = styled(Checkbox)`
  flex-direction: column;
  padding-top: 12px;
`;
export default PopOverFilter;
