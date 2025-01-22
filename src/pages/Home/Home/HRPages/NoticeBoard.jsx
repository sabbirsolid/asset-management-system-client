import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const NoticeBoard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const {
    data: notices = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["notices", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/addNotice/${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    const notice = {
      id: id,
      email: user?.email,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
      axiosSecure.delete(`/deleteNotice/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "The member has been removed.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  if (isLoading) {
    return <p>Loading notices...</p>;
  }

  return (
    <div className="p-6 my-10">
      <h1 className="text-2xl text-center font-bold mb-4">
        Your Posted Notices
      </h1>
      {notices.length === 0 ? (
        <p>No notices available.</p>
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
              <button
                onClick={() => handleDelete(notice._id)}
                className="btn btn-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;
