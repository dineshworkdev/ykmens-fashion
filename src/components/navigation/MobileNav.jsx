import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Heart, ArrowRight } from '../../assets/icons';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { ROUTES } from '../../utils/constants';

/**
 * YK MENS FASHION - Floating Rounded Mobile Navigation Drawer
 * 
 * Strict Art Direction:
 * - Extension of the floating rounded Navbar with matching 20-22px rounded frame.
 * - Generous spacing with strong typography hierarchy.
 * - NO numbered menu items (strictly HOME, SHOP, etc. — NO 01, 02).
 * - NO card boxes around individual links — clean, uncluttered typographic list.
 * - Subtle active page indicator.
 * - Smooth staggered entrance animation.
 * - Responsive micro-touch feedback (150ms).
 */
export const MobileNav = ({ isOpen, onClose, links = [] }) => {
  const { cartCount, openDrawer } = useCart();
  const { wishlistCount } = useWishlist();

  const handleOpenBag = () => {
    onClose();
    openDrawer();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* Backdrop with subtle dimming */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 bg-[#0D0D0D]/40 backdrop-blur-xs pointer-events-auto"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Floating Rounded Drawer Frame */}
          <motion.div
            initial={{ x: '-105%' }}
            animate={{ x: '0%' }}
            exit={{ x: '-105%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="relative pointer-events-auto m-2.5 sm:m-4 w-[calc(100%-1.25rem)] sm:w-[calc(100%-2rem)] max-w-sm bg-[#F2EFEA] border border-[#E2D7CB] rounded-[22px] shadow-2xl h-[calc(100%-1.25rem)] sm:h-[calc(100%-2rem)] flex flex-col p-6 z-10 overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-5 border-b border-[#E7DECD]">
              <Link to={ROUTES.HOME} onClick={onClose} className="group flex items-baseline space-x-1.5">
                <span className="font-serif font-bold text-2xl tracking-wider text-[#0D0D0D]">
                  YK
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#557373]">
                  MENS FASHION
                </span>
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation"
                className="w-9 h-9 rounded-full bg-[#E7DECD]/50 hover:bg-[#E7DECD] active:scale-90 flex items-center justify-center text-[#0D0D0D] transition-all duration-150"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Shopping Bar (Wishlist & Bag) */}
            <div className="py-4 border-b border-[#E7DECD] grid grid-cols-2 gap-2.5">
              <Link
                to={ROUTES.WISHLIST}
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-[#E7DECD] bg-[#EDE7C7]/30 text-xs font-semibold text-[#0D0D0D] hover:bg-[#EDE7C7]/60 active:scale-95 transition-all duration-150"
              >
                <div className="flex items-center space-x-2">
                  <Heart className="w-3.5 h-3.5 text-[#8B0000]" />
                  <span>Wishlist</span>
                </div>
                {wishlistCount > 0 && (
                  <span className="bg-[#8B0000] text-[#EDE7C7] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={handleOpenBag}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-[#E7DECD] bg-[#EDE7C7]/30 text-xs font-semibold text-[#0D0D0D] hover:bg-[#EDE7C7]/60 active:scale-95 transition-all duration-150 text-left"
              >
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#142F40]" />
                  <span>Bag</span>
                </div>
                {cartCount > 0 && (
                  <span className="bg-[#0D0D0D] text-[#F2EFEA] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Nav Route Items — Clean Typographic List (NO NUMBERS, NO BOX CARDS) */}
            <nav className="flex flex-col py-6 space-y-1">
              {links.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * idx, duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group flex items-center justify-between py-3 px-2 text-[15px] uppercase tracking-wider transition-colors duration-150 ${
                        isActive
                          ? 'text-[#0D0D0D] font-bold'
                          : 'text-[#200E01]/75 hover:text-[#0D0D0D]'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="relative">
                          {link.name}
                          {isActive && (
                            <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#8B0000] rounded-full" />
                          )}
                        </span>
                        <ArrowRight
                          className={`w-3.5 h-3.5 transition-all duration-150 ${
                            isActive
                              ? 'text-[#8B0000] opacity-100 translate-x-0.5'
                              : 'opacity-35 group-hover:opacity-75 group-hover:translate-x-0.5'
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Bottom Brand Statement without fake claims */}
            <div className="mt-auto pt-5 border-t border-[#E7DECD] text-xs text-[#557373] space-y-1">
              <p className="font-bold text-[#0D0D0D] uppercase tracking-wider text-[11px]">
                YK MENS FASHION
              </p>
              <p className="text-[11px] text-[#557373]">
                Contemporary Menswear & Modern Tailoring
              </p>
              <p className="text-[10px] text-[#557373]/70 pt-1">
                © {new Date().getFullYear()} YK MENS FASHION. All rights reserved.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
