import { NextRequest } from "next/server";
import { affinaPreviewEnglish, translateAffinaCatalogue } from "@/lib/affina-preview-english";

const origin = "https://www.affina.com.vn/ai/";
const mount = "/api/affina-preview/";
export const maxDuration = 60;

// Keep the public consultation in English without depending on third-party
// cookies, which browsers omit when the live site is inside an iframe.
// Only public pages, assets and read-only product endpoints are exposed.
function allowed(path: string) {
  return /^(?:goi-y-bao-hiem\/(?:buoc-[123]|ket-qua)\/?|wp-content\/(?:themes\/affina|plugins\/affina-products|uploads)\/.+|wp-includes\/js\/.+|wp-json\/affina-products\/v1\/.+|new-favicon\.ico)$/.test(path);
}

type RouteContext = { params: { path: string[] } };

async function preview(request: NextRequest, { params }: RouteContext) {
  const path = params.path.join("/");
  if (params.path.some(part => part === ".." || part.includes("\\") || part.includes("/")) || !allowed(path)) {
    return new Response(null, { status: 404 });
  }

  // This POST endpoint only looks up plans and returns comparison markup.
  // Lead creation, contact requests and purchase endpoints stay unavailable.
  if (request.method === "POST" && path !== "wp-json/affina-products/v1/quiz-products") {
    return new Response(null, { status: 405 });
  }
  let payload: string | undefined;
  if (request.method === "POST") {
    payload = await request.text();
    if (payload.length > 8000) return new Response(null, { status: 413 });
    try { JSON.parse(payload); } catch { return new Response(null, { status: 400 }); }
  }

  const target = new URL(path.startsWith("goi-y-bao-hiem/") ? `${path.replace(/\/$/, "")}/` : path, origin);
  target.search = request.nextUrl.search;
  target.searchParams.delete("affina_set_lang");
  try {
    const upstream = await fetch(target, {
      method: request.method,
      body: payload,
      headers: { Cookie: "affina_lang=en", "Accept-Language": "en", ...(payload ? { "Content-Type": "application/json" } : {}) },
      redirect: "error",
      signal: AbortSignal.timeout(request.method === "POST" ? 50000 : 20000),
      cache: "no-store",
    });
    const type = upstream.headers.get("content-type") || "application/octet-stream";
    const headers = { "Content-Type": type, "Cache-Control": type.includes("text/html") || request.method === "POST" ? "no-store" : "public, max-age=3600", "X-Content-Type-Options": "nosniff" };
    if (/text\/|javascript|json|svg|xml/.test(type)) {
      let body = await upstream.text();
      if (type.includes("json")) {
        try { body = JSON.stringify(translateAffinaCatalogue(JSON.parse(body))); } catch { /* Preserve non-JSON upstream errors. */ }
      } else if (type.includes("text/html")) {
        body = affinaPreviewEnglish(body);
        body = body.replace(/<\/head>/i, '<style>.affina-chatbot-floating,.js-affina-chatbot-floating,.affina-chatbot-popup,.js-affina-chatbot-popup{display:none!important}</style></head>');
      }
      if (type.includes("text/html")) body = body.replace(/<title>[^<]*<\/title>/i, "<title>Affina AI — Insurance consultation</title>");
      for (const remote of [origin, origin.replace("www.", ""), origin.replaceAll("/", "\\/"), origin.replace("www.", "").replaceAll("/", "\\/")]) {
        body = body.replaceAll(remote, remote.includes("\\/") ? mount.replaceAll("/", "\\/") : mount);
      }
      return new Response(body, { status: upstream.status, headers });
    }
    return new Response(upstream.body, { status: upstream.status, headers });
  } catch {
    return new Response("Affina AI is temporarily unavailable. Please open the live consultation using the link below the frame.", { status: 502, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }
}

export const GET = preview;
export const POST = preview;
