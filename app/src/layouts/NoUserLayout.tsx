import React, { FC } from "react";

const NoUserLayout: FC = ({ children }) => {
  return (
    <>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
};

export default NoUserLayout;
