import AddOnFormSection from "@/modules/admin/menu/AddOnFormSection";
import MenuFormSection from "@/modules/admin/menu/MenuFormSection";

export type MenuLayoutVariant = "preview" | "add" | "edit";

type AdminMenuLayoutProps = {
  menuLayoutVariant: MenuLayoutVariant;
};

const AdminMenuLayout: React.FC<AdminMenuLayoutProps> = ({
  menuLayoutVariant,
}) => {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        gap: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          flex: 1,
        }}
      >
        <MenuFormSection menuLayoutVariant={menuLayoutVariant} />
        <AddOnFormSection menuLayoutVariant={menuLayoutVariant} />
      </div>
    </div>
  );
};

export default AdminMenuLayout;
