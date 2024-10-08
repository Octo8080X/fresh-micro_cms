// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_resource_path_ from "./routes/api/resource/[...path].ts";
import * as $api_update from "./routes/api/update.ts";
import * as $index from "./routes/index.tsx";
import * as $news_id_ from "./routes/news/[id].tsx";
import * as $Counter from "./islands/Counter.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/resource/[...path].ts": $api_resource_path_,
    "./routes/api/update.ts": $api_update,
    "./routes/index.tsx": $index,
    "./routes/news/[id].tsx": $news_id_,
  },
  islands: {
    "./islands/Counter.tsx": $Counter,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
