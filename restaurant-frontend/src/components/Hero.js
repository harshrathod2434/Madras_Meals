

import React from 'react';

const Hero = () => {
  return (
    <section
      className="bg-cover bg-center text-white h-[70vh] flex items-center justify-center text-center px-4"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/banner.jpg)`
      }}
    >
      {/* <div className="bg-black/60 p-8 rounded-xl backdrop-blur-sm">
                <h2 className="text-4xl font-bold mb-4">Welcome to Madras Meals</h2>
                <p className="text-lg font-medium max-w-xl mx-auto">
                    Authentic South Indian flavors, made with love. Taste the tradition in every bite.
                </p>
            </div> */}
    </section>
  );
};

export default Hero;

