import CategoryRow from "@/modules/admin/menu/console/CategoryRow";
import { Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Popconfirm, Table, Typography } from "antd";
import { type ColumnsType } from "antd/es/table";
import { useState } from "react";

import { categories } from "@/modules/admin/mock/categories";

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
  const [dataSource, setDataSource] = useState(
    categories.map((category) => ({
      _id: category._id,
      title: category.title,
      numberOfMenus: category.menus.length,
      action: "delete",
    })),
  );

  const onChange = (value: string, _id: string) => {
    setDataSource((prev) => [
      ...prev.map((category) =>
        category._id === _id ? { ...category, title: value } : category,
      ),
    ]);
  };

  const onConfirm = (_id: string) => {
    setDataSource((prev) => [
      ...prev.filter((category) => category._id !== _id),
    ]); // TODO: update to api
  };

  const columns: ColumnsType<CategoryColumns> = [
    {
      key: "sort",
    },
    {
      title: "Category Name",
      dataIndex: "title",
      render: (title: string, record) => {
        return (
          <Text editable={{ onChange: (value) => onChange(value, record._id) }}>
            {title}
          </Text>
        );
      },
    },
    {
      title: "Number of Menus",
      dataIndex: "numberOfMenus",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action: string, record) => {
        return (
          <StyledDiv>
            <Popconfirm
              title="Delete the category"
              description="Are you sure to delete this category?"
              okText="Yes"
              onConfirm={() => {
                onConfirm(record._id);
              }}
              cancelText="No"
            >
              <Typography.Link key={action}>{action}</Typography.Link>
            </Popconfirm>
          </StyledDiv>
        );
      },
    },
  ];

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

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
      setDataSource((prev) => arrayMove(prev, activeIndex, overIndex));
    }
  };

  return (
    <DndContext
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
        <Table
          components={{
            body: {
              row: CategoryRow,
            },
          }}
          rowKey={"_id"}
          dataSource={dataSource}
          columns={columns}
        />
      </SortableContext>
    </DndContext>
  );
};
export default CategoryList;

const StyledDiv = styled.div`
  display: flex;
  gap: 16px;
`;
