import { ReactNode, useEffect, useState } from "react";
import HeadElement from "../common/HeadElement";
import Header from "../common/Header";
import Footer from "../common/Footer";
import useAuthorization from "@/hooks/useAuthorization";
import { useRouter } from "next/router";

interface AdminWrapperProps {
  children: ReactNode;
  title: string;
}

const AdminWrapper = ({ children, title }: AdminWrapperProps) => {
  const { checkAuthorization } = useAuthorization();
  const [isAuthorized, setAuthorized] = useState<boolean | undefined>(
    undefined
  );

  const router = useRouter();

  useEffect(() => {
    const authorize = async () => {
      const isAuthorized = await checkAuthorization();
      setAuthorized(isAuthorized);
    };

    authorize();
  }, [checkAuthorization]);

  if (isAuthorized === false) {
    router.push("/admin/login");
    return null;
  }

  if (isAuthorized === true) {
    return (
      <>
        <HeadElement title="Kingdom Library - Admin" />
        <div id="container">
          <Header display="admin" />
          <main id="main">
            <h1>{title}</h1>
            <div id="content">{children}</div>
          </main>
          <Footer />
        </div>
      </>
    );
  }
  return null;
};

export default AdminWrapper;
