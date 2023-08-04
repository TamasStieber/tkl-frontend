import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface AdminWrapperProps {
  children: ReactNode;
  title: string;
}

const AdminWrapper = ({ children, title }: AdminWrapperProps) => {
  return (
    <div id="container">
      <Header display="admin" />
      <main>
        <h1>{title}</h1>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AdminWrapper;
