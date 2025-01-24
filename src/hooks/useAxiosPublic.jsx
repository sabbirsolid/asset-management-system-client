import axios from "axios";
// https://asset-management-system-server-drab.vercel.app
// https://asset-management-system-server-drab.vercel.app
const axiosPublic = axios.create({
  baseURL: "https://asset-management-system-server-drab.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
