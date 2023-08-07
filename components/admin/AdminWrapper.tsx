import { ReactNode } from 'react';
import HeadElement from '../common/HeadElement';
import Header from '../common/Header';
import Footer from '../common/Footer';

interface AdminWrapperProps {
  children: ReactNode;
  title: string;
}

const AdminWrapper = ({ children, title }: AdminWrapperProps) => {
  return (
    <>
      <HeadElement title='Kingdom Library - Admin' />
      <div id='container'>
        <Header display='admin' />
        <main id='main'>
          <h1>{title}</h1>
          <div id='content'>{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
  // return (
  //   <div id="container">
  //     <Header display="admin" />
  //     <main>
  //       <h1>{title}</h1>
  //       {children}
  //     </main>
  //     <Footer />
  //   </div>
  // );
};

export default AdminWrapper;
