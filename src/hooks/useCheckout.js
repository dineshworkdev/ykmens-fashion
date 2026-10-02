import { useCheckoutContext } from '../context/CheckoutContext';

/**
 * Custom hook to access Checkout state, steps, and order actions.
 */
export const useCheckout = () => {
  return useCheckoutContext();
};

export default useCheckout;
