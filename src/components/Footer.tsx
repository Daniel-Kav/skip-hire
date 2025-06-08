import React from 'react';
// import { DISCLAIMER_TEXT } from '@/constants';

interface FooterProps {
  isSticky?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isSticky = false }) => {
  const footerClasses = isSticky 
    ? 'fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 shadow-lg z-40'
    : 'bg-gray-800 border-t border-gray-700 mt-12';

  return (
    <footer className={footerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className={isSticky ? 'border-t border-gray-700 pt-2 sm:pt-0' : 'text-center'}>
          <p className="text-xs text-gray-500 leading-relaxed">
            {/* {DISCLAIMER_TEXT} */}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
