/// <reference lib="deno.unstable" />

import { CONSTS } from "./consts.ts";

const WEB_CACHE_VERSION = "web-cache-version" as const;

async function getKvStorage() {
  return await Deno.openKv();
}

export async function getCacheVersion() {
  const version = await (await getKvStorage()).get<string>([WEB_CACHE_VERSION]);
  if (!version.value) {
    console.log(`${WEB_CACHE_VERSION} not found`);
    const newVersion = crypto.randomUUID();
    await setCacheVersion(newVersion);
    return newVersion;
  }

  return version.value;
}

export async function setCacheVersion(version: string) {
  return await (await getKvStorage()).set([WEB_CACHE_VERSION], version, { expireIn: CONSTS.microCms.contentsExpiresIn * 1000 });
}
