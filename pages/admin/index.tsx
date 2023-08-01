import AdminWrapper from "@/components/admin/AdminWrapper";
import ManageEssays from "@/components/admin/ManageEssays";
import Posts from "@/components/Posts";

export default function Home() {
  return (
    <AdminWrapper title="Manage Essays">
      <ManageEssays />
    </AdminWrapper>
  )
}
