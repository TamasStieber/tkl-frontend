import AdminWrapper from "@/components/admin/AdminWrapper";
import ManageBooks from "@/components/admin/ManageBooks";

export default function Essays() {
  return (
    <AdminWrapper title="Manage Books & Book Lists">
      <ManageBooks />
    </AdminWrapper>
  );
}
