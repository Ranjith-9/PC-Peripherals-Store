import { redis } from "@/lib/redis";

export async function getCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number,
): Promise<T> {
  console.time("redis-get");

  const cached = await redis.get<T>(key);
  console.timeEnd("redis-get");
  if (cached !== null) {
    console.log("cache hit");
    return cached;
  }

  const data = await fetcher();

  await redis.set(key, data, {
    ex: ttl,
  });
  console.log("cache set");
  return data;
}

export async function invalidateCache(...keys: string[]) {
  if (keys.length > 0) {
    await redis.del(...keys);
  }
}
