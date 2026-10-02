import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Heart, ArrowRight } from '../../assets/icons';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { ROUTES } from '../../utils/constants';

/**
 * YK MENS FASHION - Mobile Navigation Drawer
 * Designed bespoke for mobile with comfortable touch targets, readable typography,
 * rounded-r-3xl container, and direct access to Wishlist and Bag.
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
        <div className="fixed inset-0 z-50 lg:hidden flex" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#0D0D0D]/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer Body with rounded-r-3xl */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="relative w-4/5 max-w-sm bg-[#F2EFEA] border-r border-[#DFE5F3] rounded-r-3xl h-full flex flex-col p-6 shadow-2xl z-10 overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-6 border-b border-[#DFE5F3]">
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-[#0D0D0D] block">
                  YK
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#557373] font-semibold">
                  MENS FASHION
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation"
                className="w-10 h-10 rounded-full bg-[#DFE5F3]/60 hover:bg-[#DFE5F3] flex items-center justify-center text-[#0D0D0D] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Shopping Bar (Wishlist & Bag) */}
            <div className="py-4 border-b border-[#DFE5F3] grid grid-cols-2 gap-3">
              <Link
                to={ROUTES.WISHLIST}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-xl bg-[#E7DECD]/50 border border-[#DFE5F3] text-xs font-semibold text-[#0D0D0D] hover:bg-[#E7DECD] transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-[#8B0000]" />
                  <span>Wishlist</span>
                </div>
                {wishlistCount > 0 && (
                  <span className="bg-[#8B0000] text-[#F2EFEA] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={handleOpenBag}
                className="flex items-center justify-between p-3 rounded-xl bg-[#E7DECD]/50 border border-[#DFE5F3] text-xs font-semibold text-[#0D0D0D] hover:bg-[#E7DECD] transition-colors text-left"
              >
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-4 h-4 text-[#142F40]" />
                  <span>Bag</span>
                </div>
                {cartCount > 0 && (
                  <span className="bg-[#0D0D0D] text-[#F2EFEA] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Nav Route Items */}
            <nav className="flex flex-col space-y-1.5 py-6">
              {links.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * idx, duration: 0.2 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between text-sm uppercase tracking-wider font-semibold py-3.5 px-4 rounded-xl transition-all ${
                        isActive
                          ? 'bg-[#E7DECD] text-[#0D0D0D] font-bold shadow-sm'
                          : 'text-[#200E01]/80 hover:text-[#0D0D0D] hover:bg-[#E7DECD]/40'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Bottom Brand Statement without fake info */}
            <div className="mt-auto pt-6 border-t border-[#DFE5F3] text-xs text-[#557373] space-y-1">
              <p className="font-bold text-[#0D0D0D] uppercase tracking-wider">
                YK MENS FASHION
              </p>
              <p className="text-[11px] text-[#557373]">
                Contemporary Menswear & Modern Tailoring
              </p>
              <p className="text-[10px] text-[#557373]/70 pt-2">
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
