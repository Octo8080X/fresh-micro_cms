import { getCacheVersion, updateCacheVersion } from "./kvStorage.ts";

export async function getWebCache() {
  return await caches.open(await getCacheVersion());
}

export async function updateWebCache() {
  await updateCacheVersion()
}