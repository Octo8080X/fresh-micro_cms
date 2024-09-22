import { FreshContext, PageProps } from "$fresh/server.ts";
import { getWebCache } from "../../../utils/webCache.ts";
import { resourceDomainConvertBack } from "../../../utils/microcms.ts";

export const handler = {
  GET: async function (req: Request, _ctx: FreshContext) {
    const cache = await getWebCache();
    const cached = await cache.match(req.url);
    if (cached) {
      console.log(`cache hit ${req.url}`);
      return cached;
    }
    console.log(`cache miss ${req.url}`);

    const res = await fetch(
      resourceDomainConvertBack(new URL(req.url).pathname),
    );

    const blob = await res.blob();

    const newResponse = new Response(blob, {
      headers: {
        ...res.headers,
        "Expires": new Date(Date.now() + 10 * 1000).toUTCString(),
      },
    });

    await cache.put(req.url, newResponse.clone());

    return newResponse;
  },
};
