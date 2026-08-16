import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container-premium py-16 text-center">
      <div className="max-w-lg mx-auto">
        <h1 className="text-6xl font-playfair font-bold text-gold-500">404</h1>
        <h2 className="text-3xl font-playfair font-bold text-navy-800 mt-4">Page Not Found</h2>
        <p className="text-navy-600 mt-4">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8 space-x-4">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-navy-800 text-white rounded-lg hover:bg-navy-700 transition-colors"
          >
            Go Home
          </Link>
          <Link
            to="/contact"
            className="inline-block px-6 py-3 border border-navy-800 text-navy-800 rounded-lg hover:bg-navy-50 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
