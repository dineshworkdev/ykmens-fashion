import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../components/layout/Container';
import { Check, ShoppingBag, ArrowRight, MapPin, Mail, Clock } from '../assets/icons';
import { orderService } from '../services/orders/orderService';
import { formatCurrency, formatDate } from '../utils/formatters';
import { ROUTES } from '../utils/constants';

/**
 * Order Confirmation Page (/order-confirmation)
 * Reassuring, polished confirmation screen with restrained success animation,
 * truthful order details, and complete item breakdown.
 */
export const OrderConfirmationPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  // Retrieve order by ID from location state or fallback to most recent order
  const order = orderId
    ? orderService.getOrderById(orderId)
    : orderService.getLastOrder();

  if (!order) {
    return (
      <div className="py-20 md:py-28 min-h-[60vh] flex items-center justify-center">
        <Container>
          <div className="max-w-md mx-auto text-center bg-[#E7DECD]/40 border border-[#DFE5F3] rounded-3xl p-10 md:p-12 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#DFE5F3] text-[#557373] flex items-center justify-center mx-auto mb-5">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#0D0D0D] uppercase mb-2">
              No Order Found
            </h1>
            <p className="text-xs md:text-sm text-[#557373] mb-8">
              No recent order could be verified in this session.
            </p>
            <Link
              to={ROUTES.SHOP}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#0D0D0D] text-[#F2EFEA] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#272401] active:scale-95 transition-all shadow-md"
            >
              Continue Shopping
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-10 md:py-16 min-h-[75vh]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="max-w-3xl mx-auto bg-[#F2EFEA] border border-[#DFE5F3] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm space-y-8"
        >
          {/* Refined Success Header with Controlled Motion */}
          <div className="text-center space-y-3 pb-8 border-b border-[#DFE5F3]">
            {/* Elegant Circle & Check Reveal */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-16 h-16 rounded-full bg-[#272401] text-[#F2EFEA] flex items-center justify-center mx-auto shadow-md"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, duration: 0.25 }}
              >
                <Check className="w-8 h-8 stroke-[2.5]" />
              </motion.div>
            </motion.div>

            <span className="text-xs uppercase tracking-widest text-[#557373] font-bold block pt-2">
              Order Confirmed
            </span>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0D0D0D]">
              Order #{order.orderId}
            </h1>

            <p className="text-xs sm:text-sm text-[#557373] max-w-md mx-auto">
              Your order has been received and logged in our system. A summary has been dispatched to{' '}
              <strong className="text-[#0D0D0D] font-semibold">{order.customer.email}</strong>.
            </p>
          </div>

          {/* Order Metadata Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#E7DECD]/50 border border-[#DFE5F3] rounded-2xl p-4 sm:p-5 text-xs">
            <div>
              <span className="text-[#557373] block mb-1">Order ID</span>
              <span className="font-bold text-[#0D0D0D] text-xs sm:text-sm">{order.orderId}</span>
            </div>
            <div>
              <span className="text-[#557373] block mb-1">Date</span>
              <span className="font-bold text-[#0D0D0D]">{formatDate(order.createdAt)}</span>
            </div>
            <div>
              <span className="text-[#557373] block mb-1">Payment Status</span>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#DFE5F3] text-[#142F40] font-semibold capitalize text-[11px]">
                {order.paymentStatus || 'Pending'}
              </span>
            </div>
            <div>
              <span className="text-[#557373] block mb-1">Order Status</span>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#EDE7C7] text-[#272401] font-semibold capitalize text-[11px]">
                {order.orderStatus || 'Placed'}
              </span>
            </div>
          </div>

          {/* Customer & Shipping Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-[#E7DECD]/30 border border-[#DFE5F3] rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-wider font-bold text-[#0D0D0D] mb-1">
                <Mail className="w-3.5 h-3.5 text-[#142F40]" />
                <span>Customer Contact</span>
              </div>
              <p className="text-xs font-semibold text-[#0D0D0D]">
                {order.customer.firstName} {order.customer.lastName}
              </p>
              <p className="text-xs text-[#557373]">{order.customer.email}</p>
              <p className="text-xs text-[#557373]">{order.customer.phone}</p>
            </div>

            <div className="p-5 bg-[#E7DECD]/30 border border-[#DFE5F3] rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-wider font-bold text-[#0D0D0D] mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#142F40]" />
                <span>Shipping Address</span>
              </div>
              <p className="text-xs font-semibold text-[#0D0D0D]">
                {order.shipping.addressLine1}
              </p>
              {order.shipping.addressLine2 && (
                <p className="text-xs text-[#557373]">{order.shipping.addressLine2}</p>
              )}
              <p className="text-xs text-[#557373]">
                {order.shipping.city}, {order.shipping.state} - {order.shipping.postalCode}
              </p>
              <p className="text-xs text-[#557373]">{order.shipping.country}</p>
            </div>
          </div>

          {/* Ordered Line Items */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#0D0D0D] pb-3 border-b border-[#DFE5F3]">
              Items in Order ({order.items.length})
            </h3>
            <div className="divide-y divide-[#DFE5F3]">
              {order.items.map((item) => (
                <div key={item.itemKey} className="py-3.5 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3.5">
                    {item.image && (
                      <div className="w-12 h-14 bg-[#E7DECD] rounded-lg overflow-hidden flex-shrink-0 border border-[#DFE5F3]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-[#0D0D0D]">{item.name}</h4>
                      <p className="text-[#557373] text-[11px] mt-0.5">
                        Size: {item.variant?.size || 'Standard'}
                        {item.variant?.color && ` • Color: ${item.variant.color}`} • Qty:{' '}
                        {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-[#0D0D0D]">
                    {formatCurrency(item.effectivePrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="pt-4 border-t border-[#DFE5F3] space-y-2 text-xs">
            <div className="flex justify-between text-[#557373]">
              <span>Subtotal</span>
              <span className="text-[#0D0D0D] font-medium">{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#557373]">
              <span>Shipping</span>
              <span className="text-[#142F40] font-medium">
                {order.shippingCost === 0 ? 'Complimentary' : formatCurrency(order.shippingCost)}
              </span>
            </div>
            <div className="flex justify-between items-baseline text-sm font-bold text-[#0D0D0D] pt-3 border-t border-[#DFE5F3]">
              <span className="uppercase tracking-wider">Total</span>
              <span className="text-lg">{formatCurrency(order.total)}</span>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-4 text-center">
            <Link
              to={ROUTES.SHOP}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#0D0D0D] text-[#F2EFEA] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#272401] active:scale-95 transition-all shadow-md space-x-2"
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
