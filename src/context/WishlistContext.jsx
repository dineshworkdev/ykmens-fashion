import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { safeStorage } from '../utils/storage';
import { STORAGE_KEYS } from '../utils/constants';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    return safeStorage.get(STORAGE_KEYS.WISHLIST, []);
  });

  useEffect(() => {
    safeStorage.set(STORAGE_KEYS.WISHLIST, wishlistItems);
  }, [wishlistItems]);

  const wishlistIdSet = useMemo(() => {
    return new Set(wishlistItems.map((item) => item.id));
  }, [wishlistItems]);

  const isInWishlist = useCallback((productId) => {
    return wishlistIdSet.has(productId);
  }, [wishlistIdSet]);

  const toggleWishlist = useCallback((product) => {
    if (!product || !product.id) return;
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
    safeStorage.remove(STORAGE_KEYS.WISHLIST);
  }, []);

  const value = useMemo(
    () => ({
      wishlistItems,
      wishlistCount: wishlistItems.length,
      isInWishlist,
      toggleWishlist,
      removeFromWishlist,
      clearWishlist,
    }),
    [
      wishlistItems,
      isInWishlist,
      toggleWishlist,
      removeFromWishlist,
      clearWishlist,
    ]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlistContext must be used within a WishlistProvider');
  }
  return context;
};

export default WishlistContext;
