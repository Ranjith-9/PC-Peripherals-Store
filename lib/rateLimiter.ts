import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";
import { LIMITS } from "./rateLimits";

const createLimiter = (config: {
  requests: number;
  window: `${number} ${"s" | "m" | "h"}`;
}) =>
  new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(config.requests, config.window),
    analytics: true,
    prefix: "ratelimit",
  });

export const rateLimiters = {
  products: createLimiter(LIMITS.PRODUCTS),
  userRead: createLimiter(LIMITS.USER_READ),
  adminWrite: createLimiter(LIMITS.ADMIN_WRITE),
  payment: createLimiter(LIMITS.PAYMENT),
};
