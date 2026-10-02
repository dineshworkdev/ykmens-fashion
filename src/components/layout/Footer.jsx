import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { useCart } from '../../hooks/useCart';
import { ShoppingBag, Heart } from '../../assets/icons';

/**
 * YK MENS FASHION - Light-First Refined Brand Footer
 * 
 * Strict Compliance:
 * - Approved light palette (#E7DECD with #DFE5F3 borders).
 * - Genuine Indian men's fashion brand communication.
 * - Clean, useful navigation links to real existing routes only.
 * - No newsletter block (removed completely per final specification).
 * - High-contrast readable typography (#0D0D0D, #557373).
 */
export const Footer = () => {
  const { openDrawer } = useCart();

  return (
    <footer className="mt-auto bg-[#E7DECD] text-[#0D0D0D] border-t border-[#DFE5F3]">
      {/* Main Footer Links & Architecture on Warm Parchment #E7DECD */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link to={ROUTES.HOME} className="block group">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider uppercase text-[#0D0D0D] group-hover:text-[#8B0000] transition-colors">
                YK
              </span>
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#557373] font-semibold block mt-0.5">
                MENS FASHION
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[#557373] leading-relaxed max-w-sm">
              Contemporary menswear designed with structured tailoring, relaxed proportions, and enduring everyday comfort.
            </p>
          </div>

          {/* Navigation Column: Catalog */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-bold tracking-wider uppercase text-[#0D0D0D] block">
              Navigation
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#557373]">
              <li>
                <Link to={ROUTES.SHOP} className="hover:text-[#0D0D0D] transition-colors">
                  Shop All Menswear
                </Link>
              </li>
              <li>
                <Link to={ROUTES.NEW_ARRIVALS} className="hover:text-[#0D0D0D] transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to={ROUTES.COLLECTIONS} className="hover:text-[#0D0D0D] transition-colors">
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column: Brand & Assistance */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-bold tracking-wider uppercase text-[#0D0D0D] block">
              Brand
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#557373]">
              <li>
                <Link to={ROUTES.ABOUT} className="hover:text-[#0D0D0D] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to={ROUTES.CONTACT} className="hover:text-[#0D0D0D] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column: Shopping Bag & Wishlist */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-bold tracking-wider uppercase text-[#0D0D0D] block">
              Shopping
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#557373]">
              <li>
                <Link to={ROUTES.WISHLIST} className="hover:text-[#0D0D0D] transition-colors flex items-center space-x-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#8B0000]" />
                  <span>Wishlist</span>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openDrawer}
                  className="hover:text-[#0D0D0D] transition-colors flex items-center space-x-1.5 text-left"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#142F40]" />
                  <span>Shopping Bag</span>
                </button>
              </li>
              <li>
                <Link to={ROUTES.CART} className="hover:text-[#0D0D0D] transition-colors">
                  View Full Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub-bar Copyright */}
        <div className="mt-12 pt-8 border-t border-[#DFE5F3] flex flex-col sm:flex-row justify-between items-center text-xs text-[#557373] gap-4">
          <p>© {new Date().getFullYear()} YK MENS FASHION. All rights reserved.</p>
          <p className="text-[11px] text-[#557373]/80">
            Contemporary Men's Fashion & Tailoring
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
