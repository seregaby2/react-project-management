import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

export interface LayoutProps {
  children: JSX.Element;
}

export const RequireAuth = (props: LayoutProps): JSX.Element => {
  //   const location = useLocation();
  const { isAuth } = useAppSelector((state) => state.reducerSingupRequest);

  if (!isAuth) {
    return <Navigate to="/" />;
  } else {
    return <Navigate to="/main" />;
  }
  return props.children;
};
