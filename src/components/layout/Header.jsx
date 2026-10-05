import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../navigation/Navbar';

/**
 * Structural Header Container
 * - Surrounds the floating rounded Navbar with the active page surface
 * - On HomePage, surrounds Navbar with #2C1E18 (Hero rich warm brown surface) while
 *   preserving the floating Navbar's dark-theme rounded frame and elevation.
 */
export const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="w-full bg-[#FAF7F2]">
      <Navbar />
    </header>
  );
};

export default Header;
