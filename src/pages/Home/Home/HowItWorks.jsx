const HowItWorks = () => {
    const steps = [
      {
        title: "Sign Up",
        description: "Create your account and get access to asset management tools.",
        icon: "📝",
      },
      {
        title: "Request Assets",
        description: "Employees can request assets, and managers can approve them.",
        icon: "📦",
      },
      {
        title: "Track & Manage",
        description: "Easily track assigned assets and return them when needed.",
        icon: "📍",
      },
    ];
  
    return (
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="p-6 border rounded-lg shadow-md">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default HowItWorks;
  