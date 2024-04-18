const baseUrl = "http://localhost:3000/api";

export const URLS = {
  AUTH: {
    LOGIN: `${baseUrl}/user/login`,
    REGISTER: `${baseUrl}/user/register`,
  },
  USER: {
    GET_ALL_USERS: `${baseUrl}/user`,
  },
};
