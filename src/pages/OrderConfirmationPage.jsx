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
      <div className="bg-[#241812] text-[#FAF7F2] py-20 md:py-28 min-h-[60vh] flex items-center justify-center">
        <Container>
          <div className="max-w-md mx-auto text-center bg-[#2C1E18] border border-[#3E2B21] rounded-3xl p-10 md:p-12 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-[#3E2B21] text-[#FAF7F2] flex items-center justify-center mx-auto mb-5">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#FAF7F2] uppercase mb-2">
              No Order Found
            </h1>
            <p className="text-xs md:text-sm text-[#C8B8AA] mb-8">
              No recent order could be verified in this session.
            </p>
            <Link
              to={ROUTES.SHOP}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#FAF7F2] text-[#1D1410] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#E8DEC8] active:scale-95 transition-all shadow-md"
            >
              Continue Shopping
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-[#241812] text-[#FAF7F2] py-10 md:py-16 min-h-[75vh]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="max-w-3xl mx-auto bg-[#2C1E18] border border-[#3E2B21] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl space-y-8"
        >
          {/* Refined Success Header with Controlled Motion */}
          <div className="text-center space-y-3 pb-8 border-b border-[#3E2B21]">
            {/* Elegant Circle & Check Reveal */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-16 h-16 rounded-full bg-[#FAF7F2] text-[#1D1410] flex items-center justify-center mx-auto shadow-md"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, duration: 0.25 }}
              >
                <Check className="w-8 h-8 stroke-[2.5]" />
              </motion.div>
            </motion.div>

            <span className="text-xs uppercase tracking-widest text-[#D99E84] font-bold block pt-2">
              Order Confirmed
            </span>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF7F2]">
              Order #{order.orderId}
            </h1>

            <p className="text-xs sm:text-sm text-[#C8B8AA] max-w-md mx-auto">
              Your order has been received and logged in our system. A summary has been dispatched to{' '}
              <strong className="text-[#FAF7F2] font-semibold">{order.customer.email}</strong>.
            </p>
          </div>

          {/* Order Metadata Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#341F17] border border-[#3E2B21] rounded-2xl p-4 sm:p-5 text-xs">
            <div>
              <span className="text-[#C8B8AA] block mb-1">Order ID</span>
              <span className="font-bold text-[#FAF7F2] text-xs sm:text-sm">{order.orderId}</span>
            </div>
            <div>
              <span className="text-[#C8B8AA] block mb-1">Date</span>
              <span className="font-bold text-[#FAF7F2]">{formatDate(order.createdAt)}</span>
            </div>
            <div>
              <span className="text-[#C8B8AA] block mb-1">Payment Status</span>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#202920] text-[#71B57A] font-semibold capitalize text-[11px] border border-[#2E3A2E]">
                {order.paymentStatus || 'Pending'}
              </span>
            </div>
            <div>
              <span className="text-[#C8B8AA] block mb-1">Order Status</span>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#3E2B21] text-[#D99E84] font-semibold capitalize text-[11px]">
                {order.orderStatus || 'Placed'}
              </span>
            </div>
          </div>

          {/* Customer & Shipping Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-[#341F17] border border-[#3E2B21] rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-wider font-bold text-[#FAF7F2] mb-1">
                <Mail className="w-3.5 h-3.5 text-[#D99E84]" />
                <span>Customer Contact</span>
              </div>
              <p className="text-xs font-semibold text-[#FAF7F2]">
                {order.customer.firstName} {order.customer.lastName}
              </p>
              <p className="text-xs text-[#C8B8AA]">{order.customer.email}</p>
              <p className="text-xs text-[#C8B8AA]">{order.customer.phone}</p>
            </div>

            <div className="p-5 bg-[#341F17] border border-[#3E2B21] rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-wider font-bold text-[#FAF7F2] mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#D99E84]" />
                <span>Shipping Address</span>
              </div>
              <p className="text-xs font-semibold text-[#FAF7F2]">
                {order.shipping.addressLine1}
              </p>
              {order.shipping.addressLine2 && (
                <p className="text-xs text-[#C8B8AA]">{order.shipping.addressLine2}</p>
              )}
              <p className="text-xs text-[#C8B8AA]">
                {order.shipping.city}, {order.shipping.state} - {order.shipping.postalCode}
              </p>
              <p className="text-xs text-[#C8B8AA]">{order.shipping.country}</p>
            </div>
          </div>

          {/* Ordered Line Items */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#FAF7F2] pb-3 border-b border-[#3E2B21]">
              Items in Order ({order.items.length})
            </h3>
            <div className="divide-y divide-[#3E2B21]">
              {order.items.map((item) => (
                <div key={item.itemKey} className="py-3.5 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3.5">
                    {item.image && (
                      <div className="w-12 h-14 bg-[#FAF7F2] rounded-lg overflow-hidden flex-shrink-0 border border-[#E8DEC8]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-[#FAF7F2]">{item.name}</h4>
                      <p className="text-[#C8B8AA] text-[11px] mt-0.5">
                        Size: {item.variant?.size || 'Standard'}
                        {item.variant?.color && ` • Color: ${item.variant.color}`} • Qty:{' '}
                        {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-[#FAF7F2]">
                    {formatCurrency(item.effectivePrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="pt-4 border-t border-[#3E2B21] space-y-2 text-xs">
            <div className="flex justify-between text-[#C8B8AA]">
              <span>Subtotal</span>
              <span className="text-[#FAF7F2] font-medium">{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#C8B8AA]">
              <span>Shipping</span>
              <span className="text-[#D99E84] font-medium">
                {order.shippingCost === 0 ? 'Complimentary' : formatCurrency(order.shippingCost)}
              </span>
            </div>
            <div className="flex justify-between items-baseline text-sm font-bold text-[#FAF7F2] pt-3 border-t border-[#3E2B21]">
              <span className="uppercase tracking-wider">Total</span>
              <span className="text-lg">{formatCurrency(order.total)}</span>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-4 text-center">
            <Link
              to={ROUTES.SHOP}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#FAF7F2] text-[#1D1410] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#E8DEC8] active:scale-95 transition-all shadow-md space-x-2"
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
