import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUserRoles from "../../../../hooks/useUserRoles";

const NoticeBoardEmp = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { userObject } = useUserRoles();
  const { data: notices = [] } = useQuery({
    queryKey: ["notices", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/addNoticeForEmployee/${userObject?.hrEmail}`
      );
      return res.data;
    },
  });

  if (notices.length === 0) {
    return (
      <div className="my-10 p-6 rounded-lg shadow-lg max-w-full sm:max-w-xl mx-auto overflow-hidden">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
          Notices for You
        </h2>
        <p className="text-center text-red-500 text-lg">No Notices to Show</p>
      </div>
    );
  }

  return (
    <div className="p-6 my-10 ">
      <h1 className="text-3xl font-semibold mb-6 text-center text-blue-600">
        Notices for You
      </h1>
      {notices.length === 0 ? (
        <p className="text-center">No notices available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notices.map((notice) => (
            <div key={notice._id} className=" shadow-md p-4 rounded-md border">
              <h2 className="text-xl font-semibold text-blue-600">
                {notice.title}
              </h2>
              <p className="">{notice.description}</p>
              <p className="text-sm  mt-2">
                Posted on: {new Date(notice.postedDate).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoticeBoardEmp;
