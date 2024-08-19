import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import { OrderList } from './components/orderList';
export const  AppRouter = ()=> {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/order-list" element={<OrderList />} />
      </Routes>
    </Router>
  );
}
