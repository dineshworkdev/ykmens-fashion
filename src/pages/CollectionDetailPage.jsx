import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../components/layout/Container';
import ProductGrid from '../components/product/ProductGrid';
import QuickViewModal from '../components/product/QuickViewModal';
import CollectionCard from '../components/collection/CollectionCard';
import { COLLECTIONS } from '../data/collections';
import { PRODUCTS } from '../data/products';
import { ROUTES } from '../utils/constants';
import { AnimatedArrowRight } from '../components/common/AnimatedIcons';
import FashionButton from '../components/common/FashionButton';

/**
 * YK MENS FASHION - Collection Detail Page
 * 
 * Strict Compliance:
 * - Visually strong, light-first collection hero
 * - Color story derived from approved palette
 * - Product grid reusing established ProductCard system
 * - Quick View modal support
 * - Related collections navigation
 * - No fake metadata or dates
 */
export const CollectionDetailPage = () => {
  const { slug } = useParams();
  const collection = COLLECTIONS.find((c) => c.slug === slug);

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  if (!collection) {
    return (
      <div className="bg-[#FAF7F2] text-[#4A3A32] min-h-[70vh] flex items-center justify-center py-20">
        <Container className="text-center max-w-md">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#EADFD4] flex items-center justify-center text-[#33251F]">
            <span className="font-serif text-xl font-bold">YK</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#33251F] mb-3">
            Collection Not Found
          </h1>
          <p className="text-xs text-[#6B5549] leading-relaxed mb-6">
            The requested menswear collection is unavailable or has been archived.
          </p>
          <FashionButton to={ROUTES.COLLECTIONS} variant="dark" size="md">
            View All Collections
          </FashionButton>
        </Container>
      </div>
    );
  }

  // Filter products by collection
  const collectionProducts = PRODUCTS.filter((p) => p.collection === collection.slug);
  const otherCollections = COLLECTIONS.filter((c) => c.slug !== collection.slug).slice(0, 2);

  const handleOpenQuickView = (product) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  return (
    <div className="bg-[#FAF7F2] text-[#4A3A32] min-h-screen">
      {/* =========================================================================
          COLLECTION HERO: EDITORIAL ART DIRECTION
          ========================================================================= */}
      <section
        style={{ backgroundColor: collection.palette?.bg || '#EADFD4' }}
        className="py-12 sm:py-20 border-b border-[#D8C8BA] transition-colors"
      >
        <Container>
          {/* Breadcrumb */}
          <nav className="text-[11px] sm:text-xs uppercase tracking-wider text-[#6B5549] mb-8 flex items-center space-x-2">
            <Link to={ROUTES.HOME} className="hover:text-[#33251F] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to={ROUTES.COLLECTIONS} className="hover:text-[#33251F] transition-colors">
              Collections
            </Link>
            <span>/</span>
            <span className="text-[#33251F] font-bold">{collection.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-4"
            >
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-[#FAF7F2]/95 text-[10px] uppercase tracking-wider font-semibold text-[#4A3A32] rounded-lg shadow-xs">
                  {collection.season}
                </span>
                <span className="text-xs text-[#6B5549] font-medium">
                  • {collectionProducts.length} Curated Pieces
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#33251F] leading-tight">
                {collection.name}
              </h1>

              <p className="text-xs sm:text-sm text-[#6B5549] leading-relaxed max-w-lg">
                {collection.description}
              </p>

              <div className="pt-2">
                <a
                  href="#collection-products"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#4A3A32] hover:bg-[#33251F] text-[#FAF7F2] rounded-xl text-xs uppercase tracking-wider font-bold transition-colors shadow-sm"
                >
                  <span>Shop Collection</span>
                  <AnimatedArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Right Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-6"
            >
              <div className="aspect-[16/10] sm:aspect-[16/9] bg-[#FFFFFF] rounded-3xl p-3 border border-[#E4D7CC] shadow-xl overflow-hidden">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-[#FAF7F2]">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          COLLECTION PRODUCTS GRID
          ========================================================================= */}
      <section id="collection-products" className="py-14 sm:py-20 bg-[#FAF7F2]">
        <Container>
          <div className="flex items-center justify-between pb-6 mb-10 border-b border-[#E4D7CC]">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#8B7768] font-bold block mb-1">
                Wardrobe Edit
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#33251F]">
                Pieces in This Collection
              </h2>
            </div>

            <span className="text-xs text-[#8B7768]">
              {collectionProducts.length} {collectionProducts.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>

          <ProductGrid
            products={collectionProducts}
            onQuickView={handleOpenQuickView}
            showFeaturedSpan={true}
            emptyMessage="No pieces currently available in this specific collection."
          />
        </Container>
      </section>

      {/* =========================================================================
          OTHER COLLECTIONS TO EXPLORE
          ========================================================================= */}
      {otherCollections.length > 0 && (
        <section className="py-14 sm:py-20 border-t border-[#E4D7CC] bg-[#F5EFE8]">
          <Container>
            <div className="flex items-center justify-between pb-6 mb-10 border-b border-[#D8C8BA]">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#8B7768] font-bold block mb-1">
                  Discover More
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#33251F]">
                  Other Collections
                </h3>
              </div>

              <Link
                to={ROUTES.COLLECTIONS}
                className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-bold text-[#4A3A32] hover:text-[#33251F] transition-colors"
              >
                <span>All Collections</span>
                <AnimatedArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherCollections.map((col) => (
                <CollectionCard key={col.id} collection={col} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={quickViewOpen}
        onClose={handleCloseQuickView}
      />
    </div>
  );
};

export default CollectionDetailPage;
