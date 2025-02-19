const QuickTips = () => {
  return (
    <section className="p-6 mb-5 w-full md:w-11/12 mx-auto text-center shadow-lg rounded-lg ">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">Quick Tips for Efficient Asset Management</h2>
      <ul className="list-disc space-y-2  mx-auto max-w-2xl text-left">
        <li>Always double-check your asset request details before submitting.</li>
        <li>Regularly review your assigned assets and ensure their timely return.</li>
        <li>For any asset-related issues, contact HR directly through the portal.</li>
        <li>Utilize the 'Asset Overview' section for an up-to-date view of your assets.</li>
        <li>Review and update your requests to ensure accurate records of asset statuses.</li>
      </ul>
      <p className="mt-4 text-sm ">
        Stay organized, stay efficient, and manage your assets with ease!
      </p>
    </section>
  );
};

export default QuickTips;
