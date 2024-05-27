export const ROUTES = Object.freeze({
  AUTH: "/auth",
  DOCS: {
    ROOT: "/docs",
    USAGE: "/docs/usage",
  },
  HOME: "/",
  TRANSACTIONS: {
    ROOT: "/transactions",
    CREATE: "/transactions/create",
  },
  GOALS: {
    ROOT: "/goals",
    CREATE: "/goals/create",
  },
  PROFILE: "/profile",
  DASHBOARD: "/dashboard",
} as const);
