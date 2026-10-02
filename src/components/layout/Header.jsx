import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../navigation/Navbar';

/**
 * Structural Header Container
 * - Surrounds the floating rounded Navbar with the active page surface
 * - On HomePage, surrounds Navbar with #D9C6B3 (Hero surface) while preserving
 *   the Navbar's approved light surface inside the rounded frame.
 */
export const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className={`w-full ${isHome ? 'bg-[#D9C6B3]' : 'bg-[#F2EFEA]'}`}>
      <Navbar />
    </header>
  );
};

export default Header;
