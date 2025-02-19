const WhyChooseUs = () => {
    const features = [
      {
        title: "Easy Asset Tracking",
        description: "Monitor and manage all assets in one place with real-time tracking.",
        icon: "📊",
      },
      {
        title: "Seamless Requests",
        description: "Request assets effortlessly and track approval status with ease.",
        icon: "📋",
      },
      {
        title: "Secure & Reliable",
        description: "Your data is protected with top-notch security and encryption.",
        icon: "🔒",
      },
      {
        title: "User-Friendly Dashboard",
        description: "A simple and intuitive interface for both employees and admins.",
        icon: "🚀",
      },
    ];
  
    return (
      <section className="py-12 ">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="p-6  shadow-md rounded-lg">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default WhyChooseUs;
  