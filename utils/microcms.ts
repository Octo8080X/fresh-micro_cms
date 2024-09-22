import { createClient } from "microcms-js-sdk";
import { CONSTS } from "./consts.ts";
import { convert } from "html-to-text";

export type News = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
  createdAt: string;
  revisedAt: string;
  category: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
  };
};

export function getMicroCmsClient() {
  return createClient({
    serviceDomain: CONSTS.microCms.serviceDomain,
    apiKey: CONSTS.microCms.apiKey,
  });
}

export async function getNewsList() {
  const client = getMicroCmsClient();
  try {
    const res = await client.get<{ contents: News[] }>({ endpoint: "news" });
    return {
      status: true,
      contents: res.contents,
    };
  } catch (e) {
    console.error(e);
    return {
      status: true,
      contents: [],
    };
  }
}

export async function getNews(id: string) {
  const client = getMicroCmsClient();
  try {
    const res = await client.get<News>({ endpoint: "news", contentId: id });
    return {
      status: true,
      contents: res,
    };
  } catch (e) {
    console.error(e);
    return {
      status: false,
      contents: {},
    };
  }
}

// html に含まれる microを取得対象にされている cms のリソースのドメインを変換する
export function resourceDomainConvert(src: string) {
  const regex = new RegExp(`https://images.microcms-assets.io/`, "g");
  return src.replace(regex, "/api/resource/");
}

export function resourceDomainConvertBack(src: string) {
  const regex = new RegExp(`/api/resource/`, "g");
  return src.replace(regex, "https://images.microcms-assets.io/");
}

export function contentDigest(src: string) {
  const text = convert(src);
  return text.slice(0, 50);
}
