import useAllUser from "@/modules/admin/setting/userManagement/hooks/useAllUser";
import useResetUserPassword from "@/modules/admin/setting/userManagement/hooks/useResetUserPassword";
import useUpdateUserRole from "@/modules/admin/setting/userManagement/hooks/useUpdateUserRole";
import { H5, Text } from "@/modules/common/components/Typography";
import { useUser } from "@/modules/common/hooks/useUserStore";
import {
  roleNumberToRole,
  type GetAllUsersResponse,
  type RoleNumber,
} from "@/modules/services/users";
import { SearchOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import {
  Button,
  Checkbox,
  Input,
  Popover,
  Radio,
  Space,
  Table,
  Tag,
  Typography,
  theme,
  type InputRef,
} from "antd";
import { type ColumnType } from "antd/es/table";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";

type TableRow = GetAllUsersResponse[number];

const roleNumbers: RoleNumber[] = [100, 50, 25, 1];

const roleNumberToThaiName = {
  100: "เจ้าของร้าน",
  50: "แคชเชียร์",
  25: "พนักงาน",
  1: "ลูกค้า",
};

const roleToTagColor = {
  100: "green",
  50: "gold",
  25: "geekblue",
  1: "",
};

const roleToTextColor = {
  100: "#52C41A",
  50: "#FAAD14",
  25: "#2F54EB",
  1: "#000000",
};

type UserListProps = {
  setIdUserToDelete: (id: string | null) => void;
};

const UserList: React.FC<UserListProps> = ({ setIdUserToDelete }) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const { data: allUsers } = useAllUser();
  const [dataSource, setDataSource] = useState<TableRow[]>([]);

  const [searchText, setSearchText] = useState("");
  const searchInput = useRef<InputRef>(null);

  const { data: user } = useUser();

  const [selectedRole, setSelectedRole] = useState<RoleNumber | null>(null);
  const { mutate: updateUserRole } = useUpdateUserRole();
  const [openEditRoleModalId, setOpenEditRoleModalId] = useState<string | null>(
    null,
  );

  const { mutate: resetUserPassword } = useResetUserPassword();
  const [openResetPasswordModalId, setOpenResetPasswordModalId] = useState<
    string | null
  >(null);

  useEffect(() => {
    allUsers?.sort((a, b) => {
      if (a.role !== b.role) return b.role - a.role;
      return a.username.localeCompare(b.username);
    });
    setDataSource(allUsers ?? []);
  }, [allUsers]);

  const onClickEditRole = (id: string) => {
    setOpenEditRoleModalId(null);
    if (selectedRole !== null) {
      updateUserRole({ id, role: roleNumberToRole[selectedRole] });
    }
  };

  const onClickResetPassword = (id: string) => {
    setOpenResetPasswordModalId(null);
    resetUserPassword(id);
  };

  const columns: ColumnType<TableRow>[] = [
    {
      key: "username",
      title: "ชื่อผู้ใช้",
      dataIndex: "username",
      width: "70%",
      sorter: (a: TableRow, b: TableRow) =>
        b.username.localeCompare(a.username),
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
            placeholder="ค้นหาชื่อผู้ใช้"
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
          record["username"]
            ?.toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()) || false
        );
      },
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text: string, record: TableRow) => (
        <UserNameContainer>
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? String(text) : ""}
          />
          {user?._id === record._id && (
            <UserNameTag color={colorPrimary}>บัญชีของคุณ</UserNameTag>
          )}
        </UserNameContainer>
      ),
    },
    {
      key: "role",
      title: "หน้าที่",
      dataIndex: "role",
      width: "10%",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <RoleFilterContainer onKeyDown={(e) => e.stopPropagation()}>
          <RoleFilterCheckBoxContainer>
            {roleNumbers.map((roleNumber) => (
              <Checkbox
                style={{ padding: "5px 12px" }}
                key={roleNumber}
                checked={selectedKeys.includes(roleNumber)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedKeys([...selectedKeys, roleNumber]);
                  } else {
                    setSelectedKeys(
                      selectedKeys.filter((role) => role !== roleNumber),
                    );
                  }
                }}
              >
                <Text style={{ color: roleToTextColor[roleNumber] }}>
                  {roleNumberToThaiName[roleNumber]}
                </Text>
              </Checkbox>
            ))}
          </RoleFilterCheckBoxContainer>
          <RoleFilterButtonContainer>
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
          </RoleFilterButtonContainer>
        </RoleFilterContainer>
      ),
      onFilter: (value, record) => {
        return record["role"] === value;
      },
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      sorter: (a: TableRow, b: TableRow) => b.role - a.role,
      render: (_: string, record: TableRow) => (
        <RoleTag color={roleToTagColor[record.role]}>
          {roleNumberToThaiName[record.role]}
        </RoleTag>
      ),
    },
    {
      key: "action",
      title: "ดำเนินการ",
      width: "20%",
      render: (_: string, record: TableRow) => {
        return (
          <ActionContainer>
            <Popover
              trigger="click"
              placement="bottomRight"
              open={openEditRoleModalId === record._id}
              onOpenChange={(open) => {
                if (!open) {
                  setOpenEditRoleModalId(null);
                  setSelectedRole(null);
                } else {
                  setOpenEditRoleModalId(record._id);
                  setSelectedRole(record.role);
                }
              }}
              content={
                <RoleEditContainer onKeyDown={(e) => e.stopPropagation()}>
                  <H5
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingBottom: "5px",
                    }}
                  >
                    ตัวเลือกหน้าที่
                  </H5>
                  <RoleEditCheckBoxContainer>
                    {roleNumbers.map((roleNumber) => (
                      <Radio
                        style={{ padding: "4px 0px" }}
                        key={roleNumber}
                        checked={selectedRole === roleNumber}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedRole(roleNumber);
                          } else {
                            setSelectedRole(null);
                          }
                        }}
                      >
                        <Text style={{ color: roleToTextColor[roleNumber] }}>
                          {roleNumberToThaiName[roleNumber]}
                        </Text>
                      </Radio>
                    ))}
                  </RoleEditCheckBoxContainer>
                  <RoleEditButtonContainer>
                    <Button
                      type="primary"
                      onClick={() => onClickEditRole(record._id)}
                      size="small"
                      style={{ alignSelf: "flex-end" }}
                    >
                      ตกลง
                    </Button>
                  </RoleEditButtonContainer>
                </RoleEditContainer>
              }
            >
              <Typography.Link
                key="editRole"
                disabled={user?._id === record._id}
              >
                แก้ไขหน้าที่
              </Typography.Link>
            </Popover>
            <Popover
              trigger="click"
              placement="topRight"
              open={openResetPasswordModalId === record._id}
              onOpenChange={(open) => {
                if (!open) {
                  setOpenResetPasswordModalId(null);
                } else {
                  setOpenResetPasswordModalId(record._id);
                }
              }}
              content={
                <ResetPasswordContainer>
                  <ResetPassworContentContainer>
                    <ResetPasswordIconWrapper>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_2681_21645)">
                          <path
                            d="M7 0.875C3.61758 0.875 0.875 3.61758 0.875 7C0.875 10.3824 3.61758 13.125 7 13.125C10.3824 13.125 13.125 10.3824 13.125 7C13.125 3.61758 10.3824 0.875 7 0.875ZM6.5625 4.04688C6.5625 3.98672 6.61172 3.9375 6.67188 3.9375H7.32812C7.38828 3.9375 7.4375 3.98672 7.4375 4.04688V7.76562C7.4375 7.82578 7.38828 7.875 7.32812 7.875H6.67188C6.61172 7.875 6.5625 7.82578 6.5625 7.76562V4.04688ZM7 10.0625C6.82827 10.059 6.66476 9.98831 6.54455 9.86562C6.42434 9.74294 6.35701 9.57801 6.35701 9.40625C6.35701 9.23449 6.42434 9.06956 6.54455 8.94688C6.66476 8.82419 6.82827 8.75351 7 8.75C7.17173 8.75351 7.33524 8.82419 7.45545 8.94688C7.57566 9.06956 7.64299 9.23449 7.64299 9.40625C7.64299 9.57801 7.57566 9.74294 7.45545 9.86562C7.33524 9.98831 7.17173 10.059 7 10.0625Z"
                            fill="#FAAD14"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2681_21645">
                            <rect width="14" height="14" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </ResetPasswordIconWrapper>
                    <ResetPasswordTextContainer>
                      <H5>คุณต้องการจะรีเซ็ตรหัสผ่านบัญชีนี้หรือไม่</H5>
                      <Text type="secondary">
                        รหัสที่ถูกรีเซ็ตเป็นไปตามที่ MeeOrder กำหนด
                      </Text>
                    </ResetPasswordTextContainer>
                  </ResetPassworContentContainer>
                  <ResetPasswordButtonContainer>
                    <Button onClick={() => setOpenResetPasswordModalId(null)}>
                      ไม่
                    </Button>
                    <Button
                      onClick={() => onClickResetPassword(record._id)}
                      type="primary"
                    >
                      ใช่
                    </Button>
                  </ResetPasswordButtonContainer>
                </ResetPasswordContainer>
              }
            >
              <Typography.Link
                key="resetPassword"
                disabled={user?._id === record._id}
              >
                รีเซ็ตรหัสผ่าน
              </Typography.Link>
            </Popover>
            <Typography.Link
              key="delete"
              disabled={user?._id === record._id}
              onClick={() => setIdUserToDelete(record._id)}
            >
              ลบ
            </Typography.Link>
          </ActionContainer>
        );
      },
    },
  ] as ColumnType<TableRow>[];

  return (
    <UserListContainer>
      <Table
        pagination={false}
        scroll={{ y: "76vh" }}
        rowKey={"_id"}
        columns={columns}
        dataSource={dataSource}
      />
    </UserListContainer>
  );
};

export default UserList;

const UserListContainer = styled.div`
  .ant-table-body {
    overflow-y: auto !important;
  }
`;

const UserNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserNameTag = styled(Tag)`
  border-radius: 100px;
`;

const RoleFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoleFilterCheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-block: 4px;
`;

const RoleFilterButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 8px 8px 3px;
`;

const RoleTag = styled(Tag)`
  padding: 0 8px;
`;

const ActionContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const RoleEditContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoleEditCheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-block: 6px;
  border-block: 1px solid #d9d9d9;
`;

const RoleEditButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
`;

const ResetPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ResetPassworContentContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const ResetPasswordIconWrapper = styled.div`
  display: flex;
  padding-top: 4px;
`;

const ResetPasswordTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResetPasswordButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;
