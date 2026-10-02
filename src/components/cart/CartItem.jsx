import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from '../../assets/icons';
import { formatCurrency } from '../../utils/formatters';

/**
 * Premium Cart Item Row Component
 * Used in Cart Drawer, Cart Page, and Checkout Review.
 */
export const CartItem = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
  compact = false,
  readOnly = false,
}) => {
  const itemPrice = item.effectivePrice ?? (item.salePrice ?? item.price);
  const lineTotal = itemPrice * item.quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, overflow: 'hidden', marginBottom: 0, transition: { duration: 0.25 } }}
      transition={{ duration: 0.2 }}
      className={`py-4 flex gap-4 items-center ${compact ? 'py-3' : 'py-5'}`}
    >
      {/* Thumbnail */}
      <Link
        to={item.slug ? `/product/${item.slug}` : '#'}
        className={`relative flex-shrink-0 bg-[#E7DECD] overflow-hidden rounded-xl border border-[#DFE5F3] group ${
          compact ? 'w-16 h-20' : 'w-20 h-24 sm:w-24 sm:h-28'
        }`}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[10px] text-[#557373]">
            YK
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2">
            <Link
              to={item.slug ? `/product/${item.slug}` : '#'}
              className="font-medium text-[#0D0D0D] hover:text-[#272401] transition-colors text-sm line-clamp-1"
            >
              {item.name}
            </Link>
            {!readOnly && onRemove && (
              <button
                type="button"
                onClick={() => onRemove(item.itemKey)}
                aria-label={`Remove ${item.name} from bag`}
                className="text-[#557373] hover:text-[#8B0000] p-1 rounded-lg transition-colors flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Variants */}
          <div className="flex items-center gap-2 mt-1 text-xs text-[#557373]">
            <span className="bg-[#DFE5F3]/60 px-2 py-0.5 rounded-md font-medium text-[#142F40]">
              Size: {item.variant?.size || 'Standard'}
            </span>
            {item.variant?.color && (
              <span className="bg-[#DFE5F3]/60 px-2 py-0.5 rounded-md font-medium text-[#142F40]">
                {item.variant.color}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Quantity Controls */}
        <div className="flex items-center justify-between mt-3 pt-2">
          {readOnly ? (
            <span className="text-xs text-[#557373] font-medium">
              Qty: <strong className="text-[#0D0D0D]">{item.quantity}</strong>
            </span>
          ) : (
            <div className="flex items-center bg-[#DFE5F3]/50 border border-[#DFE5F3] rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => onDecrement(item.itemKey)}
                aria-label="Decrease quantity"
                className="w-8 h-8 flex items-center justify-center text-[#0D0D0D] hover:bg-[#DFE5F3] active:scale-95 transition-all text-xs"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-xs font-bold text-[#0D0D0D]">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => onIncrement(item.itemKey)}
                aria-label="Increase quantity"
                className="w-8 h-8 flex items-center justify-center text-[#0D0D0D] hover:bg-[#DFE5F3] active:scale-95 transition-all text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="text-right">
            <div className="text-sm font-bold text-[#0D0D0D] tracking-tight">
              {formatCurrency(lineTotal)}
            </div>
            {item.quantity > 1 && (
              <div className="text-[11px] text-[#557373]">
                {formatCurrency(itemPrice)} each
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
