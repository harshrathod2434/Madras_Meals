import React from 'react';

const About = () => {
  return (
    <section id="about" className="bg-white py-16 px-6">
      <div className="  r">
        
        {/* Text */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">About Us</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            At <span className="font-semibold text-blue-600">Madras Meals</span>, we bring you the comforting flavors of South India, served hot with love and tradition. From crispy dosas to soul-soothing sambhar, every dish is crafted from handpicked ingredients and age-old recipes.
          </p>
          <p className="mt-4 text-gray-600 text-lg leading-relaxed">
            Whether it's breakfast, lunch, or dinner — we've got a plate ready for you. Come hungry, leave happy!
          </p>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <img
            src={`${process.env.PUBLIC_URL}/images/about.jpg`}
            alt="About Madras Meals"
            className="rounded-2xl shadow-lg w-full max-w-md object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default About;
