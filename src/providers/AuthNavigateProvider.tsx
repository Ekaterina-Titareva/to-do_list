import React, { PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Cookies from "js-cookie";

import {
  AUTH,
  AUTH_PAGE,
  LOGIN,
  MAIN_PAGE,
  PASSWORD,
} from "../utilities/constants";

const AuthNavigateProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const userCookie = Cookies.get(AUTH);
  const userWithAuth = userCookie ? JSON.parse(userCookie) : null;

  useEffect(() => {
    const isAuthPage = pathname === AUTH_PAGE;

    if (
      userWithAuth &&
      userWithAuth.login === LOGIN &&
      userWithAuth.password === PASSWORD
    ) {
      if (isAuthPage) {
        navigate(MAIN_PAGE);
      }
    } else {
      if (!isAuthPage) {
        navigate(AUTH_PAGE);
      }
    }
  }, [pathname, userWithAuth, navigate]);

  return <>{children}</>;
};

export default AuthNavigateProvider;
