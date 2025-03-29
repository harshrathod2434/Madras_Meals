import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-16">
      <p className="text-sm">
        © {new Date().getFullYear()} Madras Meals. All rights reserved.
      </p>
      <p className="text-xs mt-1">Crafted with ❤️ in Mumbai</p>
    </footer>
  );
};

export default Footer;
