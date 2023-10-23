import AppLayout from "@/modules/AppLayout";
import BillSection from "@/modules/admin/table/BillSection";
import TableSection from "@/modules/admin/table/TableSection";
import { useClient } from "@/modules/common/hooks/useClient";
import { ConfigProvider, Divider } from "antd";

const TableManagement = () => {
  const { isClientLoaded } = useClient();
  if (!isClientLoaded) return null;
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              colorBgBody: "#FFFFFF",
            },
          },
        }}
      >
        <AppLayout layoutType="admin" currentPageId="cashierTableManagement">
          <div style={{ height: "100%", display: "flex" }}>
            <TableSection />
            <Divider type="vertical" style={{ height: "100%" }} />
            <BillSection />
          </div>
        </AppLayout>
      </ConfigProvider>
    </>
  );
};

export default TableManagement;
