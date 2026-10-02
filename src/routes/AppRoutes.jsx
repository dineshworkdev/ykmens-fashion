import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import ShopPage from '../pages/ShopPage';
import NewArrivalsPage from '../pages/NewArrivalsPage';
import CollectionsPage from '../pages/CollectionsPage';
import CollectionDetailPage from '../pages/CollectionDetailPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import SearchPage from '../pages/SearchPage';
import LookbookPage from '../pages/LookbookPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import WishlistPage from '../pages/WishlistPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrderConfirmationPage from '../pages/OrderConfirmationPage';
import NotFoundPage from '../pages/NotFoundPage';
import { ROUTES } from '../utils/constants';

/**
 * Application Routing Architecture
 * Sets up all required brand, catalog, cart, and checkout routes under Layout.
 */
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.SHOP} element={<ShopPage />} />
        <Route path={ROUTES.NEW_ARRIVALS} element={<NewArrivalsPage />} />
        <Route path={ROUTES.COLLECTIONS} element={<CollectionsPage />} />
        <Route path={ROUTES.COLLECTION_DETAIL} element={<CollectionDetailPage />} />
        <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
        <Route path={ROUTES.SEARCH} element={<SearchPage />} />
        <Route path={ROUTES.LOOKBOOK} element={<LookbookPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        <Route path={ROUTES.WISHLIST} element={<WishlistPage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
        <Route path={ROUTES.ORDER_CONFIRMATION} element={<OrderConfirmationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
