import { Routes, Route } from 'react-router-dom';
import { Login } from '@/pages/auth/Login';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<></>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
