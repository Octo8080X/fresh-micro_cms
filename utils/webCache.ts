import { getCacheVersion } from "./kvStorage.ts";

export async function getWebCache() {
  return await caches.open(await getCacheVersion());
}
