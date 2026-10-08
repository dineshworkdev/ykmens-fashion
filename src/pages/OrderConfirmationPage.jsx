import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../components/layout/Container';
import { Check, ShoppingBag, ArrowRight, MapPin, Mail, Clock, AlertCircle } from '../assets/icons';
import { orderService } from '../services/orders/orderService';
import { paymentService } from '../services/payment';
import { useCart } from '../hooks/useCart';
import { formatCurrency, formatDate } from '../utils/formatters';
import { ROUTES, PAYMENT_STATUS } from '../utils/constants';

/**
 * Order Confirmation Page (/order-confirmation)
 * Reassuring, polished confirmation screen with restrained success animation,
 * truthful order details, server-side Cashfree payment verification, and complete item breakdown.
 */
export const OrderConfirmationPage = () => {
  const location = useLocation();
  const { emptyCart } = useCart();

  // Extract order_id from URL query params (Cashfree return redirect) or router state
  const searchParams = new URLSearchParams(location.search);
  const urlOrderId = searchParams.get('order_id') || searchParams.get('orderId');
  const initialOrderId = location.state?.orderId || urlOrderId;

  // Retrieve order from storage or fallback to most recent order
  const [order, setOrder] = useState(() => {
    return initialOrderId
      ? orderService.getOrderById(initialOrderId) || orderService.getLastOrder()
      : orderService.getLastOrder();
  });

  const [verificationState, setVerificationState] = useState({
    loading: Boolean(initialOrderId),
    status: order?.paymentStatus || 'pending', // 'paid' | 'pending' | 'failed'
    transactionId: order?.transactionId || null,
    message: null,
    error: null,
  });

  // Verify payment status with server-side Cashfree API
  useEffect(() => {
    let isMounted = true;
    const targetOrderId = initialOrderId || order?.orderId;

    if (!targetOrderId) {
      setVerificationState((prev) => ({ ...prev, loading: false }));
      return;
    }

    async function runVerification() {
      setVerificationState((prev) => ({ ...prev, loading: true }));

      try {
        const cashfreeGateway = paymentService.getGateway('cashfree');
        const verification = await cashfreeGateway.verifyPayment(targetOrderId);

        if (!isMounted) return;

        if (verification.isSuccessful || verification.status === 'PAID') {
          // Payment successfully verified by Cashfree
          orderService.updatePaymentStatus(
            order?.orderId || targetOrderId,
            PAYMENT_STATUS.PAID,
            verification.transactionId
          );
          emptyCart(); // Clear cart now that payment is verified

          setVerificationState({
            loading: false,
            status: 'paid',
            transactionId: verification.transactionId,
            message: verification.message || 'Payment successfully verified via Cashfree.',
            error: null,
          });

          setOrder((prev) =>
            prev
              ? {
                  ...prev,
                  paymentStatus: PAYMENT_STATUS.PAID,
                  transactionId: verification.transactionId || prev.transactionId,
                }
              : prev
          );
        } else if (verification.status === 'PENDING') {
          orderService.updatePaymentStatus(
            order?.orderId || targetOrderId,
            PAYMENT_STATUS.PENDING,
            verification.transactionId
          );

          setVerificationState({
            loading: false,
            status: 'pending',
            transactionId: verification.transactionId,
            message: verification.message || 'Payment is currently pending confirmation from bank.',
            error: null,
          });

          setOrder((prev) =>
            prev
              ? {
                  ...prev,
                  paymentStatus: PAYMENT_STATUS.PENDING,
                  transactionId: verification.transactionId || prev.transactionId,
                }
              : prev
          );
        } else {
          // Status is FAILED
          orderService.updatePaymentStatus(
            order?.orderId || targetOrderId,
            PAYMENT_STATUS.FAILED,
            verification.transactionId
          );

          setVerificationState({
            loading: false,
            status: 'failed',
            transactionId: verification.transactionId,
            message: verification.message || verification.error || 'Payment was not completed.',
            error: verification.error || 'Payment failed or was cancelled.',
          });

          setOrder((prev) =>
            prev
              ? {
                  ...prev,
                  paymentStatus: PAYMENT_STATUS.FAILED,
                  transactionId: verification.transactionId || prev.transactionId,
                }
              : prev
          );
        }
      } catch (err) {
        if (!isMounted) return;
        setVerificationState({
          loading: false,
          status: 'pending',
          transactionId: null,
          message: 'Unable to reach payment verification service.',
          error: err.message,
        });
      }
    }

    runVerification();

    return () => {
      isMounted = false;
    };
  }, [initialOrderId]);

  if (!order) {
    return (
      <div className="bg-[#FAF7F2] text-[#4A3A32] py-20 md:py-28 min-h-[60vh] flex items-center justify-center">
        <Container>
          <div className="max-w-md mx-auto text-center bg-[#FFFFFF] border border-[#E4D7CC] rounded-3xl p-10 md:p-12 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-[#EADFD4] text-[#33251F] flex items-center justify-center mx-auto mb-5">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#33251F] uppercase mb-2">
              No Order Found
            </h1>
            <p className="text-xs md:text-sm text-[#6B5549] mb-8">
              No recent order could be verified in this session.
            </p>
            <Link
              to={ROUTES.SHOP}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#4A3A32] text-[#FAF7F2] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#33251F] active:scale-95 transition-all shadow-md"
            >
              Continue Shopping
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const isPaid = verificationState.status === 'paid';
  const isPending = verificationState.status === 'pending';
  const isFailed = verificationState.status === 'failed';
  const isLoading = verificationState.loading;

  return (
    <div className="bg-[#FAF7F2] text-[#4A3A32] py-10 md:py-16 min-h-[75vh]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="max-w-3xl mx-auto bg-[#FFFFFF] border border-[#E4D7CC] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl space-y-8"
        >
          {/* Refined Header with Controlled Motion and Status Icon */}
          <div className="text-center space-y-3 pb-8 border-b border-[#E4D7CC]">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-md ${
                isPaid
                  ? 'bg-[#EADFD4] text-[#33251F]'
                  : isPending
                  ? 'bg-[#FAF7F2] border border-[#D8C8BA] text-[#4A3A32]'
                  : 'bg-[#FAF7F2] border border-[#D8C8BA] text-[#6B5549]'
              }`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, duration: 0.25 }}
              >
                {isPaid ? (
                  <Check className="w-8 h-8 stroke-[2.5]" />
                ) : isPending ? (
                  <Clock className="w-8 h-8" />
                ) : (
                  <AlertCircle className="w-8 h-8" />
                )}
              </motion.div>
            </motion.div>

            <span className="text-xs uppercase tracking-widest text-[#8B7768] font-bold block pt-2">
              {isLoading
                ? 'Verifying Payment Status'
                : isPaid
                ? 'Payment Verified & Order Confirmed'
                : isPending
                ? 'Payment Processing'
                : 'Payment Unsuccessful'}
            </span>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#33251F]">
              Order #{order.orderId}
            </h1>

            <p className="text-xs sm:text-sm text-[#6B5549] max-w-md mx-auto">
              {isLoading ? (
                'Connecting to Cashfree to confirm your transaction...'
              ) : isPaid ? (
                <>
                  Your order has been verified and confirmed. A summary has been dispatched to{' '}
                  <strong className="text-[#33251F] font-semibold">{order.customer.email}</strong>.
                </>
              ) : isPending ? (
                <>
                  Your transaction is pending bank confirmation. Order summary recorded for{' '}
                  <strong className="text-[#33251F] font-semibold">{order.customer.email}</strong>.
                </>
              ) : (
                'Your payment was not completed or was cancelled. You may retry your payment below.'
              )}
            </p>
          </div>

          {/* Order Metadata Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF7F2] border border-[#E4D7CC] rounded-2xl p-4 sm:p-5 text-xs">
            <div>
              <span className="text-[#8B7768] block mb-1">Order ID</span>
              <span className="font-bold text-[#33251F] text-xs sm:text-sm">{order.orderId}</span>
            </div>
            <div>
              <span className="text-[#8B7768] block mb-1">Date</span>
              <span className="font-bold text-[#33251F]">{formatDate(order.createdAt)}</span>
            </div>
            <div>
              <span className="text-[#8B7768] block mb-1">Payment Status</span>
              {isLoading ? (
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFFFFF] text-[#4A3A32] font-semibold text-[11px] border border-[#D8C8BA] animate-pulse">
                  Verifying...
                </span>
              ) : isPaid ? (
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#EADFD4] text-[#33251F] font-semibold capitalize text-[11px] border border-[#D8C8BA]">
                  Paid (Verified)
                </span>
              ) : isPending ? (
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFFFFF] text-[#4A3A32] font-semibold capitalize text-[11px] border border-[#D8C8BA]">
                  Pending
                </span>
              ) : (
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFFFFF] text-[#8B7768] font-semibold capitalize text-[11px] border border-[#D8C8BA]">
                  Failed
                </span>
              )}
            </div>
            <div>
              <span className="text-[#8B7768] block mb-1">Order Status</span>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFFFFF] text-[#33251F] font-semibold capitalize text-[11px] border border-[#E4D7CC]">
                {order.orderStatus || 'Placed'}
              </span>
            </div>
          </div>

          {/* Customer & Shipping Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-[#FAF7F2] border border-[#E4D7CC] rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-wider font-bold text-[#33251F] mb-1">
                <Mail className="w-3.5 h-3.5 text-[#4A3A32]" />
                <span>Customer Contact</span>
              </div>
              <p className="text-xs font-semibold text-[#33251F]">
                {order.customer.firstName} {order.customer.lastName}
              </p>
              <p className="text-xs text-[#6B5549]">{order.customer.email}</p>
              <p className="text-xs text-[#6B5549]">{order.customer.phone}</p>
            </div>

            <div className="p-5 bg-[#FAF7F2] border border-[#E4D7CC] rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-wider font-bold text-[#33251F] mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#4A3A32]" />
                <span>Shipping Address</span>
              </div>
              <p className="text-xs font-semibold text-[#33251F]">
                {order.shipping.addressLine1}
              </p>
              {order.shipping.addressLine2 && (
                <p className="text-xs text-[#6B5549]">{order.shipping.addressLine2}</p>
              )}
              <p className="text-xs text-[#6B5549]">
                {order.shipping.city}, {order.shipping.state} - {order.shipping.postalCode}
              </p>
              <p className="text-xs text-[#6B5549]">{order.shipping.country}</p>
            </div>
          </div>

          {/* Ordered Line Items */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#33251F] pb-3 border-b border-[#E4D7CC]">
              Items in Order ({order.items.length})
            </h3>
            <div className="divide-y divide-[#E4D7CC]">
              {order.items.map((item) => (
                <div key={item.itemKey} className="py-3.5 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3.5">
                    {item.image && (
                      <div className="w-12 h-14 bg-[#FAF7F2] rounded-lg overflow-hidden flex-shrink-0 border border-[#E4D7CC]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-[#33251F]">{item.name}</h4>
                      <p className="text-[#6B5549] text-[11px] mt-0.5">
                        Size: {item.variant?.size || 'Standard'}
                        {item.variant?.color && ` • Color: ${item.variant.color}`} • Qty:{' '}
                        {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-[#33251F]">
                    {formatCurrency(item.effectivePrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="pt-4 border-t border-[#E4D7CC] space-y-2 text-xs">
            <div className="flex justify-between text-[#6B5549]">
              <span>Subtotal</span>
              <span className="text-[#33251F] font-medium">{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#6B5549]">
              <span>Shipping</span>
              <span className="text-[#4A3A32] font-medium">
                {order.shippingCost === 0 ? 'Complimentary' : formatCurrency(order.shippingCost)}
              </span>
            </div>
            <div className="flex justify-between items-baseline text-sm font-bold text-[#33251F] pt-3 border-t border-[#E4D7CC]">
              <span className="uppercase tracking-wider">Total</span>
              <span className="text-lg">{formatCurrency(order.total)}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            {isFailed && (
              <Link
                to={ROUTES.CHECKOUT}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-[#FAF7F2] border border-[#D8C8BA] text-[#4A3A32] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#EADFD4] active:scale-95 transition-all shadow-sm space-x-2"
              >
                <span>Retry Checkout</span>
              </Link>
            )}
            <Link
              to={ROUTES.SHOP}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-[#4A3A32] text-[#FAF7F2] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#33251F] active:scale-95 transition-all shadow-md space-x-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default OrderConfirmationPage;
