import React, { FC, useEffect, useState } from "react";
import { Suspense } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import PageLoadFallback from "../../components/PageLoadFallback";
import { ROUTES } from "../../routes";
import { useWindowSize } from "../../hooks/useWindowSize";
import clsx from "clsx";
import { useStyles } from "./styles";
import { BREAKPOINTS } from "../../shared/constants";

interface Props {
  disableMenu?: boolean;
}

const BasicLayout: FC<Props> = ({ children, disableMenu }) => {
  const classes = useStyles();
  const [mobileLayout, setMobileLayout] = useState<boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [clientW, clientH] = useWindowSize();

  useEffect(() => {
    const isMobile = clientW <= BREAKPOINTS.M;
    setMobileLayout(isMobile);
    if (!isMobile) {
      setShowMobileMenu(false);
    }
  }, [clientW]);

  const handleCloseMenu = () => {
    setShowMobileMenu(false);
  };

  const menuButton = (
    <svg
      className={clsx(classes.menuButton)}
      role="button"
      onClick={() => setShowMobileMenu(!showMobileMenu)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path
        fill="currentColor"
        d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
      />
    </svg>
  );

  const headerMenu = (
    <nav role="navigation">
      <Link to={ROUTES.GROUPS}>Your Collections</Link>
      <Link to={ROUTES.PROFILE}>Profile</Link>
    </nav>
  );

  const mobileMenu = (
    <>
      <div className={clsx(classes.mobileMenu, { [classes.menuOpen]: showMobileMenu })}>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias animi autem culpa excepturi, in
          incidunt minima nemo numquam quas, quibusdam quis sunt voluptate. Asperiores esse expedita officia
          perspiciatis tempora.
        </div>
        <div>
          Accusamus hic iure, quibusdam ratione reiciendis tempore? Accusantium asperiores autem cumque cupiditate
          distinctio doloremque dolorum eos et ex fugiat, ipsum laboriosam quae, quaerat quam quisquam repellendus sequi
          sunt temporibus voluptate!
        </div>
        <div>
          Amet atque beatae, cupiditate dignissimos eaque eos ex, fuga fugit id ipsa ipsam iste nisi non optio
          praesentium quasi quibusdam quo ratione recusandae reiciendis sed sequi sint ullam vel voluptatum.
        </div>
        <div>
          Eum, quam, voluptatum. Consequatur dicta, dolorum eos esse, eum exercitationem nam nemo neque nihil nisi omnis
          quaerat quos sit totam voluptatibus. Autem distinctio, id illum magnam minima non quibusdam temporibus.
        </div>
        <div>
          Commodi consectetur consequatur deserunt eaque explicabo optio perferendis quisquam recusandae vel voluptatem.
          Accusamus asperiores est eum harum illum ipsa, laudantium magnam quam quibusdam recusandae sed sequi sunt
          ullam vitae voluptatem?
        </div>
      </div>
      {showMobileMenu && <div className={clsx(classes.clickAwayListener)} onClick={handleCloseMenu} />}
    </>
  );
  return (
    <>
      {!disableMenu && mobileLayout && mobileMenu}

      <header className="bg-gray-200 pb-2 pt-2 mb-3">
        <div className="container flex items-center justify-between mx-auto px-3">
          {!disableMenu && mobileLayout && menuButton}

          <Link to={ROUTES.INDEX}>NeedFlashcard</Link>
          {/*<Button variant={"contained"} color={"primary"} className={"ml-1"}>Get started</Button>*/}

          {!disableMenu && !mobileLayout && headerMenu}
        </div>
      </header>
      <main>
        <div className={"container mx-auto px-3"}>
          <Suspense fallback={<PageLoadFallback />}>{children}</Suspense>
        </div>
      </main>

      <footer></footer>
    </>
  );
};

export default BasicLayout;
