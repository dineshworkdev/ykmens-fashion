import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import { ROUTES } from '../utils/constants';

/**
 * 404 Not Found Page Foundation
 */
export const NotFoundPage = () => {
  return (
    <div className="py-24 bg-[#241812] text-[#FAF7F2] min-h-[60vh] flex items-center">
      <Container className="text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#D99E84] font-semibold">
          Error 404
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-[#FAF7F2]">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#C8B8AA] max-w-md mx-auto">
          The page or garment you are looking for does not exist in our current catalog.
        </p>
        <div className="pt-4">
          <Link
            to={ROUTES.HOME}
            className="inline-block px-8 py-3 bg-[#FAF7F2] text-[#1D1410] text-xs uppercase tracking-widest font-semibold hover:bg-[#E8DEC8] transition-colors rounded-xl shadow-md"
          >
            Return to Home
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default NotFoundPage;
