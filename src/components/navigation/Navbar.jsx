import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { ROUTES } from '../../utils/constants';
import {
  AnimatedSearchIcon,
  AnimatedHeartIcon,
  AnimatedBagIcon,
  AnimatedMenuIcon,
} from '../common/AnimatedIcons';
import MobileNav from './MobileNav';

/**
 * YK MENS FASHION - Floating Rounded Frame Navigation Bar
 * 
 * Strict Art Direction:
 * - Rounded rectangular frame (22px desktop, 16px mobile) — NOT a pill, NOT capsule.
 * - Floating position with outer breathing room from viewport edges.
 * - Solid warm ivory/sand surface (#F2EFEA) — NO glassmorphism, NO frosted blur.
 * - Refined 1px border (#E2D7CB) with very subtle depth shadow.
 * - Normal text navigation links — NO pill-shaped link backgrounds.
 * - Smooth hover accent underline animation (200-300ms).
 * - Compact, balanced mobile layout with responsive micro-touch feedback.
 */
export const Navbar = () => {
  const location = useLocation();
  const { cartCount, openDrawer } = useCart();
  const { wishlistCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: ROUTES.HOME },
    { name: 'SHOP', path: ROUTES.SHOP },
    { name: 'NEW ARRIVALS', path: ROUTES.NEW_ARRIVALS },
    { name: 'COLLECTIONS', path: ROUTES.COLLECTIONS },
    { name: 'ABOUT', path: ROUTES.ABOUT },
    { name: 'CONTACT', path: ROUTES.CONTACT },
  ];

  return (
    <>
      {/* Outer Floating Wrapper providing breathing room from viewport edges */}
      <header className="sticky top-0 z-40 w-full pointer-events-none pt-2.5 sm:pt-3.5 lg:pt-4 px-2.5 sm:px-6 lg:px-8">
        {/* Floating Rounded Rectangular Frame */}
        <div
          className={`pointer-events-auto max-w-7xl mx-auto w-full bg-[#FAF7F2] border border-[#E4D7CC] rounded-2xl lg:rounded-[22px] shadow-[0_8px_30px_rgba(74,58,50,0.08)] transition-all duration-300 ease-out ${
            isScrolled
              ? 'py-2.5 lg:py-3 px-3.5 sm:px-6 lg:px-8 border-[#D8C8BA] bg-[#FFFFFF] shadow-[0_12px_36px_rgba(74,58,50,0.12)]'
              : 'py-3 sm:py-3.5 lg:py-4 px-3.5 sm:px-6 lg:px-8'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Mobile Menu Icon Trigger */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="p-2 -ml-1 text-[#4A3A32] hover:text-[#33251F] active:scale-90 transition-transform duration-150 rounded-lg"
              >
                <AnimatedMenuIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Branded Identity: Authentic Contemporary Men's Fashion Wordmark */}
            <div className="flex items-center select-none">
              <Link
                to={ROUTES.HOME}
                className="group inline-flex items-baseline space-x-2 sm:space-x-2.5 lg:space-x-3 transition-opacity duration-200 hover:opacity-90 active:scale-[0.98]"
              >
                {/* Visual Anchor: Monumental Roman Chisel Wordmark */}
                <span className="font-brand font-bold text-[22px] sm:text-[25px] lg:text-[27px] tracking-[0.03em] leading-none text-[#33251F] group-hover:text-[#4A3A32] transition-colors">
                  YK
                </span>

                {/* Connected Descriptor: Clean Modern Sans Baseline Partner */}
                <span className="font-sans text-[9px] sm:text-[10px] lg:text-[10.5px] uppercase tracking-[0.22em] font-semibold text-[#6B5549] group-hover:text-[#33251F] transition-colors leading-none whitespace-nowrap">
                  MENS FASHION
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links — Clean text links, NO pills */}
            <nav
              className="hidden lg:flex items-center space-x-1 xl:space-x-2"
              onMouseLeave={() => setHoveredPath(null)}
            >
              {navLinks.map((link) => {
                const isActive =
                  link.path === ROUTES.HOME
                    ? location.pathname === ROUTES.HOME
                    : location.pathname.startsWith(link.path.split('?')[0]);

                return (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onMouseEnter={() => setHoveredPath(link.path)}
                    className={`relative px-3 py-1.5 text-[13px] tracking-wide font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-[#33251F] font-bold'
                        : 'text-[#6B5549] hover:text-[#33251F]'
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>

                    {/* Refined Animated Accent Underline (200-300ms) */}
                    {hoveredPath === link.path && (
                      <motion.div
                        layoutId="navHoverUnderline"
                        className="absolute bottom-0 left-2.5 right-2.5 h-[1.5px] bg-[#4A3A32] rounded-full"
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                    {isActive && hoveredPath === null && (
                      <div className="absolute bottom-0 left-2.5 right-2.5 h-[1.5px] bg-[#33251F] rounded-full" />
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Utility Actions (Search, Wishlist, Bag) with Micro-touch Feedback */}
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-2.5">
              {/* Search */}
              <Link
                to={ROUTES.SEARCH}
                aria-label="Search menswear catalog"
                className="p-2 sm:p-2.5 text-[#4A3A32] hover:text-[#33251F] active:scale-90 transition-transform duration-150 rounded-lg"
              >
                <AnimatedSearchIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>

              {/* Wishlist */}
              <Link
                to={ROUTES.WISHLIST}
                aria-label="View Wishlist"
                className="p-2 sm:p-2.5 text-[#4A3A32] hover:text-[#33251F] active:scale-90 transition-transform duration-150 rounded-lg relative"
              >
                <AnimatedHeartIcon
                  isFavorited={wishlistCount > 0}
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 bg-[#4A3A32] text-[#FAF7F2] text-[9px] sm:text-[10px] w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Drawer Trigger */}
              <button
                type="button"
                onClick={openDrawer}
                aria-label="Open Shopping Bag"
                className="p-2 sm:p-2.5 text-[#4A3A32] hover:text-[#33251F] active:scale-90 transition-transform duration-150 rounded-lg relative"
              >
                <AnimatedBagIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 bg-[#4A3A32] text-[#FAF7F2] text-[9px] sm:text-[10px] w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <MobileNav
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          links={navLinks}
        />
      </header>
    </>
  );
};

export default Navbar;
