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
 * YK MENS FASHION - Refined Brand Navigation Header
 * 
 * Strict Compliance:
 * - NO top announcement ticker bar (starts cleanly with branded navigation).
 * - Light surface palette (#F2EFEA / #FFFFFF translucent blur), never turns dark on scroll.
 * - Confident, distinct, readable typography (not tiny, not overly spaced, not generic).
 * - Intentional mobile header layout with balanced brand presence and touch-friendly actions.
 * - Integrated animated icons and micro-interactions.
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
      setIsScrolled(window.scrollY > 30);
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
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ease-out border-b ${
          isScrolled
            ? 'bg-[#F8F6F1]/95 text-[#0D0D0D] border-[#E5DFD3] shadow-sm backdrop-blur-md'
            : 'bg-[#FAF8F5] text-[#0D0D0D] border-[#E8E2D8]'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-16' : 'h-20 lg:h-22'
          }`}
        >
          {/* Mobile Menu Icon Trigger */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="p-2.5 rounded-lg text-[#0D0D0D] hover:text-[#8B0000] hover:bg-[#E7DECD]/50 transition-colors"
            >
              <AnimatedMenuIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Branded Identity: Confident, Distinctive, Not Oversized */}
          <div className="flex items-center select-none">
            <Link to={ROUTES.HOME} className="group flex items-baseline space-x-2">
              <span className="font-serif font-bold text-2xl sm:text-3xl tracking-wider text-[#0D0D0D] group-hover:text-[#8B0000] transition-colors">
                YK
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#557373] group-hover:text-[#200E01] transition-colors">
                MENS FASHION
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links — Distinct, Readable, Branded */}
          <nav
            className="hidden lg:flex items-center space-x-1"
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
                  className={`relative px-3.5 py-2 text-[13px] tracking-wide font-medium transition-colors duration-200 rounded-md ${
                    isActive
                      ? 'text-[#0D0D0D] font-semibold'
                      : 'text-[#200E01]/75 hover:text-[#0D0D0D]'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>

                  {/* Refined Active / Hover Underline Indicator */}
                  {hoveredPath === link.path && (
                    <motion.div
                      layoutId="navHoverUnderline"
                      className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#8B0000] rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  {isActive && hoveredPath === null && (
                    <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#0D0D0D] rounded-full" />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Utility Actions (Search, Wishlist, Bag) */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Search */}
            <Link
              to={ROUTES.SEARCH}
              aria-label="Search menswear catalog"
              className="p-2.5 rounded-lg text-[#0D0D0D] hover:text-[#8B0000] hover:bg-[#E7DECD]/50 transition-colors"
            >
              <AnimatedSearchIcon className="w-5 h-5" />
            </Link>

            {/* Wishlist */}
            <Link
              to={ROUTES.WISHLIST}
              aria-label="View Wishlist"
              className="p-2.5 rounded-lg text-[#0D0D0D] hover:text-[#8B0000] hover:bg-[#E7DECD]/50 transition-colors relative"
            >
              <AnimatedHeartIcon
                isFavorited={wishlistCount > 0}
                className="w-5 h-5"
              />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-[#8B0000] text-[#EDE7C7] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag Drawer Trigger */}
            <button
              type="button"
              onClick={openDrawer}
              aria-label="Open Shopping Bag"
              className="p-2.5 rounded-lg text-[#0D0D0D] hover:text-[#8B0000] hover:bg-[#E7DECD]/50 transition-colors relative"
            >
              <AnimatedBagIcon className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-[#200E01] text-[#F2EFEA] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
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
