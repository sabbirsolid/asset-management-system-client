const KeyFeatures = () => {
    const features = [
      { title: "Asset Tracking", description: "Easily track all assets in one place." },
      { title: "Request Management", description: "Manage asset requests efficiently." },
      { title: "Approval System", description: "Approve or reject asset requests with ease." },
      { title: "Reports & Analytics", description: "Generate insightful reports on assets." },
    ];
  
    return (
      <section className="py-12 ">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="p-6  rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className=" mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default KeyFeatures;
  