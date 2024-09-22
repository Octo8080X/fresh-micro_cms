/// <reference lib="deno.unstable" />

import { CONSTS } from "./consts.ts";

const WEB_CACHE_VERSION = "web-cache-version-1" as const;

async function getKvStorage() {
  return await Deno.openKv();
}

export async function getCacheVersion() {
  const kvStorage = await getKvStorage();
  const version = await kvStorage.get<string>([WEB_CACHE_VERSION]);

  if (!version.value) {
    console.log(`${WEB_CACHE_VERSION} not found`);
    const newVersion = crypto.randomUUID();
    await setCacheVersion(newVersion);
    return newVersion;
  }
  console.log(`${WEB_CACHE_VERSION} found: ${version.value}`);

  return version.value;
}

export async function setCacheVersion(version: string) {
  const kvStorage = await getKvStorage();
  return await kvStorage.set([WEB_CACHE_VERSION], version, {
    expireIn: CONSTS.microCms.contentsExpiresIn * 1000,
  });
}

export async function updateCacheVersion() {
  const newVersion = crypto.randomUUID();
  await setCacheVersion(newVersion);
  return newVersion;
} 