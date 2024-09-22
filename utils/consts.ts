export const CONSTS = {
  microCms: {
    serviceDomain: Deno.env.get("MICRO_CMS_SERVICE_DOMAIN")!,
    apiKey: Deno.env.get("MICRO_CMS_API_KEY")!,
  },
} as const;
