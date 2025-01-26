import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUserRoles from "../../../../hooks/useUserRoles";

const NoticeBoardEmp = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { userObject } = useUserRoles();
  const { data: notices = [], isLoading } = useQuery({
    queryKey: ["notices", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/addNoticeForEmployee/${userObject?.hrEmail}`);
      return res.data;
    },
  });

 

  return (
    <div className="p-6 my-10">
      <h1 className="text-2xl text-center font-bold mb-4">
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
