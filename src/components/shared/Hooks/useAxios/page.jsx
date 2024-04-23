import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:3001",
  // baseURL:'https://vitality-commune-server.vercel.app'
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;