import useUserRoles from "../../../../hooks/useUserRoles";

const ITSupport = () => {
    const {  userObject } = useUserRoles();
    return (
      <div className="p-6 border rounded-lg shadow-md lg:w-1/2 mx-auto">
        <h2 className="text-xl font-bold mb-4">IT Support & Guidelines</h2>
        <p>Need help with your assigned assets or software issues?</p>
        <ul className="list-disc pl-4 space-y-2">
          <li>💻 Submit a support ticket via the IT Helpdesk.</li>
          <li>📞 Call IT support at +1-800-555-1234.</li>
          <li className="lowercase">📧 {`it-support@${userObject.company}.com`}</li>
        </ul>
      </div>
    );
  };
  
  export default ITSupport;
  