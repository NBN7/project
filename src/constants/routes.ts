export const ROUTES = Object.freeze({
  AUTH: "/auth",
  DOCS: {
    INTRODUCTION: "/docs",
    USAGE: "/docs/usage",
  },
  HOME: "/",
  TRANSACTIONS: {
    ROOT: "/transactions",
    CREATE: "/transactions/create",
  },
  PROFILE: "/profile",
  DASHBOARD: "/dashboard",
} as const);
