"use client";

import React, {PropsWithChildren, Suspense} from 'react';

interface LayoutProps {
}

const Layout = ({children}: PropsWithChildren<LayoutProps>) => {
  return (
    <Suspense>
      {children}
    </Suspense>
  );
};

export default Layout;