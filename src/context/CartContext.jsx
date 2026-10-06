import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { safeStorage } from '../utils/storage';
import { STORAGE_KEYS } from '../utils/constants';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    return safeStorage.get(STORAGE_KEYS.CART, []);
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Sync to safeStorage on change
  useEffect(() => {
    safeStorage.set(STORAGE_KEYS.CART, items);
  }, [items]);

  /**
   * Adds an item to the cart with specific variant (size, color).
   * Generates a composite itemKey so different variants of the same product are distinct items.
   */
  const addItem = useCallback((product, variant = {}, quantity = 1) => {
    if (!product || !product.id) return;

    const selectedSize = variant.size || (product.sizes && product.sizes[0]) || 'Standard';
    const selectedColor = variant.color || (product.colors && product.colors[0]?.name) || 'Standard';
    const itemKey = `${product.id}-${selectedSize}-${selectedColor}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.itemKey === itemKey);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      const effectivePrice = product.salePrice !== null && product.salePrice !== undefined 
        ? product.salePrice 
        : product.price;

      const newItem = {
        itemKey,
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        salePrice: product.salePrice,
        effectivePrice,
        image: product.images && product.images[0] ? product.images[0] : '',
        variant: {
          size: selectedSize,
          color: selectedColor,
        },
        quantity,
      };

      return [...prevItems, newItem];
    });
  }, []);

  /**
   * Removes an item completely from cart by its composite itemKey.
   */
  const removeItem = useCallback((itemKey) => {
    setItems((prevItems) => prevItems.filter((item) => item.itemKey !== itemKey));
  }, []);

  /**
   * Updates an item's quantity directly.
   */
  const updateQuantity = useCallback((itemKey, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemKey);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.itemKey === itemKey ? { ...item, quantity: newQuantity } : item
      )
    );
  }, [removeItem]);

  /**
   * Increments quantity by 1.
   */
  const incrementQuantity = useCallback((itemKey) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.itemKey === itemKey ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  /**
   * Decrements quantity by 1, removes if quantity reaches 0.
   */
  const decrementQuantity = useCallback((itemKey) => {
    setItems((prevItems) => {
      const target = prevItems.find((item) => item.itemKey === itemKey);
      if (!target) return prevItems;
      if (target.quantity <= 1) {
        return prevItems.filter((item) => item.itemKey !== itemKey);
      }
      return prevItems.map((item) =>
        item.itemKey === itemKey ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  }, []);

  /**
   * Clears all items in the cart.
   */
  const emptyCart = useCallback(() => {
    setItems([]);
    safeStorage.remove(STORAGE_KEYS.CART);
  }, []);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setIsDrawerOpen((prev) => !prev), []);

  // Computed metrics
  const cartCount = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => {
      const price = item.salePrice !== null && item.salePrice !== undefined ? item.salePrice : item.price;
      return total + price * item.quantity;
    }, 0);
  }, [items]);

  // Shipping calculation - calculated at checkout or complimentary
  const shipping = useMemo(() => {
    return 0;
  }, []);

  // In India fashion retail, taxes are inclusive (MRP)
  const estimatedTax = useMemo(() => {
    return 0;
  }, []);

  const total = useMemo(() => {
    return subtotal + shipping;
  }, [subtotal, shipping]);

  const value = useMemo(
    () => ({
      items,
      cartCount,
      subtotal,
      shipping,
      estimatedTax,
      total,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      addItem,
      removeItem,
      updateQuantity,
      incrementQuantity,
      decrementQuantity,
      emptyCart,
    }),
    [
      items,
      cartCount,
      subtotal,
      shipping,
      estimatedTax,
      total,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      addItem,
      removeItem,
      updateQuantity,
      incrementQuantity,
      decrementQuantity,
      emptyCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
