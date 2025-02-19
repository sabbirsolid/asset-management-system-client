const AssetUsagePolicy = () => {
    return (
      <div className="p-6 border rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">Asset Usage Policy</h2>
        <p className="mb-4 text-center">Ensure responsible usage of company assets by following these guidelines:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Policy Section */}
          <div className="p-4 border rounded-md shadow-sm">
            <h3 className="font-semibold text-lg mb-2">General Rules</h3>
            <ul className="list-disc pl-4 space-y-2 text-sm">
              <li>✅ Company assets should be used for work-related purposes only.</li>
              <li>✅ Do not install unauthorized software on company devices.</li>
              <li>✅ Keep assets in good condition and report damages immediately.</li>
            </ul>
          </div>
  
          {/* Security & Compliance */}
          <div className="p-4 border rounded-md shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Security & Compliance</h3>
            <ul className="list-disc pl-4 space-y-2 text-sm">
              <li>✅ Always lock your workstation when leaving your desk.</li>
              <li>✅ Avoid using company devices for personal activities.</li>
              <li>✅ Ensure regular updates and security patches are applied.</li>
            </ul>
          </div>
  
          {/* Asset Return Policy */}
          <div className="p-4 border rounded-md shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Asset Return Policy</h3>
            <ul className="list-disc pl-4 space-y-2 text-sm">
              <li>✅ All assets must be returned upon resignation or termination.</li>
              <li>✅ Lost or damaged assets must be reported to IT support immediately.</li>
              <li>✅ Employees are responsible for the proper handling of assets.</li>
            </ul>
          </div>
  
          {/* IT Support & Assistance */}
          <div className="p-4 border rounded-md shadow-sm">
            <h3 className="font-semibold text-lg mb-2">IT Support & Assistance</h3>
            <ul className="list-disc pl-4 space-y-2 text-sm">
              <li>✅ Contact IT support for troubleshooting and assistance.</li>
              <li>✅ Report any cybersecurity threats or suspicious activities.</li>
              <li>✅ Follow IT guidelines for software installations and updates.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default AssetUsagePolicy;
  