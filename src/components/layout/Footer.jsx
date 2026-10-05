import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { useCart } from '../../hooks/useCart';
import { ShoppingBag, Heart } from '../../assets/icons';

/**
 * YK MENS FASHION - Deep Earthy Chocolate Footer
 * 
 * Strict Art Direction:
 * - Rich, deep warm chocolate brown (#2F2018 with #453025 border).
 * - Visibly rich brown and earthy, NOT black, NOT dark mode.
 * - Warm Ivory (#FAF7F2) and Soft Taupe (#C8B6A8) typography with effortless contrast.
 * - Genuine Indian men's fashion brand communication.
 * - No newsletter block (cleanly omitted).
 */
export const Footer = () => {
  const { openDrawer } = useCart();

  return (
    <footer className="mt-auto bg-[#EADFD4] text-[#4A3A32] border-t border-[#D8C8BA]">
      {/* Main Footer Links & Architecture on Cream Latte #EADFD4 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link to={ROUTES.HOME} className="block group">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider uppercase text-[#33251F] group-hover:text-[#4A3A32] transition-colors">
                YK
              </span>
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#6B5549] font-semibold block mt-0.5">
                MENS FASHION
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[#6B5549] leading-relaxed max-w-sm">
              Contemporary menswear designed with structured tailoring, relaxed proportions, and enduring everyday comfort.
            </p>
          </div>

          {/* Navigation Column: Catalog */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-bold tracking-wider uppercase text-[#33251F] block">
              Navigation
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#6B5549]">
              <li>
                <Link to={ROUTES.SHOP} className="hover:text-[#33251F] transition-colors">
                  Shop All Menswear
                </Link>
              </li>
              <li>
                <Link to={ROUTES.NEW_ARRIVALS} className="hover:text-[#33251F] transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to={ROUTES.COLLECTIONS} className="hover:text-[#33251F] transition-colors">
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column: Brand & Assistance */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-bold tracking-wider uppercase text-[#33251F] block">
              Brand
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#6B5549]">
              <li>
                <Link to={ROUTES.ABOUT} className="hover:text-[#33251F] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to={ROUTES.CONTACT} className="hover:text-[#33251F] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column: Shopping Bag & Wishlist */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-bold tracking-wider uppercase text-[#33251F] block">
              Shopping
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#6B5549]">
              <li>
                <Link to={ROUTES.WISHLIST} className="hover:text-[#33251F] transition-colors flex items-center space-x-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#4A3A32]" />
                  <span>Wishlist</span>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openDrawer}
                  className="hover:text-[#33251F] transition-colors flex items-center space-x-1.5 text-left"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#4A3A32]" />
                  <span>Shopping Bag</span>
                </button>
              </li>
              <li>
                <Link to={ROUTES.CART} className="hover:text-[#33251F] transition-colors">
                  View Full Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub-bar Copyright */}
        <div className="mt-12 pt-8 border-t border-[#D8C8BA] flex flex-col sm:flex-row justify-between items-center text-xs text-[#8B7768] gap-4">
          <p>© {new Date().getFullYear()} YK MENS FASHION. All rights reserved.</p>
          <p className="text-[11px] text-[#8B7768]">
            Contemporary Men's Fashion & Tailoring
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
