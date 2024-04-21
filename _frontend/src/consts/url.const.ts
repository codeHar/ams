const baseUrl = "http://localhost:3000/api";

export const URLS = {
  AUTH: {
    LOGIN: `${baseUrl}/user/login`,
    REGISTER: `${baseUrl}/user/register`,
  },
  USER: {
    GET_ALL_USERS: `${baseUrl}/user`,
    CREATE_USER: `${baseUrl}/user`,
    QUERY_BY_ID: (id: string) => `${baseUrl}/user/${id}`,
  },
  ARTIST: {
    GET_ALL_ARTISTS: `${baseUrl}/artist`,
    CREATE_ARTIST: `${baseUrl}/artist`,
    QUERY_BY_ID: (id: string) => `${baseUrl}/artist/${id}`,
  },
};
