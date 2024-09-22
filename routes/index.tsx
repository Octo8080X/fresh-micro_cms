import { FreshContext, PageProps } from "$fresh/server.ts";
import { Pagination } from "../components/Pagination.tsx";
import { CONSTS } from "../utils/consts.ts";
import { contentDigest, getNewsList, News } from "../utils/microcms.ts";
import { getWebCache } from "../utils/webCache.ts";

interface Data {
  newsList: News[];
  currentPage: number;
  totalCount: number;
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

    const page = Number(ctx.url.searchParams.get("page")) || 1;

    const newsListRes = await getNewsList(page);
    if (!newsListRes.status) {
      return ctx.renderNotFound({});
    }

    const res = await ctx.render({
      newsList: newsListRes.contents,
      currentPage: page,
      totalCount: newsListRes.totalCount,
    });

    res.headers.set(
      "Expires",
      new Date(Date.now() + CONSTS.microCms.contentsExpiresIn * 1000)
        .toUTCString(),
    );

    await cache.put(req.url, res.clone());

    return res;
  },
};

export default function Home(props: PageProps<Data>) {
  return (
    <div class="px-8 py-8 mx-auto">
      <h1 class="text-2xl font-bold">News</h1>
      <div class="px-4">
        {props.data.newsList.map((news) => {
          return (
            <div class="mb-2">
              <a href={`/news/${news.id}`}>
                <div class="card bg-base-100 w-full shadow-xl">
                  <div class="card-body">
                    <h2 class="card-title">{news.title}</h2>
                    <p class="ml-5">{contentDigest(news.content)}...</p>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
      <div class="flex justify-center">
        <Pagination
          baseUrl={"/"}
          currentPage={props.data.currentPage}
          totalCount={props.data.totalCount}
        >
        </Pagination>
      </div>
    </div>
  );
}
