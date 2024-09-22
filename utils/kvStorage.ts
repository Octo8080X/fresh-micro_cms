const kv = await Deno.openKv();

const WEB_CACHE_VERSION = "web-cache-version" as const;

export async function getCacheVersion() {
  const version = await kv.get<string>([WEB_CACHE_VERSION]);
  if (!version.value) {
    console.log(`${WEB_CACHE_VERSION} not found`);
    const newVersion = crypto.randomUUID();
    await setCacheVersion(newVersion);
    return newVersion;
  }

  return version.value;
}

export async function setCacheVersion(version: string) {
  return await kv.set([WEB_CACHE_VERSION], version, { expireIn: 10 * 1000 });
}
