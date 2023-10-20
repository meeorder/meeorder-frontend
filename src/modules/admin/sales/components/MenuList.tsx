import useAllCategory from "@/modules/admin/menu/hooks/useCategory";
import { type salesReport } from "@/modules/admin/sales/hooks/useSalesReport";
import { Text } from "@/modules/common/components/Typography";
import { SearchOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Checkbox, Input, Space, Table, type InputRef } from "antd";
import { type ColumnType } from "antd/es/table";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";

type TableRow = salesReport[number];

type MenuListProps = {
  saleReportData?: TableRow[];
};

const MenuList: React.FC<MenuListProps> = ({ saleReportData }) => {
  const [dataSource, setDataSource] = useState<TableRow[]>([]);

  const [searchText, setSearchText] = useState("");
  const searchInput = useRef<InputRef>(null);

  const { data: categorys } = useAllCategory();

  useEffect(() => {
    console.log(saleReportData);
    saleReportData?.sort((a, b) => {
      if (a.menu_category === b.menu_category)
        return b.total_amount - a.total_amount;
      return b.menu_category.localeCompare(a.menu_category);
    });
    setDataSource(saleReportData ?? []);
  }, [saleReportData]);

  const columns: ColumnType<TableRow>[] = [
    {
      key: "menu_title",
      title: "ชื่อเมนู",
      dataIndex: "menu_title",
      width: "25%",
      sorter: (a: TableRow, b: TableRow) =>
        b.menu_title.localeCompare(a.menu_title),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        close,
      }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            placeholder="ค้นหาชื่อเมนู"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => {
              confirm();
              setSearchText(selectedKeys[0] as string);
            }}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => {
                confirm();
                setSearchText(selectedKeys[0] as string);
              }}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              ค้นหา
            </Button>
            <Button
              onClick={() => {
                clearFilters && clearFilters();
                setSearchText("");
              }}
              size="small"
              style={{ width: 90 }}
            >
              รีเซ็ต
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText(selectedKeys[0] as string);
              }}
            >
              พรีวิว
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              ปิด
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      onFilter: (value, record) => {
        return (
          record["menu_title"]
            ?.toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()) ?? false
        );
      },
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text: string, record: TableRow) => (
        <MenuNameContainer>
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? String(text) : ""}
          />
        </MenuNameContainer>
      ),
    },
    {
      key: "menu_category",
      title: "หมวดหมู่",
      dataIndex: "menu_category",
      width: "25%",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <CategoryFilterContainer onKeyDown={(e) => e.stopPropagation()}>
          <CategoryFilterCheckBoxContainer>
            {categorys?.map((category) => (
              <Checkbox
                style={{ padding: "5px 12px" }}
                key={category._id}
                checked={selectedKeys.includes(category._id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedKeys([...selectedKeys, category._id]);
                  } else {
                    setSelectedKeys(
                      selectedKeys.filter((_id) => _id !== category._id),
                    );
                  }
                }}
              >
                <Text>{category.title}</Text>
              </Checkbox>
            ))}
          </CategoryFilterCheckBoxContainer>
          <CategoryFilterButtonContainer>
            <Button
              onClick={() => {
                clearFilters && clearFilters();
              }}
              disabled={selectedKeys.length === 0}
              type="text"
              size="small"
            >
              รีเซ็ต
            </Button>
            <Button
              type="primary"
              onClick={() => {
                confirm();
              }}
              size="small"
            >
              ตกลง
            </Button>
          </CategoryFilterButtonContainer>
        </CategoryFilterContainer>
      ),
      onFilter: (value, record) => {
        return record["menu_category"] === value;
      },
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      sorter: (a: TableRow, b: TableRow) =>
        b.menu_category.localeCompare(a.menu_category),
      render: (_: string, record: TableRow) => (
        <Text>{record.menu_category ?? "Others"}</Text>
      ),
    },
    {
      key: "total_amount",
      title: "จำนวนที่ขายได้",
      dataIndex: "total_amount",
      width: "25%",
      sorter: (a: TableRow, b: TableRow) => b.total_amount - a.total_amount,
      render: (_: string, record: TableRow) => {
        return <Text>{record.total_amount}</Text>;
      },
    },
    {
      key: "total_price",
      title: "ยอดขาย",
      dataIndex: "total_price",
      width: "25%",
      sorter: (a: TableRow, b: TableRow) => b.total_price - a.total_price,
      render: (_: string, record: TableRow) => {
        return <Text>{record.total_price}</Text>;
      },
    },
  ];

  return (
    <MenuListContainer>
      <Table
        pagination={false}
        scroll={{ y: "76vh" }}
        rowKey={"_id"}
        columns={columns}
        dataSource={dataSource}
      />
    </MenuListContainer>
  );
};

export default MenuList;

const MenuListContainer = styled.div`
  .ant-table-body {
    overflow-y: auto !important;
  }
`;

const MenuNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CategoryFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryFilterCheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-block: 4px;
`;

const CategoryFilterButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 8px 8px 3px;
`;
