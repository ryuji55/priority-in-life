export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PASSWORD: {
    FORGOT: "/password/forgot",
    RESET: "/password/reset/:token",
  },
  AUTH: {
    ROOT: "/auth",
    TODO: "/auth/todo",
  },
} as const;
