import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import your assets
// Card 1 asset
import Logo from './asset_lightTheme/logo.svg'; // Assuming this is the path to your logo

// Card 2 assets
import lightHero2 from './asset_lightTheme/light_hero_1.png';
import darkHero2 from './asset_darkTheme/dark_hero_2.png';

// Card 3 assets
import lightHero3 from './asset_lightTheme/light_hero_3.png';
import darkHero3 from './asset_darkTheme/dark_hero_3.png';

// Card 4 assets
import lightHero4 from './asset_lightTheme/light_hero_4.png';
import darkHero4 from './asset_darkTheme/dark_hero_4.png';

const slides = [
  {
    id: 1,
    type: 'original',
    content: {
      title: (
        <>
          Welcome to <span className="text-amber-300">intelliDGA</span>
        </>
      ),
      description:
        'Smart Dissolved Gas Analysis for Power Transformers & Reactors. Empowering you with insights, predictions, and monitoring tools to ensure grid reliability.',
    },
  },
  {
    id: 2,
    type: 'image_background',
    content: {
      title: 'Ignite Innovation',
      description:
        'Intelligent DGA for Transforming Transformer Dissolve Gas Analysis for Early Fault Detection.',
    },
    images: {
      light: lightHero2,
      dark: darkHero2,
    },
  },
  {
    id: 3,
    type: 'image_background',
    content: {
      title: 'Revolutionizing DGA',
      description:
        'Integrating Conventional DGA with Advanced Machine Learning for Precise Fault Detection by Analyzing the Dissolve Gas in Transformer Oil.',
    },
    images: {
      light: lightHero3,
      dark: darkHero3,
    },
  },
  {
    id: 4,
    type: 'image_background',
    content: {
      title: 'AI-Driven Insights',
      description:
        'Our innovative approach transforms conventional DGA analysis by coupling classic interpretation methods with state-of-the-art machine learning. By integrating techniques such as the Duval Triangle, Doernenburg Ratio, and IEC Ratio with robust algorithms like Random Forest, our solution offers a diagnostic tool that adapts to varying transformer conditions and delivers fault detection with unprecedented precision. This fusion of traditional analytical methods and AI-driven insights provides a powerful, predictive maintenance strategy—ensuring enhanced reliability and optimized performance in critical power infrastructure.',
    },
    images: {
      light: lightHero4,
      dark: darkHero4,
    },
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatic transition logic
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 7000); // Change slide every 7 seconds

    return () => clearInterval(slideInterval); // Cleanup interval on component unmount
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden">
      {/* Slides container */}
      <div className="w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: index === currentSlide ? 1 : 0,
              zIndex: index === currentSlide ? 10 : 0,
            }}
          >
            {/* Card 1: Original Design */}
            {slide.type === 'original' && (
              <div className="w-full h-full flex-grow relative flex-1 bg-[#1f75fe]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col md:flex-row items-center gap-10 text-white">
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                      {slide.content.title}
                    </h1>
                    <p className="mt-4 text-lg text-blue-100">
                      {slide.content.description}
                    </p>
                    <div className="mt-8 flex justify-center md:justify-start gap-4">
                      <Link
                        to="/signup"
                        className="px-6 py-3 rounded-lg bg-white text-[#1f75fe] font-semibold hover:bg-blue-50 shadow"
                      >
                        Get Started
                      </Link>
                      <Link
                        to="/documentation"
                        className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <img
                      src={Logo}
                      alt="IntelliDGA Logo"
                      className="w-56 sm:w-72 md:w-80 drop-shadow-xl animate-pulse"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Cards 2, 3, 4: Image Background Design */}
            {slide.type === 'image_background' && (
              <>
                {/* Light theme background */}
                <div
                  className="absolute inset-0 bg-cover bg-center block dark:hidden"
                  style={{ backgroundImage: `url(${slide.images.light})` }}
                ></div>
                {/* Dark theme background */}
                <div
                  className="absolute inset-0 bg-cover bg-center hidden dark:block"
                  style={{ backgroundImage: `url(${slide.images.dark})` }}
                ></div>
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col items-center justify-center text-center text-white">
                  <div className="max-w-4xl">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow-lg">
                      {slide.content.title}
                    </h1>
                    <p className="mt-4 text-lg text-gray-200 drop-shadow-md ">
                      {slide.content.description}
                    </p>
                    <div className="mt-8 flex justify-center gap-4 ">
                      {/* Light Theme Buttons */}
                      <div className="block dark:hidden">
                        <Link
                          to="/signup"
                          className="px-6 py-3 rounded-lg bg-white text-[#1f75fe] font-semibold hover:bg-gray-100 shadow-lg"
                        >
                          Get Started
                        </Link>
                        <Link
                          to="/documentation"
                          className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-lg"
                        >
                          Learn More
                        </Link>
                      </div>
                      {/* Dark Theme Buttons */}
                      <div className="hidden dark:block">
                        <Link
                          to="/signup"
                          className="px-6 py-3 rounded-lg bg-gray-100 dark:bg-gray-200 text-gray-900 font-semibold hover:bg-gray-300 shadow-lg"
                        >
                          Get Started
                        </Link>
                        <Link
                          to="/documentation"
                          className="px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 shadow-lg"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Manual Controls: Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 dark:bg-white/30 text-white hover:bg-black/50 dark:hover:bg-white/50 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 dark:bg-white/30 text-white hover:bg-black/50 dark:hover:bg-white/50 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'bg-white scale-125 dark:bg-blue-400'
                : 'bg-white/50 dark:bg-gray-400/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
