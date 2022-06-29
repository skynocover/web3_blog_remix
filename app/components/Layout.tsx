import React from 'react';
import Header from './Header';

const Layout = ({ children }: any) => {
  return (
    <div className="bg-gray-500">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
