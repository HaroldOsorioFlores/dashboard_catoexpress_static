import React from "react";

import { Footer, Nav } from ".";

export const Layout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
};
