import { type PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html data-theme="cupcake">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>fresh x micro CMS</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div class="px-4 mx-auto min-h-screen bg-base-300">
          <div class="container min-h-screen mx-auto bg-base-100 flex flex-col justify-between">
            <div class="container mx-0">
              <Header />
            </div>
            <div class="container mb-auto">
              <Component />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
