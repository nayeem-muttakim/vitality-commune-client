"use client";
import axios from "axios";
import { signOut } from "firebase/auth";
import { redirect } from "next/navigation";

const axiosSecure = axios.create({
  // baseURL: "http://localhost:3001",
  baseURL:'https://vitality-commune-server.vercel.app'
});
const useAxiosSecure = () => {
  // request interceptors to add authorization for every secure call
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");

      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  //  intercepts 401,403 status
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const status = error.response.status;
      console.log(status);
      // logout user and navigate to login
      if (status === 401 || status === 403) {
        await signOut();
        redirect("/SignIn");
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
