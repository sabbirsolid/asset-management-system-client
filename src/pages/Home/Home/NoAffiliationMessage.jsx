const NoAffiliationMessage = () => {
  return (
    <div className="flex justify-center items-center my-10 50">
      <div className=" p-6 rounded-lg shadow-xl w-full sm:w-96">
        <h2 className="text-2xl font-semibold -800 mb-4">
          No Company Affiliation
        </h2>
        <p className="text-lg -600 mb-6">
          It looks like you don't have an affiliation with any company. Please
          contact your HR department to complete the affiliation process.
        </p>
        <div className="text-center">
          <button
            className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoAffiliationMessage;
