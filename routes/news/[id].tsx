import { FreshContext, PageProps } from "$fresh/server.ts";
import { getNews, News, resourceDomainConvert } from "../../utils/microcms.ts";
import { getWebCache } from "../../utils/webCache.ts";

interface Data {
  news: News;
}

export const handler = {
  GET: async function (req: Request, ctx: FreshContext) {
    const cache = await getWebCache();

    const cached = await cache.match(req.url);
    if (cached) {
      console.log(`cache hit ${req.url}`);
      return cached;
    }
    console.log(`cache miss ${req.url}`);

    const newsRes = await getNews(ctx.params.id);

    if (!newsRes.status) {
      return ctx.renderNotFound({});
    }

    const res = await ctx.render({
      news: newsRes.contents,
    });

    res.headers.set("Expires", new Date(Date.now() + 10 * 1000).toUTCString());

    await cache.put(req.url, res.clone());

    return res;
  },
};

export default function Home(props: PageProps<Data>) {
  return (
    <div class="px-4 py-8 mx-auto">
      <h1 class="text-2xl font-bold"></h1>
      <div class="">
      </div>
      <div class="card bg-base-100 w-full shadow-xl">
        <div class="card-body">
          <h2 class="card-title">{props.data.news.title}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: resourceDomainConvert(props.data.news.content),
            }}
          />
        </div>
      </div>
    </div>
  );
}
