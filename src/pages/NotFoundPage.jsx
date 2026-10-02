import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import { ROUTES } from '../utils/constants';

/**
 * 404 Not Found Page Foundation
 */
export const NotFoundPage = () => {
  return (
    <div className="py-24">
      <Container className="text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#557373] font-semibold">
          Error 404
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-[#0D0D0D]">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#557373] max-w-md mx-auto">
          The page or garment you are looking for does not exist in our current catalog.
        </p>
        <div className="pt-4">
          <Link
            to={ROUTES.HOME}
            className="inline-block px-8 py-3 bg-[#0D0D0D] text-[#F2EFEA] text-xs uppercase tracking-widest font-semibold hover:bg-[#272401] transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default NotFoundPage;
