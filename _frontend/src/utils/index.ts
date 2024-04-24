import axios from "axios";

const auth = JSON.parse(localStorage.getItem("auth") ?? "");

console.log(typeof auth, auth);

export const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${auth?.token}`,
  },
});
