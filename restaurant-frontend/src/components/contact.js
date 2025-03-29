import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="bg-gray-100 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h2>

        <p className="text-gray-600 text-lg mb-4">
          We'd love to hear from you! Whether it's a query, feedback, or a dosa craving — we’re here.
        </p>

        <div className="mt-6 space-y-3 text-gray-700 text-md">
          <p><strong>📍 Address:</strong> 123 Tiffin Street, Mulund, Mumbai</p>
          <p><strong>📞 Phone:</strong> +91 98765 43210</p>
          <p><strong>✉️ Email:</strong> contact@madrasmeals.in</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
