import { useState } from "react";

const Testimonials = () => {
  const testimonials = [
    { name: "John Doe", text: "This system has made asset management so much easier!" },
    { name: "Jane Smith", text: "A great platform for tracking and managing requests." },
    { name: "Alex Johnson", text: "Highly recommended for businesses with large inventories." },
  ];

  const [current, setCurrent] = useState(0);

  const nextTestimonial = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-12  text-center">
      <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
      <div className="p-6 border rounded shadow-md max-w-lg mx-auto">
        <p className="text-lg italic">"{testimonials[current].text}"</p>
        <h4 className="font-semibold mt-2">{testimonials[current].name}</h4>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={nextTestimonial}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
