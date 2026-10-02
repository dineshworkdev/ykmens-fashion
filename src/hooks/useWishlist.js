import { useWishlistContext } from '../context/WishlistContext';

/**
 * Custom hook to access Wishlist state and operations.
 */
export const useWishlist = () => {
  return useWishlistContext();
};

export default useWishlist;
