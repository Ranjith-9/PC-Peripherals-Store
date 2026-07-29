// lib/rateLimits.ts

export const LIMITS = {
  PRODUCTS: {
    requests: 100, //100
    window: "1 m",
  },

  USER_READ: {
    requests: 60, //60
    window: "1 m",
  },

  ADMIN_WRITE: {
    requests: 20, //20
    window: "1 m",
  },

  PAYMENT: {
    requests: 5, //5
    window: "1 m",
  },
} as const;
