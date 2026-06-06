import { defineMiddleware } from "astro:middleware";

const supported = ["en", "de"] as const;
type Lang = (typeof supported)[number];

function detectLang(request: Request): Lang {
  const header = request.headers.get("accept-language") ?? "";
  if (header.toLowerCase().startsWith("de")) return "de";
  
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(/lang=(en|de)/);
  if (match) return match[1] as Lang;

  return "en";
}

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);

  // only handle root "/"
  if (url.pathname === "/") {
    const lang = detectLang(context.request);
    return Response.redirect(`${url.origin}/${lang}`, 302);
  }

  return next();
});