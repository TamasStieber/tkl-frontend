import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface PublicWrapperProps {
  children: ReactNode;
  title: string;
}

const PublicWrapper = ({ children, title }: PublicWrapperProps) => {
  return (
    <div id="container">
      <Header display="public" />
      <main>
        <h1>{title}</h1>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicWrapper;
