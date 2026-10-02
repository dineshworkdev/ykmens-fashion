import { useCartContext } from '../context/CartContext';

/**
 * Custom hook to access Cart state and operations.
 */
export const useCart = () => {
  return useCartContext();
};

export default useCart;
