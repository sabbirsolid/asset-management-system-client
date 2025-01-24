import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../../assets/1.png";
import img2 from "../../../assets/2.webp";

const Banner = () => {
  const slides = [
    {
      id: 1,
      image: img1,
      buttonText: "Join as HR Manager",
      buttonLink: "/joinAsHRManager",
    },
    {
      id: 2,
      image: img2,
      buttonText: "Join as Employee",
      buttonLink: "/joinAsEmployee",
    },
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-8">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={5000}
        transitionTime={500}
        emulateTouch
        dynamicHeight
        swipeable
        className="rounded-lg overflow-hidden"
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative">
            <img
              src={slide.image}
              alt={slide.buttonText}
              className="object-cover w-full h-64"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Link
                to={slide.buttonLink}
                className="relative inline-block text-lg group"
                style={{ bottom: "10%", position: "absolute" }} // Move the button downward
              >
                <span className="relative z-10 block px-4 py-2 overflow-hidden font-medium leading-tight text-white transition-colors duration-300 ease-out rounded-lg shadow-lg group-hover:text-yellow-600">
                  <span className="absolute inset-0 w-full h-full px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600"></span>
                  <span className="absolute inset-0 w-full h-full px-6 py-3 transition-all duration-300 ease-out transform translate-x-full group-hover:-translate-x-0 group-hover:scale-105 bg-white"></span>
                  <span className="relative">{slide.buttonText}</span>
                </span>
                <span
                  className="absolute bottom-0 right-0 block w-8 h-8 transition-transform duration-300 ease-out transform translate-x-3 translate-y-3 bg-white rounded-full group-hover:translate-x-0 group-hover:translate-y-0"
                ></span>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
