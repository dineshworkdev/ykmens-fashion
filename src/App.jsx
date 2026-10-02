import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CheckoutProvider } from './context/CheckoutContext';
import AppRoutes from './routes/AppRoutes';
import LoadingScreen from './components/common/LoadingScreen';
import ScrollToTop from './components/common/ScrollToTop';

/**
 * Root Application Component
 * Manages the approved brand loading experience and provider hierarchy.
 */
export function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <CartProvider>
        <WishlistProvider>
          <CheckoutProvider>
            {/* Approved Brand Intro Loading Experience */}
            <AnimatePresence mode="wait">
              {isLoading && (
                <LoadingScreen onComplete={() => setIsLoading(false)} />
              )}
            </AnimatePresence>

            <AppRoutes />
          </CheckoutProvider>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
