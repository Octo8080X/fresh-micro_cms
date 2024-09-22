import { FreshContext } from "$fresh/server.ts";
import { updateWebCache } from "../../utils/webCache.ts";
import { CONSTS } from "../../utils/consts.ts";
import { timingSafeEqual } from "@std/crypto";

export const handler = {
  POST: async function (req: Request, _ctx: FreshContext) {
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

    await updateWebCache();

    return new Response("OK");
  },
};


