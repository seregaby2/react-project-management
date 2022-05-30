import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  BoardPage,
  HomePage,
  SignupPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
  LoginPage,
} from '../pages';
import { RequireAuth } from '../hoc/RequireAuth';
import { RedirectMain } from '../hoc/RedirectMain';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/main"
        element={
          <RequireAuth>
            <MainPage />
          </RequireAuth>
        }
      />
      <Route
        path="/board"
        element={
          <RequireAuth>
            <BoardPage />
          </RequireAuth>
        }
      />
      <Route
        path="/board/:boardId"
        element={
          <RequireAuth>
            <BoardPage />
          </RequireAuth>
        }
      />
      <Route
        path="/signup"
        element={
          <RedirectMain>
            <SignupPage />
          </RedirectMain>
        }
      />
      <Route
        path="/login"
        element={
          <RedirectMain>
            <LoginPage />
          </RedirectMain>
        }
      />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
