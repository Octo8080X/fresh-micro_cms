import { type Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  plugins: [
    {
      handler: daisyui.handler,
      config: daisyui.config,
    },
  ],
  daisyui: {
    themes: ["cupcake"],
  },
} satisfies Config;
