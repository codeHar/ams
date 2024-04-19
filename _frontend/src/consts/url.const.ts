const baseUrl = "http://localhost:3000/api";

export const URLS = {
  AUTH: {
    LOGIN: `${baseUrl}/user/login`,
    REGISTER: `${baseUrl}/user/register`,
  },
  USER: {
    GET_ALL_USERS: `${baseUrl}/user`,
  },
  ARTIST: {
    GET_ALL_ARTISTS: `${baseUrl}/artist`,
    CREATE_ARTIST: `${baseUrl}/artist`,
    GET_ARTIST: (id: string) => `${baseUrl}/artist/${id}`,
  },
};
