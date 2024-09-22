import { FreshContext, PageProps } from "$fresh/server.ts";
import {
  contentDigest,
  getNewsList,
  News,
  resourceDomainConvert,
} from "../utils/microcms.ts";
import { getWebCache } from "../utils/webCache.ts";

interface Data {
  newsList: News[];
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

    const newsListRes = await getNewsList();

    const res = await ctx.render({
      newsList: newsListRes.contents,
    });

    res.headers.set("Expires", new Date(Date.now() + 10 * 1000).toUTCString());

    await cache.put(req.url, res.clone());

    return res;
  },
};

export default function Home(props: PageProps<Data>) {
  return (
    <div class="px-4 py-8 mx-auto">
      <h1 class="text-2xl font-bold">News</h1>
      <div class="">
        {props.data.newsList.map((news) => {
          return (
            <>
              <a href={`/news/${news.id}`}>
                <div class="card bg-base-100 w-full shadow-xl">
                  <div class="card-body">
                    <h2 class="card-title">{news.title}</h2>
                    <p class="ml-5">{contentDigest(news.content)}...</p>
                  </div>
                </div>
              </a>
            </>
          );
        })}
      </div>
    </div>
  );
}
