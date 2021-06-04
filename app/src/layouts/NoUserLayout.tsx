import React, { FC } from "react";
import { Suspense } from "react";
import Button from "../components/Button";
import PageLoadFallback from "../components/PageLoadFallback";

const NoUserLayout: FC = ({ children }) => {
  return (
    <>
      <header>
      
      
      </header>
      <main>
        <Suspense fallback={<PageLoadFallback />}>
          {children}
        </Suspense>
      </main>
      <footer>
      
      </footer>
    </>
  );
};

export default NoUserLayout;
