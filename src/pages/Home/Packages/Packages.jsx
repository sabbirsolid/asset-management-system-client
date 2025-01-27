import usePackages from "../../../hooks/usePackages";
const Packages = () => {
  const { packages, isLoading} = usePackages();

  if (isLoading) {
    return <span className="loading loading-infinity loading-lg"></span>;
  }
  return (
    <div className="py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Our Packages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {packages?.map((pkg, index) => (
            <div
              key={index}
              className=" p-6 shadow-lg rounded-lg border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-4">{pkg.title}</h3>
              <p className="text-lg font-bold text-blue-500 mb-4">
                ${pkg.price}
              </p>
              <p className=" mb-4">{pkg.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;
