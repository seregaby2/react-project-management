import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BoardPage, HomePage, LoginPage, MainPage, NotFoundPage, ProfilePage } from '../pages';

// TODO Remove after changing!
import { FormAuthPage } from '../pages/formForLogIn/formLogin';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/board" element={<BoardPage />} />
      <Route path="/login" element={<FormAuthPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      {/*<Route path="/login" element={<LoginPage />} />*/}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
