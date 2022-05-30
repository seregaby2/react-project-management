import React from 'react';
import { Navigate } from 'react-router-dom';

export interface LayoutProps {
  children: JSX.Element;
}

export const RedirectMain = (props: LayoutProps): JSX.Element => {
  const isAuth = localStorage.getItem('checkAuthUser');

  if (isAuth) {
    return <Navigate to="/main" />;
  }
  return props.children;
};
