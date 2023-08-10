import AdminWrapper from "@/components/admin/AdminWrapper";
import ManageBookLists from "@/components/admin/ManageBookLists";
import ManageBooks from "@/components/admin/ManageBooks";
import Tabs from "@/components/admin/Tabs";
import { BooksBookListsTabs } from "@/interfaces/interfaces";
import { useState } from "react";

export default function Essays() {
  const [activeTab, setActiveTab] = useState("books");

  const handleTabClick = (tab: string) => setActiveTab(tab);

  const tabs = [
    {
      title: "Books",
      value: BooksBookListsTabs.BOOKS,
    },
    {
      title: "Book Lists",
      value: BooksBookListsTabs.BOOK_LISTS,
    },
  ];

  return (
    <AdminWrapper title="Manage Books & Book Lists">
      <Tabs tabs={tabs} activeTab={activeTab} setFunction={handleTabClick} />
      {activeTab === "books" ? <ManageBooks /> : <ManageBookLists />}
    </AdminWrapper>
  );
}
