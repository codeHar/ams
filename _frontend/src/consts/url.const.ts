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
    GET_MUSIC: (id: string) => `${baseUrl}/artist/${id}/music`,
    EXPORT_CSV: `${baseUrl}/artist/export-csv`,
    IMPORT_CSV: `${baseUrl}/artist/import-csv`,
  },
  MUSIC: {
    BASE_URL: `${baseUrl}/music`,
    QUERY_BY_ID: (id: string) => `${baseUrl}/music/${id}`,
  },
};
