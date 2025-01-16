import React, { useState } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://via.placeholder.com/800x400?text=Join+as+HR+Manager",
      buttonText: "Join as HR Manager",
      buttonAction: () => {
        <Link to="/joinAsHRManager">Join as HR Manager</Link>
      },
    },
    {
      id: 2,
      image: "https://via.placeholder.com/800x400?text=Join+as+Employee",
      buttonText: "Join as Employee",
      buttonAction: () => {
        <Link to="/joinAsHRManager">Join as Employee</Link>
      },
    },
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-8">
      <div className="relative overflow-hidden">
        <div
          className="w-full h-64 flex items-center justify-center bg-gray-200"
          style={{
            backgroundImage: `url(${slides[currentSlide].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <button
            onClick={slides[currentSlide].buttonAction}
            className="bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {slides[currentSlide].buttonText}
          </button>
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={handlePrevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        &#9664;
      </button>
      <button
        onClick={handleNextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        &#9654;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-blue-500" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Banner;