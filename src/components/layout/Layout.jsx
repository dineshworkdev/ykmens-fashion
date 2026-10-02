import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from '../cart/CartDrawer';

/**
 * Root Layout Shell
 * Assembles Header, Content Outlet, Cart Drawer, and Footer.
 */
export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F2EFEA] text-[#0D0D0D]">
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Layout;
