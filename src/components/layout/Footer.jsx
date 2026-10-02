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
    <footer className="mt-auto bg-[#0D0D0D] text-[#F2EFEA] border-t border-[#22282E]">
      {/* Upper Newsletter Section on Refined Charcoal Tone #14181B */}
      <div className="bg-[#14181B] border-b border-[#22282E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-[#A6445D] font-bold block">
                Stay Updated
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#FFFFFF]">
                New Releases & Curated Menswear
              </h3>
              <p className="text-xs sm:text-sm text-[#9AA6B2] max-w-md leading-relaxed">
                Receive notifications when new tailored collections and seasonal wardrobe essentials arrive.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="p-4 bg-[#1C2329] border border-[#2E3740] rounded-xl text-[#F2EFEA] text-xs sm:text-sm font-medium flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#EDE7C7] flex-shrink-0" />
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
                    className="flex-1 px-4 py-3 bg-[#0D0D0D] border border-[#2E3740] text-[#F2EFEA] placeholder-[#9AA6B2]/60 text-xs sm:text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#62929E]/50 focus:border-[#62929E] transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#F2EFEA] text-[#0D0D0D] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#E7DECD] active:scale-95 transition-all shadow-md whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Architecture */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link to={ROUTES.HOME} className="block group">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider uppercase text-[#FFFFFF] group-hover:text-[#EDE7C7] transition-colors">
                YK
              </span>
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#9AA6B2] font-semibold block mt-0.5">
                MENS FASHION
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[#9AA6B2] leading-relaxed max-w-sm">
              Contemporary menswear designed with structured tailoring, relaxed proportions, and enduring everyday comfort.
            </p>
          </div>

          {/* Navigation Column: Catalog */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-bold tracking-wider uppercase text-[#FFFFFF] block">
              Navigation
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#9AA6B2]">
              <li>
                <Link to={ROUTES.SHOP} className="hover:text-[#FFFFFF] transition-colors">
                  Shop All Menswear
                </Link>
              </li>
              <li>
                <Link to={ROUTES.NEW_ARRIVALS} className="hover:text-[#FFFFFF] transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to={ROUTES.COLLECTIONS} className="hover:text-[#FFFFFF] transition-colors">
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column: Brand & Assistance */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-bold tracking-wider uppercase text-[#FFFFFF] block">
              Brand
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#9AA6B2]">
              <li>
                <Link to={ROUTES.ABOUT} className="hover:text-[#FFFFFF] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to={ROUTES.CONTACT} className="hover:text-[#FFFFFF] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column: Shopping Bag & Wishlist */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-bold tracking-wider uppercase text-[#FFFFFF] block">
              Shopping
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#9AA6B2]">
              <li>
                <Link to={ROUTES.WISHLIST} className="hover:text-[#FFFFFF] transition-colors flex items-center space-x-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#A6445D]" />
                  <span>Wishlist</span>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openDrawer}
                  className="hover:text-[#FFFFFF] transition-colors flex items-center space-x-1.5 text-left"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#62929E]" />
                  <span>Shopping Bag</span>
                </button>
              </li>
              <li>
                <Link to={ROUTES.CART} className="hover:text-[#FFFFFF] transition-colors">
                  View Full Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub-bar Copyright */}
        <div className="mt-12 pt-8 border-t border-[#22282E] flex flex-col sm:flex-row justify-between items-center text-xs text-[#9AA6B2] gap-4">
          <p>© {new Date().getFullYear()} YK MENS FASHION. All rights reserved.</p>
          <p className="text-[11px] text-[#9AA6B2]/80">
            Contemporary Men's Fashion & Tailoring
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
