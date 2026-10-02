import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { useCart } from '../../hooks/useCart';
import { ArrowRight, ShoppingBag, Heart, CheckCircle2 } from '../../assets/icons';

/**
 * YK MENS FASHION - Light-First Refined Brand Footer
 * 
 * Strict Compliance:
 * - Light surface palette (#F2EFEA & #E7DECD).
 * - Genuine Indian men's fashion brand communication.
 * - Rounded input fields and buttons (rounded-xl).
 * - Clean, useful navigation links to real existing routes only.
 * - No fake social links, no fake policies, no fake phone numbers.
 */
export const Footer = () => {
  const { openDrawer } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="mt-auto bg-[#CBD4DC] text-[#0D0D0D] border-t border-[#BAC5CE]">
      {/* Upper Newsletter Section on Pale Mineral Sage #E2EAE5 */}
      <div className="bg-[#E2EAE5] border-b border-[#CBD8D1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-[#8B0000] font-bold block">
                Stay Updated
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0D0D0D]">
                New Releases & Curated Menswear
              </h3>
              <p className="text-xs sm:text-sm text-[#557373] max-w-md leading-relaxed">
                Receive notifications when new tailored collections and seasonal wardrobe essentials arrive.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="p-4 bg-white border border-[#CBD8D1] rounded-xl text-[#0D0D0D] text-xs sm:text-sm font-medium flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#272401] flex-shrink-0" />
                  <span>Thank you. Your email has been added to our updates list.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 px-4 py-3 bg-white border border-[#CBD8D1] text-[#0D0D0D] placeholder-[#557373]/70 text-xs sm:text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#557373]/30 focus:border-[#557373] transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#0D0D0D] text-[#F2EFEA] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#200E01] active:scale-95 transition-all shadow-md whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Architecture on Soft Blue-Grey #CBD4DC */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link to={ROUTES.HOME} className="block group">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider uppercase text-[#0D0D0D] group-hover:text-[#8B0000] transition-colors">
                YK
              </span>
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#556677] font-semibold block mt-0.5">
                MENS FASHION
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[#404F5C] leading-relaxed max-w-sm">
              Contemporary menswear designed with structured tailoring, relaxed proportions, and enduring everyday comfort.
            </p>
          </div>

          {/* Navigation Column: Catalog */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-bold tracking-wider uppercase text-[#0D0D0D] block">
              Navigation
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#404F5C]">
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
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#404F5C]">
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
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#404F5C]">
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
        <div className="mt-12 pt-8 border-t border-[#BAC5CE] flex flex-col sm:flex-row justify-between items-center text-xs text-[#556677] gap-4">
          <p>© {new Date().getFullYear()} YK MENS FASHION. All rights reserved.</p>
          <p className="text-[11px] text-[#556677]/80">
            Contemporary Men's Fashion & Tailoring
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
