import { FreshContext } from "$fresh/server.ts";
import { getWebCache, updateWebCache } from "../../utils/webCache.ts";
import { resourceDomainConvertBack } from "../../utils/microcms.ts";
import { CONSTS } from "../../utils/consts.ts";
import { timingSafeEqual } from "@std/crypto";

export const handler = {
  GET: async function (req: Request, _ctx: FreshContext) {
    console.log(req);
    console.log(CONSTS.microCms.webHookSecret);

    const encoder = new TextEncoder();
    const data = encoder.encode(await req.text());
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(CONSTS.microCms.webHookSecret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign", "verify"],
    );

    const expectedSignatureArrayBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      data,
    );
    const expectedSignature = Array.from(
      new Uint8Array(expectedSignatureArrayBuffer),
    )
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const signature = req.headers.get("X-MICROCMS-Signature");
    if (
      !timingSafeEqual(
        new TextEncoder().encode(signature!),
        new TextEncoder().encode(expectedSignature),
      )
    ) {
      throw new Error("Invalid signature.");
    }

    return new Response("OK");
  },
};
