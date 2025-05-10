const TOKEN_KEY = "acess_token";

const storage = {
  setToken(accessToken: string) {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(TOKEN_KEY, accessToken);
    } else {
      console.error("localStorage is not available");
    }
  },
  getToken(): string | null {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem(TOKEN_KEY);
    } else {
      console.error("localStorage is not available");
      return null;
    }
  },
};

export default storage;