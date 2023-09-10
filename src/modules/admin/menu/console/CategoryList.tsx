import CategoryRow from "@/modules/admin/menu/console/CategoryRow";
import { Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Popconfirm, Table, Typography } from "antd";
import { type ColumnsType } from "antd/es/table";
import { useId, useState } from "react";

import { useEffect } from "react";

import useAllCategory from "@/modules/admin/menu/hooks/useCategory";
import useDeleteCategory from "@/modules/admin/menu/hooks/useDeleteCategory";
import useUpdateCategory from "@/modules/admin/menu/hooks/useUpdateCategory";
import useUpdateCategoryOrder from "@/modules/admin/menu/hooks/useUpdateCategoryOrder";
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type CategoryColumns = {
  _id: string;
  title: string;
  numberOfMenus: number;
  action: string;
};

const CategoryList = () => {
  const { data: allCategory } = useAllCategory();
  const [dataSource, setDataSource] = useState<CategoryColumns[]>([]);

  useEffect(() => {
    setDataSource(
      allCategory?.map((category) => ({
        _id: category._id,
        title: category.title,
        numberOfMenus: category.menus.length,
        action: "ลบ",
      })) ?? [],
    );
  }, [allCategory]);

  const { mutate: updateCategory } = useUpdateCategory();
  const onChange = (value: string, _id: string) => {
    console.log(value, _id);
    updateCategory({ id: _id, title: value });
  };
  const { mutate: deleteCategory } = useDeleteCategory();
  const onDeleteConfirm = (_id: string) => {
    deleteCategory({ id: _id });
  };

  const columns: ColumnsType<CategoryColumns> = [
    {
      key: "sort",
      width: "40px",
    },
    {
      title: "ชื่อหมวดหมู่",
      dataIndex: "title",
      width: "200px",
      render: (title: string, record) => {
        return (
          <Text editable={{ onChange: (value) => onChange(value, record._id) }}>
            {title}
          </Text>
        );
      },
    },
    {
      title: "จำนวนเมนูทั้งหมด",
      dataIndex: "numberOfMenus",
      width: "100px",
      align: "end",
    },
    {
      title: "ดำเนินการ",
      dataIndex: "action",
      width: "112px",
      align: "end",
      render: (action: string, record) => {
        return (
          <StyledDiv>
            <Popconfirm
              title="ลบหมวดหมู่"
              description="คุณยืนยันที่จะลบหมวดหมู่นี้หรือไม่?"
              okText="ยืนยัน"
              onConfirm={() => {
                onDeleteConfirm(record._id);
              }}
              cancelText="ยกเลิก"
            >
              <Typography.Link key={action}>{action}</Typography.Link>
            </Popconfirm>
          </StyledDiv>
        );
      },
    },
  ];

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));
  const dndId = useId();

  const { mutate: updateCategoryOrder } = useUpdateCategoryOrder();
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeCategoryList = dataSource.find(
      (category) => category._id === active.id,
    );
    const overCategoryList = dataSource.find(
      (category) => category._id === over.id,
    );

    if (!activeCategoryList || !overCategoryList) {
      return;
    }

    const activeIndex = dataSource.indexOf(activeCategoryList);
    const overIndex = dataSource.indexOf(overCategoryList);

    if (activeIndex !== overIndex) {
      updateCategoryOrder({
        rank: arrayMove(dataSource, activeIndex, overIndex).map((i) => i._id),
      });
      setDataSource((prev) => arrayMove(prev, activeIndex, overIndex));
    }
  };

  return (
    <DndContext
      key={dndId}
      id={dndId}
      modifiers={[restrictToVerticalAxis]}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        // rowKey array
        items={dataSource.map((i) => i._id)}
        strategy={verticalListSortingStrategy}
      >
        <ScrollAuto>
          <Table
            pagination={false}
            scroll={{ y: "76vh" }}
            style={{ width: "99%" }}
            components={{
              body: {
                row: CategoryRow,
              },
            }}
            rowKey={"_id"}
            dataSource={dataSource}
            columns={columns}
          />
        </ScrollAuto>
      </SortableContext>
    </DndContext>
  );
};
export default CategoryList;

const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

const ScrollAuto = styled.div`
  .ant-table-body {
    overflow-y: auto !important;
  }
`;
