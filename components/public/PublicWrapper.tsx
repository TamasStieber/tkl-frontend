import { ReactNode } from 'react';
import HeadElement from '../common/HeadElement';
import Header from '../common/Header';
import Footer from '../common/Footer';

interface PublicWrapperProps {
  children: ReactNode;
  title: string;
}

const PublicWrapper = ({ children, title }: PublicWrapperProps) => {
  return (
    <>
      <HeadElement title='Kingdom Library' />
      <div id='container'>
        <Header display='public' />
        <main id='main'>
          <h1>{title}</h1>
          <hr />
          <div id='content'>{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PublicWrapper;
