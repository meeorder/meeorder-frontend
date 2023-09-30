import AppLayout from "@/modules/AppLayout";
import BillSection from "@/modules/admin/table/BillSection";
import TableSection from "@/modules/admin/table/TableSection";
import { ConfigProvider, Divider } from "antd";

const TableManagement = () => {
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
        <AppLayout layoutType="admin" currentPageId="employeeStock">
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
