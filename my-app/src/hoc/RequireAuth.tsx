import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchGetUsers } from '../api/actionGetUsers';
import { useAppDispatch } from '../hooks/redux';

export interface LayoutProps {
  children: JSX.Element;
}

export const RequireAuth = (props: LayoutProps): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchGetUsers());
  }, []);
  const isAuth = localStorage.getItem('checkAuthUser');

  if (!isAuth) {
    return <Navigate to="/" />;
  }
  return props.children;
};
